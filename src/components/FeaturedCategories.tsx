"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { api, Category } from "@/lib/api";

interface DisplayCategory {
  title: string;
  alias?: string;
  description: string;
  href: string;
  image: string;
}

/** Fallback when API is unavailable */
const FALLBACK_CATEGORIES: DisplayCategory[] = [
  {
    title: "Crossbody Bags",
    alias: "Sling Bags",
    description: "Compact carry, hands-free convenience",
    href: "/category/crossbody-bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Backpack Bags",
    alias: "Laptop Bags",
    description: "Structured carry for work & travel",
    href: "/category/backpack-bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Messenger Bags",
    alias: "Office Bags",
    description: "Classic silhouettes for the modern workspace",
    href: "/category/messenger-bags",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Travel Bags",
    alias: "Duffel Bags",
    description: "Built for adventure, generous capacity",
    href: "/category/travel-bags",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=1000&fit=crop&q=80",
  },
];

function toDisplayCategory(cat: Category): DisplayCategory {
  return {
    title: cat.name,
    alias: cat.alias ?? undefined,
    description: cat.description ?? "",
    href: `/category/${cat.slug}`,
    image: cat.imageUrl ?? "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=80",
  };
}

export default function FeaturedCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { threshold: 0.1 });
  const [categories, setCategories] = useState<DisplayCategory[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    let cancelled = false;
    api.getCategories()
      .then((res) => {
        if (!cancelled && res.data.length > 0) {
          setCategories(res.data.map(toDisplayCategory));
        }
      })
      .catch(() => {
        // Keep fallback
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-surface-0" aria-label="Shop by Category">
      <div className="content-grid">
        {/* Section header */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16 transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">
              Collections
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-ink-900">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-accent-gold transition-colors duration-micro"
          >
            View all categories
            <ArrowUpRight
              size={14}
              className="transition-transform duration-micro group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Category grid — 2x2 for 4 bag categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              id={`category-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={`group relative aspect-[4/3] sm:aspect-[3/2] rounded-lg overflow-hidden transition-all duration-[800ms] ease-enter ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-[600ms] ease-enter group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={85}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent transition-opacity duration-standard group-hover:from-ink-900/90" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                  {cat.title}
                </h3>
                {cat.alias && (
                  <span className="text-accent-gold text-xs font-medium tracking-wider uppercase mt-1">
                    Also known as: {cat.alias}
                  </span>
                )}
                <p className="mt-1 text-sm text-white/60 max-w-[30ch]">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium">
                  <span className="transition-transform duration-standard group-hover:translate-x-1">
                    Shop Now
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="transition-all duration-standard opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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
