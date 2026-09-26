/**
 * Meta (Facebook) Pixel helpers.
 *
 * The pixel base code is loaded once by <MetaPixel> (components/MetaPixel.tsx),
 * but ONLY after the visitor grants "all" cookie consent — the pixel is a
 * marketing/tracking cookie and the site's cookie policy states that all
 * non-essential cookies require consent. These helpers are safe to call from
 * anywhere: if the pixel hasn't loaded (no consent, or fbq not ready yet) they
 * are silent no-ops, so they never throw and never track without consent.
 */

/** Public pixel id. Overridable per environment; falls back to the live id. */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1626486982201035";

/** localStorage key + value the CookieConsent banner writes on "Accept All". */
export const CONSENT_STORAGE_KEY = "mn_cookie_consent";
/** Fired by the banner when the user accepts, so the pixel can start without a reload. */
export const CONSENT_GRANTED_EVENT = "mn:cookie-consent-granted";

// Minimal typing for the global fbq the base code installs.
type Fbq = ((...args: unknown[]) => void) & { loaded?: boolean };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** True when the visitor has granted full ("all") cookie consent. */
export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { consent?: string } | null;
    return parsed?.consent === "all";
  } catch {
    return false;
  }
}

/** Standard Meta events we emit; matches Meta's canonical event names. */
export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "Purchase";

/**
 * Track a standard Meta event. No-op if the pixel isn't loaded (e.g. no
 * consent). Meta dedupes/rate-limits server-side; we just forward.
 */
export function trackEvent(
  event: MetaStandardEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}

/** Meta expects monetary values in MAJOR units (e.g. naira), not kobo. */
export function toMajorUnits(minor: number): number {
  return Math.round(minor) / 100;
}
