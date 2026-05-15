"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { api, Category } from "@/lib/api";

interface DisplayCategory {
  title: string;
  alias?: string;
  description: string;
  href: string;
  /** null when the admin hasn't uploaded an image for this category yet. */
  image: string | null;
}

function toDisplayCategory(cat: Category): DisplayCategory {
  return {
    title: cat.name,
    alias: cat.alias ?? undefined,
    description: cat.description ?? "",
    href: `/category/${cat.slug}`,
    // No shared default — if the admin hasn't uploaded an image, we show a
    // placeholder. Anything else duplicates the same image across categories.
    image: cat.imageUrl ?? null,
  };
}

/** Per-card stagger between entrance animations. */
const STAGGER_MS = 120;

export default function FeaturedCategories() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { threshold: 0.2 });
  // Trigger the card entrance slightly before the grid is fully on-screen so
  // the stagger has finished by the time the user reaches it.
  const gridInView = useInView(gridRef, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
  // Start empty so we never flash hardcoded placeholders. A skeleton bridges
  // the moment until the API responds.
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.getCategories()
      .then((res) => {
        if (cancelled) return;
        setCategories(res.data.map(toDisplayCategory));
      })
      .catch(() => {
        if (cancelled) return;
        setCategories([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-surface-0" aria-label="Shop by Category">
      <div className="content-grid">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14 transition-all duration-[700ms] ease-enter ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="text-accent-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Collections
            </span>
            <h2 className="mt-2.5 text-3xl md:text-4xl font-display font-bold text-ink-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm text-ink-500 max-w-md">
              Find the silhouette that fits your everyday — each piece crafted to last.
            </p>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-accent-gold transition-colors duration-micro shrink-0"
          >
            View all categories
            <ArrowUpRight
              size={15}
              className="transition-transform duration-micro group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Category grid — refined 4-up portrait cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="aspect-[3/4] rounded-xl bg-surface-2 animate-pulse"
                />
              ))
            : categories.map((cat, i) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  id={`category-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden bg-ink-900 ring-1 ring-ink-900/5 shadow-sm hover:shadow-xl hover:shadow-ink-900/15 transition-[transform,box-shadow,opacity] duration-[700ms] ease-enter will-change-transform hover:-translate-y-1 ${
                    gridInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-[0.96]"
                  }`}
                  style={{ transitionDelay: `${gridInView ? i * STAGGER_MS : 0}ms` }}
                >
                  {/* Image — gently zooms from 110% to 100% as the card settles in */}
                  <div className="absolute inset-0 overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className={`object-cover transition-transform ease-enter duration-[1100ms] group-hover:scale-110 ${
                          gridInView ? "scale-100" : "scale-110"
                        }`}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        quality={85}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-ink-800 text-ink-600">
                        <ShoppingBag size={44} />
                      </div>
                    )}
                  </div>

                  {/* Overlay gradient — darkens slightly on hover for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent transition-opacity duration-standard group-hover:from-ink-900/90" />

                  {/* Hairline gold border that fades in on hover */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent-gold/0 group-hover:ring-accent-gold/40 transition-all duration-standard" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                    {cat.alias && (
                      <span className="text-accent-gold text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
                        {cat.alias}
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight">
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="mt-1 text-xs text-white/55 line-clamp-2 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-standard ease-enter overflow-hidden">
                        {cat.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                      <span className="transition-transform duration-standard group-hover:translate-x-0.5">
                        Shop Now
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-accent-gold transition-all duration-standard opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
