"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const products = [
  {
    id: "1",
    name: "Heritage Tote",
    category: "Bags",
    price: "₦185,000",
    priceUsd: "$120",
    image: "/images/product-bag-black.png",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "2",
    name: "Milano Crossbody",
    category: "Bags",
    price: "₦145,000",
    priceUsd: "$95",
    image: "/images/product-bag-cognac.png",
    badge: "New",
    rating: 4.8,
    reviews: 64,
  },
  {
    id: "3",
    name: "Noir Blazer",
    category: "Clothing",
    price: "₦225,000",
    priceUsd: "$148",
    image: "/images/product-clothing.png",
    badge: null,
    rating: 4.7,
    reviews: 42,
  },
  {
    id: "4",
    name: "Executive Wallet",
    category: "Accessories",
    price: "₦65,000",
    priceUsd: "$42",
    image: "/images/product-accessory.png",
    badge: null,
    rating: 4.9,
    reviews: 89,
  },
];

export default function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { threshold: 0.05 });

  return (
    <section className="py-20 md:py-32 bg-surface-1" aria-label="Featured Products">
      <div className="content-grid">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">
            Curated for You
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-ink-900">
            Featured Products
          </h2>
          <p className="mt-3 text-ink-500 max-w-md mx-auto">
            Handpicked pieces from our latest collection, each crafted with care
            and designed to last.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group transition-all duration-[800ms] ease-enter ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <Link
                href={`/product/${product.id}`}
                id={`product-card-${product.id}`}
                className="block"
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-enter group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-sm ${
                        product.badge === "New"
                          ? "bg-ink-900 text-white"
                          : "bg-primary-700 text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Quick actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-standard opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-micro"
                      aria-label="Add to wishlist"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart size={14} className="text-ink-600" />
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-micro"
                      aria-label="Quick add to bag"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ShoppingBag size={14} className="text-ink-600" />
                    </button>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-standard" />
                </div>

                {/* Product info */}
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-primary-600 tracking-wider uppercase">
                    {product.category}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-ink-900 group-hover:text-primary-700 transition-colors duration-micro">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="fill-accent-gold text-accent-gold" />
                      <span className="text-xs font-medium text-ink-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-ink-300">
                      ({product.reviews})
                    </span>
                  </div>
                  <p className="text-sm font-bold text-ink-900 pt-0.5">
                    {product.price}
                    <span className="ml-2 text-xs font-normal text-ink-400">
                      {product.priceUsd}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div
          className={`mt-12 text-center transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <Link
            href="/shop"
            id="view-all-products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-medium text-sm rounded-md transition-all duration-standard hover:shadow-lg hover:shadow-primary-900/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
