"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const categories = [
  {
    title: "Bags",
    description: "Hand-stitched leather, timeless silhouettes",
    href: "/category/bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=80",
    count: "48 pieces",
  },
  {
    title: "Clothing",
    description: "Tailored essentials, refined fabrics",
    href: "/category/clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop&q=80",
    count: "72 pieces",
  },
  {
    title: "Accessories",
    description: "Finishing touches that speak volumes",
    href: "/category/accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80",
    count: "36 pieces",
  },
];

export default function FeaturedCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { threshold: 0.1 });

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

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              id={`category-${cat.title.toLowerCase()}`}
              className={`group relative aspect-[3/4] md:aspect-[3/4] rounded-lg overflow-hidden transition-all duration-[800ms] ease-enter ${
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
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={85}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent transition-opacity duration-standard group-hover:from-ink-900/90" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-accent-gold text-xs font-medium tracking-wider uppercase mb-1">
                  {cat.count}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-white/60 max-w-[20ch]">
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
