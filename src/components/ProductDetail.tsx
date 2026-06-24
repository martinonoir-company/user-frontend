"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api, Product, ProductVariant, StockLevel, VariantPromotion } from "@/lib/api";
import { getVariantPrice, formatPrice } from "@/lib/price";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

interface Props {
  slug: string;
  initialProduct?: Product | null;
}

const LOW_STOCK_THRESHOLD = 5;
const ZOOM_SCALE = 1.75; // 75% zoom — exceeds the 60% minimum

type StockState =
  | { status: "loading" }
  | { status: "unknown" }
  | { status: "in_stock"; available: number }
  | { status: "low_stock"; available: number }
  | { status: "out_of_stock" };

/**
 * Pick the variant to select by default. Always prefer an active variant —
 * an inactive one can't be added to cart (the server rejects it), so it must
 * never be the default selection.
 */
function pickDefaultVariant(p: Product | null | undefined): ProductVariant | null {
  const variants = p?.variants ?? [];
  return variants.find((v) => v.isActive) ?? variants[0] ?? null;
}

/**
 * Human label for a variant promotion badge, e.g. "20% OFF" or "₦400 OFF".
 * Returns null for promotions that can't be shown as a price cut (e.g. a
 * free-shipping promo, or a fixed-amount discount in a different currency
 * than the one being displayed).
 */
function promoLabel(p: VariantPromotion, displayCurrency: string): string | null {
  if (p.discountType === "PERCENTAGE") {
    return `${p.discountValue}% off`;
  }
  if (p.discountType === "FIXED_AMOUNT") {
    const cur = p.currency ?? displayCurrency;
    return `${formatPrice(p.discountValue, cur)} off`;
  }
  return null;
}

export default function ProductDetail({ slug, initialProduct }: Props) {
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    pickDefaultVariant(initialProduct),
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [stock, setStock] = useState<StockState>({ status: "loading" });
  // Live promotional discounts keyed by variantId, for the "X% off" badge.
  const [promotions, setPromotions] = useState<Record<string, VariantPromotion>>(
    {},
  );

  // Image zoom state (mouse-tracked)
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  // Touch-swipe state for the image gallery on touch devices.
  const touchStartX = useRef<number | null>(null);

  const { addItem } = useCart();
  const { isAuthenticated, currency } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    // Always refetch live on mount. `initialProduct` is only the instant
    // first paint — the SSR page caches its fetch (next: revalidate), so
    // without this a variant reactivated in the admin would keep showing
    // "Currently unavailable" until that page cache expired. A live fetch
    // reconciles to current truth (active variants, prices, stock).
    if (!initialProduct) setLoading(true);

    api
      .getProductBySlug(slug)
      .then((res) => {
        if (!cancelled) {
          setProduct(res.data);
          setSelectedVariant(pickDefaultVariant(res.data));
        }
      })
      .catch(() => {
        // Only surface an error if we have nothing to show. If the SSR
        // payload is already on screen, keep it rather than blanking out.
        if (!cancelled && !initialProduct) setError("Product not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, initialProduct]);

  // Fetch live promotional discounts for all of this product's variants so
  // the badge can appear the moment a discounted variant is selected. Keyed
  // by variantId; quietly does nothing on error (the badge is optional).
  useEffect(() => {
    const ids = (product?.variants ?? []).map((v) => v.id).filter(Boolean);
    if (ids.length === 0) {
      setPromotions({});
      return;
    }
    let cancelled = false;
    api
      .getVariantPromotions(ids, currency)
      .then((res) => {
        if (cancelled) return;
        const map: Record<string, VariantPromotion> = {};
        for (const p of res.data) map[p.variantId] = p;
        setPromotions(map);
      })
      .catch(() => {
        if (!cancelled) setPromotions({});
      });
    return () => {
      cancelled = true;
    };
  }, [product?.id, currency]);

  // When the variant changes, reset the gallery to the first image so
  // we never land on an out-of-range index after the media list swaps.
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant?.id]);

  // Check wishlist status
  useEffect(() => {
    if (!product || !isAuthenticated) return;
    api
      .checkWishlisted([product.id])
      .then((res) => setIsWishlisted(res.data.wishlisted.includes(product.id)))
      .catch(() => {});
  }, [product, isAuthenticated]);

  // Load stock level for selected variant
  useEffect(() => {
    if (!selectedVariant) {
      setStock({ status: "unknown" });
      return;
    }
    if (!selectedVariant.trackInventory) {
      setStock({ status: "in_stock", available: Number.POSITIVE_INFINITY });
      return;
    }

    let cancelled = false;
    setStock({ status: "loading" });
    api
      .getStockLevel(selectedVariant.id)
      .then((res) => {
        if (cancelled) return;
        const level: StockLevel = res.data;
        const available = Math.max(0, level.onHand - level.reserved);
        if (available <= 0) setStock({ status: "out_of_stock" });
        else if (available <= LOW_STOCK_THRESHOLD)
          setStock({ status: "low_stock", available });
        else setStock({ status: "in_stock", available });
      })
      .catch(() => {
        if (!cancelled) setStock({ status: "unknown" });
      });

    return () => {
      cancelled = true;
    };
  }, [selectedVariant]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    if (stock.status === "out_of_stock") return;

    // Cart thumbnail: prefer an image tagged to the selected variant so
    // the cart / checkout shows what the customer actually picked. Fall
    // back to the product's first image when the variant has none. This
    // is display-only — the variantId sent for purchase is unchanged.
    const variantImage =
      (product.media ?? []).find(
        (m) => m.variantId === selectedVariant.id,
      )?.url ?? product.media?.find((m) => !m.variantId)?.url ?? product.media?.[0]?.url;

    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        variantName: selectedVariant.name,
        sku: selectedVariant.sku,
        priceNgn: parseInt(selectedVariant.retailPriceNgn, 10),
        priceUsd: parseInt(selectedVariant.retailPriceUsd, 10),
        options: selectedVariant.options ?? {},
        imageUrl: variantImage,
      },
      quantity,
    );

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = imageBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="content-grid py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="animate-pulse">
            <div className="aspect-square bg-surface-2 rounded-xl" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-surface-2 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-surface-2 rounded w-1/4" />
            <div className="h-8 bg-surface-2 rounded w-3/4" />
            <div className="h-6 bg-surface-2 rounded w-1/3" />
            <div className="h-20 bg-surface-2 rounded w-full mt-6" />
            <div className="h-12 bg-surface-2 rounded w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="content-grid py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-ink-300 mb-4" />
        <h2 className="text-xl font-semibold text-ink-700">Product Not Found</h2>
        <p className="text-ink-500 mt-2">This product may have been removed or the URL is incorrect.</p>
        <Link
          href="/shop"
          className="inline-flex mt-6 px-6 py-3 bg-primary-700 text-white rounded-lg font-medium text-sm hover:bg-primary-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  /**
   * Media to render on the PDP, in priority order:
   *   1. Images tagged to the currently-selected variant (if any).
   *   2. The product's own gallery (variantId null) as a fallback.
   * The two lists are NOT concatenated — once a variant has images,
   * those replace the gallery entirely so the customer sees only what
   * matches their selection.
   */
  const allMedia = product.media ?? [];
  const variantMedia = selectedVariant
    ? allMedia.filter((m) => m.variantId === selectedVariant.id)
    : [];
  const productMedia = allMedia.filter((m) => !m.variantId);
  const displayMedia =
    variantMedia.length > 0 ? variantMedia : productMedia;
  const hasImage = !!displayMedia[selectedImage]?.url;
  const outOfStock = stock.status === "out_of_stock";
  // A product with no active variant is not purchasable — the server won't
  // accept it into a cart. Reflect that honestly instead of showing a dead
  // "Add to Cart" button that silently does nothing.
  const hasBuyableVariant = !!selectedVariant;
  const canAddToCart = hasBuyableVariant && !outOfStock;

  return (
    <div className="content-grid py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-ink-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-ink-700 transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-ink-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Images */}
        <div>
          {/* Main image with hover zoom + touch swipe */}
          <div
            ref={imageBoxRef}
            onMouseEnter={() => hasImage && setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={hasImage ? handleZoomMove : undefined}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null || displayMedia.length < 2) return;
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) < 40) return; // ignore taps / tiny drags
              setSelectedImage((i) =>
                dx < 0
                  ? Math.min(displayMedia.length - 1, i + 1) // swipe left → next
                  : Math.max(0, i - 1), // swipe right → prev
              );
            }}
            className="group relative aspect-square rounded-xl overflow-hidden bg-surface-2 mb-4 cursor-zoom-in select-none"
          >
            {hasImage ? (
              <Image
                src={displayMedia[selectedImage]!.url}
                alt={
                  displayMedia[selectedImage]!.alt ||
                  displayMedia[selectedImage]!.altText ||
                  product.name
                }
                fill
                className="object-cover transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: isZooming ? `scale(${ZOOM_SCALE})` : "scale(1)",
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-ink-300">
                <ShoppingBag size={64} />
              </div>
            )}

            {/* Multi-image controls: arrows (desktop hover) + swipe hint
                (touch) + dot count. Only when the gallery has >1 image. */}
            {displayMedia.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((i) => Math.max(0, i - 1));
                  }}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 text-ink-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white disabled:opacity-0"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((i) =>
                      Math.min(displayMedia.length - 1, i + 1),
                    );
                  }}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/80 text-ink-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white disabled:opacity-0"
                  disabled={selectedImage === displayMedia.length - 1}
                >
                  <ChevronRight size={18} />
                </button>

                {/* Swipe hint — shown on touch screens (md:hidden). */}
                <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-900/70 text-white text-[11px] font-medium backdrop-blur-sm">
                  <ChevronLeft size={12} className="animate-pulse" />
                  Swipe for more
                  <ChevronRight size={12} className="animate-pulse" />
                </div>

                {/* Position dots */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-ink-900/60 text-white text-[10px] font-medium">
                  {selectedImage + 1}/{displayMedia.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails — sub-images under the main image. When the
              selected variant has its own images, those replace the
              product's gallery so the strip matches the choice. */}
          {displayMedia.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {displayMedia.map((media, i) => (
                <button
                  key={media.id}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    i === selectedImage
                      ? "border-primary-700 shadow-md"
                      : "border-transparent hover:border-ink-200"
                  }`}
                >
                  <Image
                    src={media.url}
                    alt={
                      media.alt || media.altText || `${product.name} ${i + 1}`
                    }
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product info */}
        <div>
          {/* Category */}
          <p className="text-xs font-semibold text-primary-600 tracking-widest uppercase mb-2">
            {product.category?.name ?? "Bags"}
          </p>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-3">
            {product.name}
          </h1>

          {/* Price */}
          {selectedVariant && (
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-ink-900">
                {getVariantPrice(selectedVariant, "NGN")}
              </span>
              <span className="text-base text-ink-400">
                {getVariantPrice(selectedVariant, "USD")}
              </span>
              {selectedVariant.compareAtPriceNgn &&
                parseInt(selectedVariant.compareAtPriceNgn, 10) >
                  parseInt(selectedVariant.retailPriceNgn, 10) && (
                  <span className="text-sm text-ink-400 line-through">
                    {formatPrice(selectedVariant.compareAtPriceNgn, "NGN")}
                  </span>
                )}
              {/* Live promotion badge for the selected variant. */}
              {selectedVariant &&
                promotions[selectedVariant.id] &&
                (() => {
                  const label = promoLabel(
                    promotions[selectedVariant.id]!,
                    currency,
                  );
                  return label ? (
                    <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {label}
                    </span>
                  ) : null;
                })()}
            </div>
          )}

          {/* Stock status badge — only meaningful when there's a buyable variant */}
          {hasBuyableVariant && (
            <div className="mb-6" aria-live="polite" data-testid="stock-status">
              <StockBadge state={stock} />
            </div>
          )}

          {/* Unavailable notice — product has no active/purchasable variant */}
          {!hasBuyableVariant && (
            <div
              className="mb-6 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
              role="status"
            >
              <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Currently unavailable
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  This product isn&apos;t available for purchase right now. Please
                  check back later or browse our other pieces.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <ProductDescription text={product.description || product.shortDescription || ""} />

          {/* Variant selector */}
          {(() => {
            // Only active variants are selectable — an inactive one can't be
            // added to cart. The server already filters these out of the
            // storefront payload; this is defence-in-depth against a stale
            // cache or older cached data.
            const selectableVariants = (product.variants ?? []).filter(
              (v) => v.isActive,
            );
            if (selectableVariants.length <= 1) return null;
            return (
              <div className="mb-6">
                <label className="text-sm font-medium text-ink-700 mb-2 block">Variant</label>
                <div className="flex flex-wrap gap-2">
                  {selectableVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariant(v);
                        setQuantity(1);
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariant?.id === v.id
                          ? "border-primary-700 bg-primary-50 text-primary-700"
                          : "border-ink-200 text-ink-700 hover:border-ink-300"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Quantity — hidden when the product can't be purchased */}
          {hasBuyableVariant && (
          <div className="mb-6">
            <label className="text-sm font-medium text-ink-700 mb-2 block">Quantity</label>
            <div className="inline-flex items-center border border-ink-200 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-ink-600 hover:bg-surface-1 transition-colors rounded-l-lg"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-ink-900">{quantity}</span>
              <button
                onClick={() => {
                  setQuantity((q) => {
                    if (stock.status === "low_stock" || stock.status === "in_stock") {
                      const cap = Number.isFinite(stock.available) ? stock.available : q + 1;
                      return Math.min(cap, q + 1);
                    }
                    return q + 1;
                  });
                }}
                className="w-10 h-10 flex items-center justify-center text-ink-600 hover:bg-surface-1 transition-colors rounded-r-lg"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          )}

          {/* Add to cart */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              id="add-to-cart-btn"
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-all duration-standard ${
                !canAddToCart
                  ? "bg-ink-200 text-ink-500 cursor-not-allowed"
                  : addedFeedback
                    ? "bg-green-600 text-white"
                    : "bg-ink-900 text-white hover:bg-ink-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              <ShoppingBag size={18} />
              {!hasBuyableVariant
                ? "Unavailable"
                : outOfStock
                  ? "Out of Stock"
                  : addedFeedback
                    ? "Added to Cart ✓"
                    : "Add to Cart"}
            </button>
            <button
              onClick={async () => {
                if (!product) return;
                if (!isAuthenticated) {
                  // Send guests to login, preserve their intent to return here.
                  const next = encodeURIComponent(`/product/${product.slug}`);
                  router.push(`/login?next=${next}`);
                  return;
                }
                setWishlistLoading(true);
                try {
                  if (isWishlisted) {
                    await api.removeFromWishlist(product.id);
                    setIsWishlisted(false);
                  } else {
                    await api.addToWishlist(product.id, selectedVariant?.id);
                    setIsWishlisted(true);
                  }
                } catch (err) {
                  // Surface the failure so the user isn't left wondering why
                  // nothing happened.
                  console.error('Wishlist toggle failed', err);
                }
                setWishlistLoading(false);
              }}
              disabled={wishlistLoading || !product}
              className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-all ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-ink-200 text-ink-600 hover:bg-surface-1 hover:border-ink-300"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink-100">
            <div className="text-center">
              <Truck size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-ink-600 font-medium">Shipping available</p>
            </div>
            <div className="text-center">
              <Shield size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-ink-600 font-medium">Authenticity</p>
              <p className="text-[10px] text-ink-400">100% Guaranteed</p>
            </div>
            <div className="text-center">
              <RotateCcw size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-ink-600 font-medium">Easy Returns</p>
              <p className="text-[10px] text-ink-400">14-day policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a free-form product description with reasonable typography:
 *   • blank lines become paragraph breaks
 *   • single newlines become <br/>
 *   • lines beginning with `-`, `*`, `•` become bullet lists
 *   • lines beginning with `1.`, `2.` etc. become ordered lists
 *
 * Treating the text as plain (not HTML) is intentional — admins type into a
 * <textarea>, and rendering as HTML would let a hostile admin XSS the storefront.
 */
function ProductDescription({ text }: { text: string }) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Split into blocks on blank lines.
  const blocks = trimmed.split(/\n\s*\n/);

  const isBullet = (l: string) => /^\s*[-*•]\s+/.test(l);
  const isNumbered = (l: string) => /^\s*\d+[.)]\s+/.test(l);

  return (
    <div className="text-ink-600 leading-relaxed mb-8 space-y-4">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trimEnd()).filter((l) => l.length > 0);
        if (lines.length === 0) return null;

        if (lines.every(isBullet)) {
          return (
            <ul key={bi} className="list-disc pl-5 space-y-1.5 marker:text-ink-400">
              {lines.map((l, li) => (
                <li key={li}>{l.replace(/^\s*[-*•]\s+/, "")}</li>
              ))}
            </ul>
          );
        }
        if (lines.every(isNumbered)) {
          return (
            <ol key={bi} className="list-decimal pl-5 space-y-1.5 marker:text-ink-400">
              {lines.map((l, li) => (
                <li key={li}>{l.replace(/^\s*\d+[.)]\s+/, "")}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <span key={li}>
                {l}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function StockBadge({ state }: { state: StockState }) {
  if (state.status === "loading") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
        <Loader2 size={12} className="animate-spin" />
        Checking availability…
      </span>
    );
  }
  if (state.status === "unknown") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
        <AlertCircle size={12} />
        Availability unavailable
      </span>
    );
  }
  if (state.status === "out_of_stock") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
        <XCircle size={12} />
        Out of Stock
      </span>
    );
  }
  if (state.status === "low_stock") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
        <AlertCircle size={12} />
        Only {state.available} left — order soon
      </span>
    );
  }
  // in_stock
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
      <CheckCircle2 size={12} />
      In Stock
    </span>
  );
}
