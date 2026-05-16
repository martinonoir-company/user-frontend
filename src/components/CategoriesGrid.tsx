"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { api, Category } from "@/lib/api";

const PAGE_SIZE = 12;

/** Per-card stagger between entrance animations. */
const STAGGER_MS = 90;

interface PageState {
  items: Category[];
  total: number;
  page: number;
  pages: number;
}

export default function CategoriesGrid() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PageState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Drives the staggered card entrance — flipped on after each page lands.
  const [entered, setEntered] = useState(false);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setEntered(false);
    setError(false);
    try {
      const res = await api.getCategoriesPaginated(p, PAGE_SIZE);
      setData({
        items: res.data.items,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });
    } catch {
      setError(true);
      setData(null);
    } finally {
      setLoading(false);
      // Next frame so the transition has a "from" state to animate out of.
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  useEffect(() => {
    load(page);
  }, [page, load]);

  function goTo(p: number) {
    if (!data) return;
    const next = Math.min(Math.max(1, p), data.pages);
    if (next === page) return;
    setPage(next);
    // Scroll back to the top of the grid so the new page starts in view.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="content-grid py-10 md:py-16" aria-label="All Categories">
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <span className="text-accent-gold text-xs font-semibold tracking-[0.2em] uppercase">
          Collections
        </span>
        <h1 className="mt-2.5 text-3xl md:text-4xl font-display font-bold text-ink-900 tracking-tight">
          All Categories
        </h1>
        <p className="mt-2 text-sm text-ink-500 max-w-md">
          Browse every Martinonoir collection — find the silhouette that fits
          your everyday.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="aspect-[3/4] rounded-xl bg-surface-2 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="py-24 text-center">
          <ShoppingBag size={40} className="mx-auto text-ink-300 mb-3" />
          <p className="text-ink-600 font-medium">Couldn&apos;t load categories</p>
          <button
            onClick={() => load(page)}
            className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      ) : !data || data.items.length === 0 ? (
        <div className="py-24 text-center">
          <ShoppingBag size={40} className="mx-auto text-ink-300 mb-3" />
          <p className="text-ink-600 font-medium">No categories yet</p>
          <p className="text-sm text-ink-500 mt-1">Please check back soon.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {data.items.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={i}
                entered={entered}
              />
            ))}
          </div>

          {/* Pagination */}
          {data.pages > 1 && (
            <Pagination
              page={data.page}
              pages={data.pages}
              onChange={goTo}
            />
          )}
        </>
      )}
    </section>
  );
}

/**
 * Single category card — identical design to the landing page's
 * "Shop by Category" section: a light image area (object-contain, inner
 * padding) above a solid dark text panel, with a staggered rise-in.
 */
function CategoryCard({
  category,
  index,
  entered,
}: {
  category: Category;
  index: number;
  entered: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      id={`category-${category.slug}`}
      className={`group relative flex flex-col aspect-[3/4] rounded-xl overflow-hidden bg-ink-900 shadow-sm hover:shadow-xl hover:shadow-ink-900/15 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 transition-[transform,box-shadow,opacity] duration-[700ms] ease-enter will-change-transform hover:-translate-y-1 ${
        entered
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-[0.96]"
      }`}
      style={{ transitionDelay: `${entered ? index * STAGGER_MS : 0}ms` }}
    >
      {/* Image area — light backdrop, slight inner padding, object-contain
          so the image is fully visible, never cropped or distorted. */}
      <div className="relative basis-[62%] grow-0 shrink-0 bg-surface-1">
        <div className="absolute inset-0 px-3 pt-3 pb-2">
          <div className="relative w-full h-full overflow-hidden">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className={`object-contain transition-transform ease-enter duration-[900ms] group-hover:scale-[1.04] ${
                  entered ? "scale-100" : "scale-105"
                }`}
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={85}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-ink-300">
                <ShoppingBag size={44} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text panel — solid dark background, light text for strong contrast. */}
      <div className="relative basis-[38%] grow shrink-0 flex flex-col justify-center bg-ink-900 px-4 py-3 border-t border-white/5">
        {category.alias && (
          <span className="text-accent-gold text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5">
            {category.alias}
          </span>
        )}
        <h3 className="text-base md:text-lg font-display font-bold text-white leading-tight">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-xs text-white/65 line-clamp-2">
            {category.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1.5 text-white/90 text-xs font-semibold">
          <span className="transition-transform duration-standard group-hover:translate-x-0.5">
            Shop Now
          </span>
          <ArrowUpRight
            size={14}
            className="text-accent-gold transition-all duration-standard opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}

/** Server-side pagination controls. */
function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  // Build a compact page-number list: always show first/last, the current
  // page and its neighbours, with ellipses for gaps.
  const numbers: (number | "...")[] = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || (p >= page - 1 && p <= page + 1)) {
      numbers.push(p);
    } else if (numbers[numbers.length - 1] !== "...") {
      numbers.push("...");
    }
  }

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-1.5"
      aria-label="Categories pagination"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-surface-1 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {numbers.map((n, i) =>
        n === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 inline-flex items-center justify-center text-ink-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`w-9 h-9 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              n === page
                ? "bg-ink-900 text-white"
                : "border border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-surface-1"
            }`}
          >
            {n}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        aria-label="Next page"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-surface-1 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
