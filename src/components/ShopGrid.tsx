"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { api, Product } from "@/lib/api";
import { getVariantPrice } from "@/lib/price";
import { useCart } from "@/lib/cart-context";

export default function ShopGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { addItem } = useCart();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({ page, limit: 12, search: search || undefined });
      setProducts(res.data.items);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch {
      // Keep empty state on error
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    const v = product.variants?.[0];
    if (!v) return;
    addItem({
      variantId: v.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      variantName: v.name,
      sku: v.sku,
      priceNgn: parseInt(v.retailPriceNgn, 10),
      priceUsd: parseInt(v.retailPriceUsd, 10),
      options: v.options ?? {},
      imageUrl: product.media?.[0]?.url,
    });
  };

  return (
    <section className="py-12 md:py-20">
      <div className="content-grid">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900">
            Shop All
          </h1>
          <p className="mt-2 text-ink-500">
            {total > 0 ? `${total} products` : "Loading..."}
          </p>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-1 border border-ink-200 rounded-lg text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
              id="shop-search"
            />
          </form>
          <button
            className="flex items-center gap-2 px-4 py-2.5 border border-ink-200 rounded-lg text-sm font-medium text-ink-700 hover:bg-surface-1 transition-colors"
            id="shop-filter-btn"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-surface-2 rounded-lg mb-3" />
                <div className="h-3 bg-surface-2 rounded w-1/3 mb-2" />
                <div className="h-4 bg-surface-2 rounded w-2/3 mb-2" />
                <div className="h-3 bg-surface-2 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => {
              const firstVariant = product.variants?.[0];
              const firstMedia = product.media?.[0];

              return (
                <div key={product.id} className="group">
                  <Link
                    href={`/product/${product.slug}`}
                    id={`shop-product-${product.id}`}
                    className="block"
                  >
                    {/* Image */}
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

                      {/* Featured badge */}
                      {product.isFeatured && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-sm bg-primary-700 text-white">
                          Featured
                        </span>
                      )}

                      {/* Quick actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-standard opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all"
                          aria-label="Add to wishlist"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart size={14} className="text-ink-600" />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all"
                          aria-label="Quick add to bag"
                          onClick={(e) => handleQuickAdd(e, product)}
                        >
                          <ShoppingBag size={14} className="text-ink-600" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-primary-600 tracking-wider uppercase">
                        {product.category?.name ?? "Bags"}
                      </p>
                      <h3 className="text-sm md:text-base font-semibold text-ink-900 group-hover:text-primary-700 transition-colors">
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
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-ink-300 mb-4" />
            <h3 className="text-lg font-semibold text-ink-700">No products found</h3>
            <p className="text-ink-500 mt-1">
              {search ? `No results for "${search}"` : "Products are coming soon!"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-ink-200 rounded-lg text-sm font-medium text-ink-700 hover:bg-surface-1 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-ink-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-ink-200 rounded-lg text-sm font-medium text-ink-700 hover:bg-surface-1 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
