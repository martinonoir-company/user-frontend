"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { api, Product } from "@/lib/api";
import { getVariantPrice } from "@/lib/price";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setSearched(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: query.trim(), limit: 8 });
        setResults(res.data.items);
      } catch {
        setResults([]);
      }
      setLoading(false);
      setSearched(true);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="relative bg-surface-0 shadow-2xl animate-[slide-down_0.3s_ease-out]">
        <div className="content-grid py-6">
          {/* Search input */}
          <div className="flex items-center gap-3">
            <Search size={22} className="text-ink-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search crossbody, backpacks, messenger bags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg md:text-xl text-ink-900 placeholder:text-ink-300 bg-transparent border-none outline-none font-medium"
              id="search-input"
            />
            {loading && <Loader2 size={20} className="animate-spin text-primary-500" />}
            <button
              onClick={onClose}
              className="p-2 text-ink-400 hover:text-ink-900 transition-colors rounded-full hover:bg-surface-1"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-6 border-t border-ink-100 pt-6">
              <p className="text-xs font-semibold text-ink-400 tracking-widest uppercase mb-4">
                {results.length} results
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((product) => {
                  const firstVariant = product.variants?.[0];
                  const firstMedia = product.media?.[0];

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 mb-2">
                        {firstMedia?.url ? (
                          <Image
                            src={firstMedia.url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[600ms]"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-ink-300">
                            <ShoppingBag size={32} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-primary-600 font-medium tracking-wider uppercase">
                        {product.category?.name ?? "Bags"}
                      </p>
                      <h4 className="text-sm font-semibold text-ink-900 group-hover:text-primary-700 transition-colors truncate">
                        {product.name}
                      </h4>
                      {firstVariant && (
                        <p className="text-sm font-bold text-ink-900 mt-0.5">
                          {getVariantPrice(firstVariant, "NGN")}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* View all link */}
              <div className="mt-6 text-center">
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                >
                  View all results
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}

          {/* Empty state */}
          {searched && results.length === 0 && query.trim().length >= 2 && (
            <div className="mt-6 border-t border-ink-100 pt-8 pb-4 text-center">
              <ShoppingBag size={36} className="mx-auto text-ink-200 mb-3" />
              <p className="text-ink-700 font-medium">No products found</p>
              <p className="text-sm text-ink-400 mt-1">
                Try a different search term
              </p>
            </div>
          )}

          {/* Quick links when no query */}
          {!searched && query.length === 0 && (
            <div className="mt-6 border-t border-ink-100 pt-6">
              <p className="text-xs font-semibold text-ink-400 tracking-widest uppercase mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Leather Tote", "Blazer", "Wallet", "Backpack", "Scarf", "Belt"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-surface-1 hover:bg-surface-2 rounded-full text-sm text-ink-600 font-medium transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
