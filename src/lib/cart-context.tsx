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
  // Tracks whether we've done the initial load for the current mode.
  const modeLoadedRef = useRef<'guest' | 'auth' | null>(null);

  // ── Mode transitions: guest <-> auth ──
  useEffect(() => {
    // Wait for auth to hydrate before we do anything.
    if (authLoading) return;

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
              modeLoadedRef.current = 'auth';
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
        modeLoadedRef.current = 'auth';
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
      // Logged out → reload from localStorage, reset merge tracking.
      mergedForSessionRef.current = false;
      setItems(loadGuestCart());
      modeLoadedRef.current = 'guest';
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, authLoading]);

  // Persist guest cart on change. Only runs in guest mode.
  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) return;
    if (modeLoadedRef.current !== 'guest') return;
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
            // Roll back by re-fetching truth. Guest mode can't rollback
            // because there is no server truth.
            return api
              .getCart()
              .then((res) => setItems(res.data.map(fromServer)))
              .catch(() => {
                /* leave optimistic state in place if server is unreachable */
              });
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
