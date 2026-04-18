"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api, WishlistItem } from "@/lib/api";
import { getVariantPrice } from "@/lib/price";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export default function WishlistView() {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    api.getWishlist()
      .then((res) => setItems(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleRemove = async (productId: string) => {
    try {
      await api.removeFromWishlist(productId);
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } catch {
      // Ignore
    }
  };

  const handleMoveToCart = (item: WishlistItem) => {
    const v = item.variant ?? item.product.variants?.[0];
    if (!v) return;
    addItem({
      variantId: v.id,
      productId: item.productId,
      productName: item.product.name,
      productSlug: item.product.slug,
      variantName: v.name,
      sku: v.sku,
      priceNgn: parseInt(v.retailPriceNgn, 10),
      priceUsd: parseInt(v.retailPriceUsd, 10),
      options: v.options ?? {},
      imageUrl: item.product.media?.[0]?.url,
    });
    handleRemove(item.productId);
  };

  const handleClearAll = async () => {
    try {
      await api.clearWishlist();
      setItems([]);
    } catch {
      // Ignore
    }
  };

  // Not authenticated
  if (!loading && !isAuthenticated) {
    return (
      <div className="content-grid py-20 text-center">
        <Heart size={48} className="mx-auto text-ink-200 mb-4" />
        <h1 className="text-2xl font-display font-bold text-ink-900 mb-2">Sign In to View Wishlist</h1>
        <p className="text-ink-500 mb-8">Save your favorite items for later.</p>
        <Link href="/login" className="inline-flex px-8 py-3.5 bg-primary-700 text-white font-medium text-sm rounded-lg hover:bg-primary-800 transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-grid py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-2 rounded w-1/4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-surface-2 rounded-lg mb-3" />
                <div className="h-4 bg-surface-2 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="content-grid py-20 text-center">
        <Heart size={64} className="mx-auto text-ink-200 mb-6" />
        <h1 className="text-2xl font-display font-bold text-ink-900 mb-2">Your Wishlist is Empty</h1>
        <p className="text-ink-500 mb-8">Browse our collection and save your favorites.</p>
        <Link href="/shop" className="inline-flex px-8 py-3.5 bg-primary-700 text-white font-medium text-sm rounded-lg hover:bg-primary-800 transition-all hover:shadow-lg">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="content-grid py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900">
            Wishlist
          </h1>
          <p className="text-ink-500 mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm text-ink-400 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const product = item.product;
          const firstVariant = item.variant ?? product.variants?.[0];
          const firstMedia = product.media?.[0];

          return (
            <div key={item.id} className="group relative">
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 mb-3">
                  {firstMedia?.url ? (
                    <Image
                      src={firstMedia.url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-ink-300">
                      <ShoppingBag size={48} />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-primary-600 tracking-wider uppercase">
                    {product.category?.name ?? "Bags"}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-ink-900 group-hover:text-primary-700 transition-colors truncate">
                    {product.name}
                  </h3>
                  {firstVariant && (
                    <p className="text-sm font-bold text-ink-900">
                      {getVariantPrice(firstVariant, "NGN")}
                      <span className="ml-2 text-xs font-normal text-ink-400">
                        {getVariantPrice(firstVariant, "USD")}
                      </span>
                    </p>
                  )}
                </div>
              </Link>

              {/* Action buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-ink-900 text-white text-xs font-semibold rounded-lg hover:bg-ink-800 transition-colors"
                >
                  <ShoppingBag size={12} />
                  Add to Bag
                </button>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="w-9 h-9 flex items-center justify-center border border-ink-200 rounded-lg text-ink-400 hover:text-red-500 hover:border-red-200 transition-all"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
