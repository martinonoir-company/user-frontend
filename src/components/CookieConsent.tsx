"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "mn_cookie_consent";

/**
 * Cookie consent banner shown to first-time visitors.
 * Stores the user's choice in localStorage so it only appears once.
 * Links to the full Cookie Policy at /cookies as required by the policy.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't already made a choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so it slides in after the page renders
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (SSR, private browsing, etc.)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ consent: "all", ts: Date.now() })
      );
    } catch {}
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ consent: "essential", ts: Date.now() })
      );
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6 animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-3xl mx-auto bg-ink-900 border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-accent-gold/15 text-accent-gold mt-0.5">
            <Cookie size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h2 className="text-sm font-semibold text-white">
                We value your privacy
              </h2>
              <button
                onClick={handleRejectNonEssential}
                className="sm:hidden shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
                aria-label="Close cookie banner"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
              We use cookies to ensure our website functions properly and to
              improve your experience. Strictly necessary cookies are set
              automatically. All other cookies require your consent. Read our{" "}
              <Link
                href="/cookies"
                className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-2 transition-colors"
              >
                Cookie Policy
              </Link>{" "}
              for full details.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-xs font-semibold bg-accent-gold text-ink-900 rounded-full hover:bg-accent-gold/90 transition-colors duration-150"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-5 py-2 text-xs font-semibold text-white/70 border border-white/15 rounded-full hover:bg-white/5 hover:text-white transition-colors duration-150"
              >
                Essential Only
              </button>
              <Link
                href="/cookies"
                className="px-3 py-2 text-xs font-medium text-white/40 hover:text-accent-gold transition-colors duration-150"
              >
                Cookie Settings
              </Link>
            </div>
          </div>

          {/* Close button - desktop */}
          <button
            onClick={handleRejectNonEssential}
            className="hidden sm:flex shrink-0 w-7 h-7 items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Close cookie banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
