"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Martinonoir luxury collection"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="content-grid relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className={`transition-all duration-[800ms] ease-enter ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/30 backdrop-blur-sm border border-primary-500/30 text-white text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
              New Collection 2026
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] transition-all duration-[1000ms] ease-enter ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Crafted with
            <br />
            <span className="gold-gradient">Intention</span>
          </h1>

          {/* Subhead */}
          <p
            className={`mt-5 text-lg md:text-xl text-white/90 max-w-lg leading-relaxed transition-all duration-[1000ms] ease-enter ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms", textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
          >
            Premium leather bags for every journey — crossbody, backpacks,
            messengers, and travel duffels. Every piece tells a story.
          </p>

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-[1000ms] ease-enter ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <Link
              href="/new-arrivals"
              id="hero-cta-primary"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm tracking-wide rounded-md transition-all duration-standard hover:shadow-lg hover:shadow-primary-900/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Collection
              <ArrowRight
                size={16}
                className="transition-transform duration-standard group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/category/bags"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium text-sm tracking-wide rounded-md border border-white/20 transition-all duration-standard hover:-translate-y-0.5 active:translate-y-0"
            >
              Shop Bags
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className={`mt-12 flex items-center gap-6 transition-all duration-[1000ms] ease-enter ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {[
              "Free Shipping over ₦150k",
              "Authentic Leather",
              "30-Day Returns",
            ].map((badge) => (
              <span
                key={badge}
                className="hidden sm:flex items-center gap-1.5 text-white/70 text-xs"
              >
                <span className="w-1 h-1 bg-primary-400 rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/40 text-xs">
          <span className="tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
