"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { api, Product, Category } from "@/lib/api";
import { getVariantPrice } from "@/lib/price";
import { useCart } from "@/lib/cart-context";

interface Props {
  slug: string;
}

export default function CategoryProducts({ slug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { addItem } = useCart();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch category info
      const catRes = await api.getCategoryBySlug(slug);
      setCategory(catRes.data);

      // Fetch products in this category
      const prodRes = await api.getProducts({
        page,
        limit: 12,
        category: catRes.data.id,
      });
      setProducts(prodRes.data.items);
      setTotalPages(prodRes.data.pages);
      setTotal(prodRes.data.total);
    } catch {
      // Category not found
    }
    setLoading(false);
  }, [slug, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    <div>
      {/* Category hero */}
      <section className="bg-ink-900 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="content-grid relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-white/60 transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">{category?.name ?? slug}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            {category?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          {category?.description && (
            <p className="mt-2 text-white/50 max-w-lg">{category.description}</p>
          )}
          {total > 0 && (
            <p className="mt-3 text-sm text-white/40">{total} products</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="content-grid">
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

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => {
                const firstVariant = product.variants?.[0];
                const firstMedia = product.media?.[0];
                return (
                  <div key={product.id} className="group">
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
                        <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
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

          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-ink-300 mb-4" />
              <h3 className="text-lg font-semibold text-ink-700">No products in this category</h3>
              <p className="text-ink-500 mt-1">Products are coming soon!</p>
            </div>
          )}

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
    </div>
  );
}
