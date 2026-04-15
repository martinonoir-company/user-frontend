"use client";

import {
  Truck,
  Shield,
  RefreshCcw,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on orders above ₦150,000. Worldwide delivery available.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every piece is crafted from genuine premium materials with a certificate of authenticity.",
  },
  {
    icon: RefreshCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay with Paystack, Moniepoint, or Stripe. Every transaction is encrypted and protected.",
  },
];

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-surface-0" aria-label="Why Martinonoir">
      <div className="content-grid">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">
            The Martinonoir Promise
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-ink-900">
            Why Shop With Us
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group text-center p-6 md:p-8 rounded-xl border border-rule/40 bg-surface-0 hover:bg-surface-1 hover:border-accent-gold/20 hover:shadow-md transition-all duration-standard ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${200 + i * 100}ms`,
                  transitionDuration: "800ms",
                }}
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors duration-standard">
                  <Icon
                    size={22}
                    className="text-primary-700 group-hover:text-primary-800 transition-colors duration-standard"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Newsletter / CTA banner */}
        <div
          className={`mt-16 md:mt-24 relative rounded-xl overflow-hidden bg-ink-900 p-8 md:p-12 lg:p-16 transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                Join the{" "}
                <span className="gold-gradient">Inner Circle</span>
              </h3>
              <p className="mt-3 text-white/60 leading-relaxed">
                Be the first to access new collections, exclusive offers, and
                style inspiration. Join 12,000+ discerning shoppers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[380px]">
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-md text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all duration-micro"
                aria-label="Email for newsletter"
              />
              <button
                id="newsletter-submit"
                className="group px-6 py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-md transition-all duration-standard hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight
                  size={14}
                  className="transition-transform duration-standard group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
