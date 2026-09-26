"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  META_PIXEL_ID,
  CONSENT_GRANTED_EVENT,
  hasMarketingConsent,
} from "@/lib/meta-pixel";

/**
 * Meta (Facebook) Pixel loader.
 *
 * Loads the pixel base code and tracks PageViews, but only after the visitor
 * grants "all" cookie consent (the pixel is a non-essential marketing cookie).
 * On consent it initialises fbq and records the first PageView; thereafter it
 * fires a PageView on every client-side route change, since App Router SPA
 * navigations don't reload the page (and so don't re-run the base snippet).
 */
function MetaPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consented, setConsented] = useState(false);

  // Watch for consent: on mount (returning visitors who already accepted) and
  // when the banner dispatches the granted event (first-time acceptance).
  useEffect(() => {
    if (hasMarketingConsent()) {
      setConsented(true);
      return;
    }
    const onGranted = () => setConsented(true);
    window.addEventListener(CONSENT_GRANTED_EVENT, onGranted);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, onGranted);
  }, []);

  // Fire a PageView on each route change, once the pixel is live. The base
  // snippet fires the first PageView itself; this covers subsequent SPA
  // navigations. Guarded on `consented` and fbq being present.
  useEffect(() => {
    if (!consented) return;
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
    // pathname + searchParams together identify a unique page view.
  }, [consented, pathname, searchParams]);

  if (!consented) return null;

  return (
    <Script
      id="meta-pixel-base"
      strategy="afterInteractive"
      // Standard Meta Pixel base code. Loads fbevents.js, inits the pixel, and
      // fires the initial PageView. Subsequent PageViews come from the effect
      // above. The pixel id is injected from config.
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}

export default function MetaPixel() {
  // useSearchParams() must be inside a Suspense boundary in the App Router.
  return (
    <Suspense fallback={null}>
      <MetaPixelInner />
    </Suspense>
  );
}
