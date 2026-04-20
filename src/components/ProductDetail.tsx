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
  Truck,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api, Product, ProductVariant, StockLevel } from "@/lib/api";
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

export default function ProductDetail({ slug, initialProduct }: Props) {
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    initialProduct?.variants?.[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [stock, setStock] = useState<StockState>({ status: "loading" });

  // Image zoom state (mouse-tracked)
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialProduct) return;
    let cancelled = false;
    setLoading(true);

    api
      .getProductBySlug(slug)
      .then((res) => {
        if (!cancelled) {
          setProduct(res.data);
          setSelectedVariant(res.data.variants?.[0] ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Product not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, initialProduct]);

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
        imageUrl: product.media?.[0]?.url,
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

  const hasImage = !!product.media?.[selectedImage]?.url;
  const outOfStock = stock.status === "out_of_stock";

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
          {/* Main image with hover zoom */}
          <div
            ref={imageBoxRef}
            onMouseEnter={() => hasImage && setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={hasImage ? handleZoomMove : undefined}
            className="relative aspect-square rounded-xl overflow-hidden bg-surface-2 mb-4 cursor-zoom-in"
          >
            {hasImage ? (
              <Image
                src={product.media[selectedImage]!.url}
                alt={product.media[selectedImage]!.alt || product.name}
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
          </div>

          {/* Thumbnails */}
          {product.media && product.media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.media.map((media, i) => (
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
                    alt={media.alt || `${product.name} ${i + 1}`}
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
            </div>
          )}

          {/* Stock status badge */}
          <div className="mb-6" aria-live="polite" data-testid="stock-status">
            <StockBadge state={stock} />
          </div>

          {/* Description */}
          <p className="text-ink-600 leading-relaxed mb-8">
            {product.description || product.shortDescription}
          </p>

          {/* Variant selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <label className="text-sm font-medium text-ink-700 mb-2 block">Variant</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
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
          )}

          {/* Quantity */}
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

          {/* Add to cart */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              id="add-to-cart-btn"
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-all duration-standard ${
                outOfStock
                  ? "bg-ink-200 text-ink-500 cursor-not-allowed"
                  : addedFeedback
                    ? "bg-green-600 text-white"
                    : "bg-ink-900 text-white hover:bg-ink-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              <ShoppingBag size={18} />
              {outOfStock ? "Out of Stock" : addedFeedback ? "Added to Bag ✓" : "Add to Bag"}
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
              <p className="text-xs text-ink-600 font-medium">Free Shipping</p>
              <p className="text-[10px] text-ink-400">Over ₦50,000</p>
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
