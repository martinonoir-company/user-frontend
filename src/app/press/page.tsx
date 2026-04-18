"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Download, ExternalLink, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const coverage = [
  {
    publication: "TechCabal",
    date: "March 2025",
    headline: "How Martinonoir is redefining luxury retail for the African consumer",
    excerpt: "The Lagos-based brand has quietly built one of the most sophisticated commerce operations on the continent, combining artisan craft with cutting-edge technology.",
    href: "#",
    category: "Feature",
  },
  {
    publication: "Vogue Africa",
    date: "January 2025",
    headline: "The 10 African luxury brands you need to know in 2025",
    excerpt: "Martinonoir earns its place on this list not just for its beautiful leather goods, but for its commitment to quality that rivals any European maison.",
    href: "#",
    category: "Roundup",
  },
  {
    publication: "Business Day",
    date: "November 2024",
    headline: "Martinonoir surpasses 50,000 customers, eyes international expansion",
    excerpt: "The company's founder Martino Adeyemi discusses plans to open showrooms in London and New York, while keeping production rooted in Lagos.",
    href: "#",
    category: "News",
  },
  {
    publication: "Arise Magazine",
    date: "September 2024",
    headline: "Craftsmanship in the digital age: A conversation with Martino Adeyemi",
    excerpt: "How the founder of Nigeria's most exciting luxury brand thinks about the tension between scale and soul.",
    href: "#",
    category: "Interview",
  },
  {
    publication: "Forbes Africa",
    date: "June 2024",
    headline: "30 Under 30: The entrepreneurs reshaping Africa's creative economy",
    excerpt: "Martinonoir's founder is included in this year's list for building a luxury brand that has resonated globally while staying deeply rooted in African craft.",
    href: "#",
    category: "Award",
  },
  {
    publication: "Guardian Style",
    date: "February 2024",
    headline: "The leather bag that Lagos can't stop talking about",
    excerpt: "The Heritage Tote has become the must-have accessory among Lagos's fashion set — and it's not hard to see why.",
    href: "#",
    category: "Feature",
  },
];

const categoryColors: Record<string, string> = {
  Feature: "bg-primary-100 text-primary-700",
  Roundup: "bg-accent-gold-light text-accent-gold-dark",
  News: "bg-surface-2 text-ink-600",
  Interview: "bg-success-light text-success",
  Award: "bg-warning-light text-warning",
};

const assets = [
  { name: "Brand Logo Pack", format: "ZIP · SVG, PNG", size: "2.4 MB" },
  { name: "Product Photography", format: "ZIP · High-res JPG", size: "84 MB" },
  { name: "Brand Guidelines", format: "PDF", size: "6.1 MB" },
  { name: "Founder Bio & Headshots", format: "ZIP · JPG + PDF", size: "18 MB" },
];

export default function PressPage() {
  const coverageRef = useRef<HTMLDivElement>(null);
  const kitRef = useRef<HTMLDivElement>(null);

  const coverageVisible = useInView(coverageRef, { threshold: 0.05 });
  const kitVisible = useInView(kitRef, { threshold: 0.1 });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(30,95,204,0.1),transparent_55%)]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Press</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                  Press & Media
                </span>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.05] text-balance">
                  Martinonoir in the <span className="gold-gradient">News</span>
                </h1>
                <p className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed">
                  Press coverage, brand assets, and everything a journalist or content creator needs. For media inquiries, reach our press team directly.
                </p>
                <a
                  href="mailto:press@martinonoir.com"
                  className="group mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  press@martinonoir.com
                  <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
                </a>
              </div>
              {/* stat strip */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "50+", label: "Press features" },
                  { n: "15+", label: "Publications" },
                  { n: "3×", label: "Awards received" },
                  { n: "2024", label: "Forbes 30 Under 30" },
                ].map((s) => (
                  <div key={s.label} className="p-6 rounded-xl bg-white/4 border border-white/8">
                    <p className="text-3xl font-display font-bold text-white">{s.n}</p>
                    <p className="text-sm text-white/40 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Coverage grid ─────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={coverageRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                coverageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Selected Coverage</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Featured In</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coverage.map((item, i) => (
                <a
                  key={item.headline}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col bg-surface-0 rounded-xl border border-rule/50 p-7 hover:border-primary-300/60 hover:shadow-lg transition-all duration-standard ${
                    coverageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms`, transitionDuration: "700ms" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${categoryColors[item.category] ?? "bg-surface-2 text-ink-500"}`}>
                      {item.category}
                    </span>
                    <ExternalLink size={14} className="text-ink-300 group-hover:text-primary-500 transition-colors duration-micro" />
                  </div>
                  <p className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-2">{item.publication}</p>
                  <h3 className="text-base font-semibold text-ink-900 group-hover:text-primary-700 leading-snug transition-colors duration-micro mb-3">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed flex-1">{item.excerpt}</p>
                  <p className="text-xs text-ink-300 mt-5">{item.date}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Press kit ─────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-1">
          <div
            ref={kitRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              kitVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Downloads</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Press Kit</h2>
                <p className="mt-4 text-ink-500 leading-relaxed max-w-md">
                  Everything you need to write about Martinonoir — brand assets, product photography, guidelines, and founder materials.
                </p>
                <p className="mt-3 text-sm text-ink-400">
                  All assets are licensed for editorial use. For commercial licensing, contact{" "}
                  <a href="mailto:press@martinonoir.com" className="text-primary-700 hover:text-primary-800 transition-colors duration-micro font-medium">
                    press@martinonoir.com
                  </a>.
                </p>
              </div>
              <div className="space-y-3">
                {assets.map((asset, i) => (
                  <div
                    key={asset.name}
                    className="flex items-center justify-between gap-4 px-6 py-4 bg-surface-0 rounded-xl border border-rule/50 hover:border-primary-300/50 hover:shadow-sm transition-all duration-standard group"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink-900 group-hover:text-primary-700 transition-colors duration-micro">
                        {asset.name}
                      </p>
                      <p className="text-xs text-ink-400 mt-0.5">{asset.format} · {asset.size}</p>
                    </div>
                    <button
                      onClick={(e) => e.preventDefault()}
                      aria-label={`Download ${asset.name}`}
                      className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 transition-colors duration-micro"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact strip ─────────────────────────────────────── */}
        <section className="py-20 bg-ink-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,95,204,0.08),transparent_60%)]" />
          <div className="content-grid relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Media Inquiry?</h2>
            <p className="mt-3 text-white/50 max-w-md mx-auto">Our communications team responds within one business day.</p>
            <a
              href="mailto:press@martinonoir.com"
              className="group mt-8 inline-flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
