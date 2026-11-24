"use client";

import Link from "next/link";
import { Apple, Play } from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Store links for the Martinonoir mobile apps.
 *
 * iOS is not live yet — leave APP_STORE_URL empty and the iOS button renders in
 * a disabled "Coming soon" state. Drop the App Store URL in here the moment it
 * is available and the button becomes a live link automatically.
 */
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.martinonoir.mobile";
const APP_STORE_URL = "";

/** A dark store button: platform icon + "GET IT ON / Store name". */
function StoreButton({
  icon,
  top,
  name,
}: {
  icon: React.ReactNode;
  top: string;
  name: string;
}) {
  return (
    <span className="flex h-[52px] w-[180px] items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white">
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wide text-white/70">
          {top}
        </span>
        <span className="mt-0.5 text-lg font-semibold">{name}</span>
      </span>
    </span>
  );
}

export default function AppDownloadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { threshold: 0.1 });

  return (
    <section className="py-16 md:py-24" aria-label="Download the Martinonoir app">
      <div className="content-grid">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-2xl bg-ink-900 px-6 py-10 md:px-12 md:py-14 transition-all duration-[800ms] ease-enter ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative glows, matching the site's banner language */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-primary-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Copy */}
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
                Shop on the go
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                Get the Martinonoir App
              </h2>
              <p className="mt-3 leading-relaxed text-white/60">
                Browse new drops, track your orders, and check out faster — all
                from your phone. Download the Martinonoir app for Android and iOS.
              </p>
            </div>

            {/* Store buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get the Martinonoir app on Google Play"
                className="rounded-xl transition-transform duration-standard hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <StoreButton
                  icon={<Play size={26} className="fill-white text-white" />}
                  top="Get it on"
                  name="Google Play"
                />
              </Link>

              {APP_STORE_URL ? (
                <Link
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download the Martinonoir app on the App Store"
                  className="rounded-xl transition-transform duration-standard hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  <StoreButton
                    icon={<Apple size={28} className="fill-white text-white" />}
                    top="Download on the"
                    name="App Store"
                  />
                </Link>
              ) : (
                <div
                  className="relative cursor-not-allowed opacity-60"
                  aria-label="Martinonoir app on the App Store — coming soon"
                  title="Coming soon to the App Store"
                >
                  <StoreButton
                    icon={<Apple size={28} className="fill-white text-white" />}
                    top="Download on the"
                    name="App Store"
                  />
                  <span className="absolute -top-2 -right-2 rounded-full bg-accent-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-900">
                    Soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
