"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Package,
  RotateCcw,
  Truck,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  {
    icon: Package,
    title: "Orders",
    description: "Track, modify, or cancel your order.",
    href: "/track-order",
    color: "bg-primary-100 text-primary-700",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    description: "Start a return or swap an item.",
    href: "/returns",
    color: "bg-accent-gold-light text-accent-gold-dark",
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Delivery times, costs, and tracking.",
    href: "/shipping",
    color: "bg-success-light text-success",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Accepted methods, billing, and receipts.",
    href: "/contact",
    color: "bg-warning-light text-warning",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description: "Verify your product and certificate.",
    href: "/contact",
    color: "bg-surface-2 text-ink-600",
  },
  {
    icon: MessageSquare,
    title: "Contact Support",
    description: "Speak directly with our team.",
    href: "/contact",
    color: "bg-primary-100 text-primary-700",
  },
];

const allFaqs = [
  {
    category: "Orders",
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive an email with a tracking link. You can also visit the Track Order page and enter your order number and email address.",
  },
  {
    category: "Orders",
    q: "Can I modify or cancel my order?",
    a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters our fulfilment process. Contact us as quickly as possible and we'll do our best to help.",
  },
  {
    category: "Shipping",
    q: "How long does delivery take?",
    a: "Lagos delivery: 1–2 business days. Other Nigerian states: 3–5 business days. International orders: 7–14 business days depending on destination.",
  },
  {
    category: "Shipping",
    q: "Do you ship internationally?",
    a: "Yes, we ship to 40+ countries worldwide. International shipping rates and times are shown at checkout.",
  },
  {
    category: "Returns",
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery for unworn, undamaged items in original packaging. Refunds are processed within 5–7 business days of receiving your return.",
  },
  {
    category: "Returns",
    q: "How do I start a return?",
    a: "Visit our Returns page, enter your order number and email, select the items you'd like to return, and follow the instructions. We'll email you a prepaid return label.",
  },
  {
    category: "Payments",
    q: "What payment methods do you accept?",
    a: "We accept Paystack, Moniepoint, Stripe, Visa, and Mastercard. All transactions are encrypted and secured.",
  },
  {
    category: "Authenticity",
    q: "How do I verify my product is authentic?",
    a: "Every Martinonoir piece ships with a certificate of authenticity that includes a unique code. You can verify this code on our website or by contacting support.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-rule/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-surface-0 hover:bg-surface-1 transition-colors duration-micro"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-ink-900">{q}</span>
        <ChevronRight size={16} className={`shrink-0 text-ink-400 transition-transform duration-standard ${open ? "rotate-90" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-emphatic ease-enter ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-6 pb-5 text-sm text-ink-500 leading-relaxed border-t border-rule/40 pt-4">{a}</p>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const categoriesVisible = useInView(categoriesRef, { threshold: 0.08 });
  const faqVisible = useInView(faqRef, { threshold: 0.05 });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const faqCategories = ["All", ...Array.from(new Set(allFaqs.map((f) => f.category)))];
  const filtered = allFaqs.filter((f) => {
    const matchesCat = activeCategory === "All" || f.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,95,204,0.12),transparent_55%)]" />
          <div className="content-grid relative z-10 text-center">
            <nav className="flex items-center justify-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Help Center</span>
            </nav>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
              Support
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight text-balance">
              How can we <span className="gold-gradient">help you?</span>
            </h1>
            <p className="mt-5 text-white/50 max-w-lg mx-auto leading-relaxed">
              Search our knowledge base or browse by topic below.
            </p>
            {/* search bar */}
            <div className="mt-10 relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none" />
              <input
                type="search"
                placeholder="Search for answers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-5 py-4 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400/50 transition-all duration-micro"
              />
            </div>
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-1">
          <div className="content-grid">
            <div
              ref={categoriesRef}
              className={`text-center mb-12 transition-all duration-[800ms] ease-enter ${
                categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Browse Topics</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">What do you need help with?</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className={`group flex flex-col gap-4 p-6 md:p-8 bg-surface-0 rounded-xl border border-rule/50 hover:border-primary-300/60 hover:shadow-md transition-all duration-standard ${
                      categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${i * 70}ms`, transitionDuration: "700ms" }}
                  >
                    <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${cat.color} transition-colors duration-standard`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-900 group-hover:text-primary-700 transition-colors duration-micro">{cat.title}</h3>
                      <p className="text-xs text-ink-500 mt-0.5 leading-relaxed">{cat.description}</p>
                    </div>
                    <ArrowRight size={14} className="text-ink-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-standard mt-auto" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-0">
          <div className="content-grid">
            <div
              ref={faqRef}
              className={`transition-all duration-[800ms] ease-enter ${
                faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-12">
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">FAQs</span>
                <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">Frequently Asked Questions</h2>
              </div>

              {/* category filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {faqCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-micro ${
                      activeCategory === c
                        ? "bg-primary-700 text-white shadow-sm"
                        : "bg-surface-1 text-ink-500 border border-rule/60 hover:border-primary-300 hover:text-primary-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {filtered.length > 0 ? (
                <div className="max-w-2xl mx-auto space-y-3">
                  {filtered.map((faq) => (
                    <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-ink-400 text-sm">No results for &ldquo;{search}&rdquo;</p>
                  <button
                    onClick={() => { setSearch(""); setActiveCategory("All"); }}
                    className="mt-3 text-sm text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Contact strip ─────────────────────────────────────── */}
        <section className="py-20 bg-ink-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,95,204,0.08),transparent_60%)]" />
          <div className="content-grid relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Still need help?</h2>
            <p className="mt-3 text-white/50 max-w-sm mx-auto">Our support team is available Monday through Saturday and always happy to help.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
              >
                Contact Support
                <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+2348038010651"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-sm rounded-lg transition-all duration-standard hover:-translate-y-0.5"
              >
                0803 801 0651
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
