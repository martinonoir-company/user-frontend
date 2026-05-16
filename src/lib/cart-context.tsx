'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { api, ServerCartItem } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantName: string;
  sku: string;
  quantity: number;
  /** Snapshot price at add-time (minor units). */
  priceNgn: number;
  priceUsd: number;
  /** Live price from the DB. `null` on guest cart or when the variant is gone. */
  currentPriceNgn: number | null;
  currentPriceUsd: number | null;
  /** true when the current price differs from the snapshot (auth carts only). */
  priceChanged: boolean;
  /** true when the variant has been removed or deactivated on the server. */
  unavailable: boolean;
  options: Record<string, string>;
  imageUrl?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  /**
   * true whenever a server sync is in flight. UI can use this to disable
   * primary actions (e.g. checkout) while the local state may still lag.
   */
  syncing: boolean;
  addItem: (
    item: Omit<CartItem, 'quantity' | 'currentPriceNgn' | 'currentPriceUsd' | 'priceChanged' | 'unavailable'>,
    quantity?: number,
  ) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: (currency: string) => number;
  /** Force a refetch from the server (auth mode only). No-op for guests. */
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = 'mn_cart';

// ── localStorage helpers (guest cart) ──

function loadGuestCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];
    // Backfill fields added after the feature launched so an old guest cart
    // loaded fresh today still satisfies the CartItem shape.
    return parsed.map((raw) => {
      const r = raw as Partial<CartItem>;
      return {
        variantId: String(r.variantId ?? ''),
        productId: String(r.productId ?? ''),
        productName: String(r.productName ?? ''),
        productSlug: String(r.productSlug ?? ''),
        variantName: String(r.variantName ?? ''),
        sku: String(r.sku ?? ''),
        quantity: Number(r.quantity ?? 1),
        priceNgn: Number(r.priceNgn ?? 0),
        priceUsd: Number(r.priceUsd ?? 0),
        currentPriceNgn: r.currentPriceNgn ?? null,
        currentPriceUsd: r.currentPriceUsd ?? null,
        priceChanged: Boolean(r.priceChanged ?? false),
        unavailable: Boolean(r.unavailable ?? false),
        options: (r.options ?? {}) as Record<string, string>,
        imageUrl: r.imageUrl,
      };
    }).filter((i) => i.variantId);
  } catch {
    return [];
  }
}

function saveGuestCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Quota exceeded or localStorage disabled — degrade to in-memory only.
  }
}

function clearGuestCart() {
  try {
    localStorage.removeItem(CART_KEY);
  } catch {
    // ignored
  }
}

function fromServer(row: ServerCartItem): CartItem {
  return {
    variantId: row.variantId ?? '',
    productId: row.productId ?? '',
    productName: row.productName,
    productSlug: row.productSlug,
    variantName: row.variantName ?? '',
    sku: row.sku,
    quantity: row.quantity,
    priceNgn: Number(row.priceNgn),
    priceUsd: Number(row.priceUsd),
    currentPriceNgn:
      row.currentPriceNgn != null ? Number(row.currentPriceNgn) : null,
    currentPriceUsd:
      row.currentPriceUsd != null ? Number(row.currentPriceUsd) : null,
    priceChanged: Boolean(row.priceChanged),
    unavailable: Boolean(row.unavailable),
    options: row.options ?? {},
    imageUrl: row.imageUrl ?? undefined,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [syncing, setSyncing] = useState(false);

  // Tracks whether we've already merged the guest cart into the server cart
  // for the current auth session, so we don't merge repeatedly on re-render.
  const mergedForSessionRef = useRef(false);
  // The mode whose load has been STARTED (not necessarily finished). This is
  // set synchronously at the top of the effect, before any `await`, so a
  // re-render that happens *during* an in-flight load (e.g. a `setSyncing`
  // from a background `addItem`) is correctly skipped by the guard instead
  // of kicking off a second load that re-fetches stale server state and
  // wipes the just-added item.
  const loadStartedForRef = useRef<'guest' | 'auth' | null>(null);

  // ── Mode transitions: guest <-> auth ──
  useEffect(() => {
    // Wait for auth to hydrate before we do anything.
    if (authLoading) return;

    const desiredMode: 'guest' | 'auth' = isAuthenticated ? 'auth' : 'guest';

    // Idempotency guard. If we've already STARTED loading for the current
    // mode, do nothing — even if that load is still in flight. Critically,
    // this ref is set BEFORE the async work below, so it closes the race
    // window where an in-progress optimistic add could be overwritten by a
    // second mode-load. The ref is only cleared on a genuine auth flip
    // (see the transition-tracking effect below).
    if (loadStartedForRef.current === desiredMode) return;
    loadStartedForRef.current = desiredMode;

    let cancelled = false;

    const loadAuthCart = async () => {
      setSyncing(true);
      try {
        // If there's a guest cart sitting in localStorage, merge it first.
        const guest = loadGuestCart();
        if (guest.length > 0 && !mergedForSessionRef.current) {
          mergedForSessionRef.current = true;
          const payload = guest
            .filter((i) => i.variantId && i.quantity > 0)
            .map((i) => ({ variantId: i.variantId, quantity: i.quantity }));
          if (payload.length > 0) {
            try {
              const merged = await api.mergeCart(payload);
              if (cancelled) return;
              setItems(merged.data.map(fromServer));
              clearGuestCart();
              return;
            } catch {
              // Merge failed — fall through to plain fetch so we don't wipe
              // the guest cart on a transient error.
              mergedForSessionRef.current = false;
            }
          } else {
            clearGuestCart();
          }
        }

        const res = await api.getCart();
        if (cancelled) return;
        setItems(res.data.map(fromServer));
      } catch {
        if (cancelled) return;
        setItems([]);
      } finally {
        if (!cancelled) setSyncing(false);
      }
    };

    if (isAuthenticated) {
      void loadAuthCart();
    } else {
      // First time entering guest mode for this session — seed items
      // from localStorage. Subsequent mutations update items + localStorage
      // through the persist effect; this branch never runs again unless
      // the user logs out (which resets the ref via the auth → guest
      // transition tracking below).
      mergedForSessionRef.current = false;
      setItems(loadGuestCart());
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  // Track auth↔guest transitions so the mode-load can rerun when it
  // SHOULD (login or logout) but skip when it shouldn't (re-renders).
  const prevAuthRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (authLoading) return;
    if (prevAuthRef.current !== null && prevAuthRef.current !== isAuthenticated) {
      // Auth state genuinely flipped — clear the marker so the mode-load
      // effect above runs again with the new mode. This is the ONLY place
      // the marker is cleared, so a plain re-render can never re-trigger a
      // mode-load.
      loadStartedForRef.current = null;
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, authLoading]);

  // Persist guest cart on change. Only runs in guest mode, and only once
  // the guest mode-load has run — otherwise the very first render (items
  // still []) would clear a cart we haven't loaded yet.
  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) return;
    if (loadStartedForRef.current !== 'guest') return;
    if (items.length === 0) {
      clearGuestCart();
    } else {
      saveGuestCart(items);
    }
  }, [items, isAuthenticated, authLoading]);

  // ── Helpers ──

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setSyncing(true);
    try {
      const res = await api.getCart();
      setItems(res.data.map(fromServer));
    } finally {
      setSyncing(false);
    }
  }, [isAuthenticated]);

  // ── Mutations: branch on auth ──

  const addItem = useCallback<CartContextValue['addItem']>(
    (item, quantity = 1) => {
      // Optimistic: update local state immediately.
      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === item.variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [
          ...prev,
          {
            ...item,
            quantity,
            currentPriceNgn: null,
            currentPriceUsd: null,
            priceChanged: false,
            unavailable: false,
          },
        ];
      });

      // If authenticated, persist to server in background, then reconcile
      // so server-side enrichment (priceChanged, imageUrl normalisation) wins.
      if (isAuthenticated) {
        setSyncing(true);
        api
          .addToCart(item.variantId, quantity)
          .then(() => api.getCart())
          .then((res) => {
            setItems(res.data.map(fromServer));
          })
          .catch(() => {
            // The server rejected THIS item (e.g. the variant is inactive).
            // Roll back only the failed variant — do NOT re-fetch the whole
            // cart, which would blow away other items the user already has.
            setItems((prev) =>
              prev.filter((i) => i.variantId !== item.variantId),
            );
          })
          .finally(() => setSyncing(false));
      }
    },
    [isAuthenticated],
  );

  const removeItem = useCallback(
    (variantId: string) => {
      const snapshot = items;
      setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      if (isAuthenticated) {
        setSyncing(true);
        api
          .removeFromCart(variantId)
          .catch(() => {
            // Roll back from snapshot on failure.
            setItems(snapshot);
          })
          .finally(() => setSyncing(false));
      }
    },
    [items, isAuthenticated],
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      const snapshot = items;
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      } else {
        setItems((prev) =>
          prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
        );
      }
      if (isAuthenticated) {
        setSyncing(true);
        const p =
          quantity <= 0
            ? api.removeFromCart(variantId)
            : api.updateCartQuantity(variantId, quantity);
        p.catch(() => setItems(snapshot)).finally(() => setSyncing(false));
      }
    },
    [items, isAuthenticated],
  );

  const clearCart = useCallback(() => {
    const snapshot = items;
    setItems([]);
    clearGuestCart();
    if (isAuthenticated) {
      setSyncing(true);
      api
        .clearCart()
        .catch(() => setItems(snapshot))
        .finally(() => setSyncing(false));
    }
  }, [items, isAuthenticated]);

  const getSubtotal = useCallback(
    (currency: string) => {
      return items.reduce((sum, item) => {
        // Prefer live price when available so totals track admin changes.
        const snapshot = currency === 'USD' ? item.priceUsd : item.priceNgn;
        const current =
          currency === 'USD' ? item.currentPriceUsd : item.currentPriceNgn;
        const unit = current ?? snapshot;
        return sum + unit * item.quantity;
      }, 0);
    },
    [items],
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        syncing,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        refresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
