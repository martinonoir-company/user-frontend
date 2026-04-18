"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import SearchOverlay from "@/components/SearchOverlay";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-emphatic ease-enter ${
        isScrolled
          ? "bg-surface-0/95 backdrop-blur-md shadow-sm border-b border-rule/50"
          : "bg-ink-900"
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-primary-900 text-white text-xs text-center py-2.5 px-4 tracking-wide">
        <span>Complimentary shipping on orders above ₦150,000</span>
        <span className="mx-3 opacity-50">|</span>
        <span>We ship worldwide 🌍</span>
      </div>

      <nav className="content-grid" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 -ml-2 text-ink-700 hover:text-ink-900 transition-colors duration-micro"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Martinonoir — Home"
          >
            <span
              className={`font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-standard ${
                isScrolled ? "text-ink-900" : "text-white"
              }`}
            >
              MARTINO
              <span className="text-primary-500 font-bold">NOIR</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Bags", href: "/category/bags" },
              { label: "Clothing", href: "/category/clothing" },
              { label: "Accessories", href: "/category/accessories" },
              { label: "Sale", href: "/sale" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-micro hover:text-primary-500 ${
                  item.label === "Sale"
                    ? "text-danger font-semibold"
                    : isScrolled
                    ? "text-ink-600"
                    : "text-white/90"
                } after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary-500 after:transition-all after:duration-standard hover:after:w-full`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              id="search-toggle"
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors duration-micro rounded-full ${
                isScrolled
                  ? "text-ink-500 hover:text-ink-900 hover:bg-surface-1"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Search products"
            >
              <Search size={20} />
            </button>
            <Link
              href="/wishlist"
              className={`hidden md:flex p-2 transition-colors duration-micro rounded-full ${
                isScrolled
                  ? "text-ink-500 hover:text-ink-900 hover:bg-surface-1"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/account"
              className={`hidden md:flex p-2 transition-colors duration-micro rounded-full ${
                isScrolled
                  ? "text-ink-500 hover:text-ink-900 hover:bg-surface-1"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            <Link
              href="/cart"
              id="cart-toggle"
              className={`relative p-2 transition-colors duration-micro rounded-full ${
                isScrolled
                  ? "text-ink-500 hover:text-ink-900 hover:bg-surface-1"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label={`Shopping bag (${itemCount} items)`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-[scale-in_0.2s_ease-out]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[calc(2rem+4rem)] bg-surface-0 z-40 transition-all duration-emphatic ease-enter ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-1">
          {[
            { label: "New Arrivals", href: "/new-arrivals" },
            { label: "Bags", href: "/category/bags" },
            { label: "Clothing", href: "/category/clothing" },
            { label: "Accessories", href: "/category/accessories" },
            { label: "Sale", href: "/sale" },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-lg font-medium border-b border-rule/30 transition-colors duration-micro hover:text-accent-gold ${
                item.label === "Sale" ? "text-danger" : "text-ink-700"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-6">
            <Link
              href="/wishlist"
              className="flex items-center gap-2 text-ink-500 hover:text-ink-900 text-sm"
            >
              <Heart size={18} /> Wishlist
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-2 text-ink-500 hover:text-ink-900 text-sm"
            >
              <User size={18} /> Account
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* Search overlay */}
    <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
