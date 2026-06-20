"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}



function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115v3.146c-.427-.044-.72-.065-.822-.065-1.183 0-1.64.45-1.64 1.621v2.741h3.562l-.609 3.667h-2.953v8.168C19.396 22.556 23 18.166 23 12.903c0-5.55-4.507-10.056-10.056-10.056S2.888 7.353 2.888 12.903c0 4.87 3.467 8.95 8.063 9.874l.15-.086z" />
    </svg>
  );
}

function TiktokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11V9.4a6.27 6.27 0 0 0-3.66.11A6.33 6.33 0 0 0 2.5 15.82a6.34 6.34 0 0 0 10.94 4.47 6.27 6.27 0 0 0 1.76-4.47V8.32a8.25 8.25 0 0 0 4.39 1.82V6.69z" />
    </svg>
  );
}

const footerLinks = {
  Shop: [
    { label: "Crossbody Bags", href: "/category/crossbody-bags" },
    { label: "Backpack Bags", href: "/category/backpack-bags" },
    { label: "Messenger Bags", href: "/category/messenger-bags" },
    { label: "Travel Bags", href: "/category/travel-bags" },
    { label: "All Bags", href: "/categories" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Marketing Agents", href: "/agent" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Data Protection", href: "/data-protection" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white" role="contentinfo">
      {/* Main footer */}
      <div className="content-grid py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block" aria-label="Martinonoir Home">
              <span className="font-display text-xl font-semibold tracking-tight">
                MARTINO
                <span className="text-accent-gold font-bold">NOIR</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Crafted with intention. Premium leather bags for every journey —
              crossbody, backpacks, messengers, and travel duffels.
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="mailto:support@martinonoir.com"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-accent-gold transition-colors duration-micro"
              >
                <Mail size={14} />
                support@martinonoir.com
              </a>
              <a
                href="tel:+2348038010651"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-accent-gold transition-colors duration-micro"
              >
                <Phone size={14} />
                0803 801 0651
              </a>
              <span className="flex items-center gap-2 text-sm text-white/40">
                <MapPin size={14} />
                GFD 57 Young Shall Grow Shopping Complex, 2 Johnson Main Market Onitsha, Anambra State, Nigeria
              </span>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: InstagramIcon, href: "https://www.instagram.com/martinonoir?igsh=Njg0cXk0ZXVyYzNh", label: "Instagram" },
                { icon: FacebookIcon, href: "https://www.facebook.com/share/17aYEqDe4V/", label: "Facebook" },
                { icon: TiktokIcon, href: "https://www.tiktok.com/@martinonoir?_r=1&_t=ZN-96Q0wJQJNAc", label: "TikTok" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent-gold/20 text-white/40 hover:text-accent-gold transition-all duration-micro"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-accent-gold transition-colors duration-micro"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="content-grid py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Martinonoir. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("mn_cookie_consent");
                  window.location.reload();
                } catch {}
              }}
              className="text-xs text-white/30 hover:text-accent-gold transition-colors duration-micro cursor-pointer"
            >
              Cookie Settings
            </button>
            <span className="text-xs text-white/20">We accept:</span>
            <div className="flex items-center gap-2">
              {["Paystack", "Moniepoint", "Stripe", "Visa", "Mastercard"].map(
                (method) => (
                  <span
                    key={method}
                    className="px-2 py-1 text-[10px] font-medium text-white/30 bg-white/5 rounded"
                  >
                    {method}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
