"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Leaf, Droplets, Recycle, Users, Sun, Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pillars = [
  {
    icon: Leaf,
    title: "Responsible Materials",
    description:
      "Every hide we use comes from certified tanneries that meet LWG (Leather Working Group) Gold or Silver standards — the most rigorous animal welfare and environmental benchmarks in the industry.",
    stat: "100%",
    statLabel: "Certified leather sources",
  },
  {
    icon: Droplets,
    title: "Water Stewardship",
    description:
      "Our tannery partners have reduced water use by 60% over five years through closed-loop systems and biological treatment. We audit water data annually.",
    stat: "60%",
    statLabel: "Reduction in water usage",
  },
  {
    icon: Recycle,
    title: "Circular Packaging",
    description:
      "All Martinonoir packaging is made from FSC-certified recycled materials. Dust bags are organic cotton. Boxes are designed to be kept and reused.",
    stat: "0",
    statLabel: "Single-use plastics",
  },
  {
    icon: Users,
    title: "Artisan Livelihoods",
    description:
      "We pay at least 40% above the Nigerian minimum wage for all artisan roles, provide HMO coverage, and invest in skills development programmes in Lagos.",
    stat: "40%+",
    statLabel: "Above minimum wage",
  },
  {
    icon: Sun,
    title: "Carbon Awareness",
    description:
      "We measure and disclose our Scope 1, 2, and 3 emissions annually. We offset what we cannot yet reduce, and publish full reports on our website.",
    stat: "2026",
    statLabel: "Target for net-zero operations",
  },
  {
    icon: Shield,
    title: "Longevity by Design",
    description:
      "The most sustainable product is one that never needs replacing. We offer free repairs for life on all Martinonoir leather goods.",
    stat: "Lifetime",
    statLabel: "Free repair promise",
  },
];

const commitments = [
  {
    year: "2024",
    title: "Published first Sustainability Report",
    description: "Full disclosure of supply chain, emissions, and labour practices.",
  },
  {
    year: "2024",
    title: "Eliminated single-use plastics",
    description: "All packaging converted to recycled and organic materials.",
  },
  {
    year: "2023",
    title: "Launched free lifetime repairs",
    description: "Every Martinonoir leather piece now comes with a lifetime repair guarantee.",
  },
  {
    year: "2023",
    title: "Achieved LWG-certified supply chain",
    description: "100% of leather sourced from Gold or Silver rated tanneries.",
  },
  {
    year: "2026 (target)",
    title: "Net-zero operations",
    description: "Scope 1 and 2 emissions to be net-zero through reduction and renewable energy.",
  },
];

export default function SustainabilityPage() {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const repairRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const pillarsVisible = useInView(pillarsRef, { threshold: 0.05 });
  const commitmentsVisible = useInView(commitmentsRef, { threshold: 0.08 });
  const repairVisible = useInView(repairRef, { threshold: 0.1 });
  const ctaVisible = useInView(ctaRef, { threshold: 0.1 });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-0 md:pt-44 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_0%,rgba(14,124,58,0.08),transparent_55%)]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />

          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Sustainability</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              <div className="pb-20 md:pb-28">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/25 text-success text-xs font-medium tracking-wide uppercase mb-6">
                  <Leaf size={12} />
                  Our Commitment
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] text-balance">
                  Luxury that{" "}
                  <span className="gold-gradient">doesn&apos;t cost</span>{" "}
                  the earth
                </h1>
                <p className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed">
                  We believe a luxury brand in 2025 has no excuse for cutting ethical and environmental corners. Here&apos;s exactly what we&apos;re doing — and what we still need to do.
                </p>
                <Link
                  href="#pillars"
                  className="group mt-10 inline-flex items-center gap-2 px-6 py-3.5 bg-success/80 hover:bg-success text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
                >
                  See Our Commitments
                  <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
                </Link>
              </div>

              {/* image */}
              <div className="relative h-[400px] md:h-[520px] rounded-t-2xl overflow-hidden self-end">
                <Image
                  src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=900&h=1100&fit=crop&q=85"
                  alt="Martinonoir sustainable craft"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Pillars ───────────────────────────────────────────── */}
        <section id="pillars" className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={pillarsRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-success text-xs font-semibold tracking-widest uppercase">Six Pillars</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">How We Operate</h2>
              <p className="mt-3 text-ink-500 max-w-lg mx-auto">
                These aren&apos;t aspirations. They&apos;re standards we hold ourselves to today — with public data to back them up.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`group relative p-8 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:border-success/25 hover:shadow-md transition-all duration-standard overflow-hidden ${
                      pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms`, transitionDuration: "700ms" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-success-light group-hover:bg-success/15 transition-colors duration-standard shrink-0">
                        <Icon size={20} className="text-success" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-display font-bold text-ink-900">{pillar.stat}</p>
                        <p className="text-[11px] text-ink-400 leading-tight max-w-[100px] text-right">{pillar.statLabel}</p>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-ink-900 mb-2">{pillar.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-1">
          <div className="content-grid">
            <div
              ref={commitmentsRef}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-[800ms] ease-enter ${
                commitmentsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span className="text-success text-xs font-semibold tracking-widest uppercase">Progress</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">
                  What we&apos;ve done, <br className="hidden md:block" />what&apos;s next
                </h2>
                <p className="mt-4 text-ink-500 leading-relaxed max-w-md">
                  Sustainability is not a destination. It&apos;s a series of commitments, each building on the last. Here&apos;s our honest ledger.
                </p>
                <a
                  href="mailto:press@martinonoir.com?subject=Sustainability Report Request"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors duration-micro"
                >
                  Request full Sustainability Report
                  <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
                </a>
              </div>

              <div className="space-y-4">
                {commitments.map((c, i) => (
                  <div
                    key={c.title}
                    className="flex gap-5 p-6 bg-surface-0 rounded-xl border border-rule/50 hover:border-success/20 hover:shadow-sm transition-all duration-standard"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold text-success bg-success-light whitespace-nowrap">
                        {c.year}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-900">{c.title}</h3>
                      <p className="text-sm text-ink-500 mt-0.5 leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Repair promise ────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-0">
          <div
            ref={repairRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              repairVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden bg-ink-900 p-10 md:p-16">
              <div className="absolute top-0 left-0 w-80 h-80 bg-success/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-success/10 mb-6">
                    <Recycle size={24} className="text-success" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    The Martinonoir <span className="gold-gradient">Lifetime Repair Promise</span>
                  </h2>
                  <p className="mt-5 text-white/55 leading-relaxed">
                    Every leather piece we sell comes with free repairs for life. Worn stitching, damaged clasps, scuffed leather — send it back and we&apos;ll restore it. Because the most sustainable product is one that never reaches a landfill.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Products repaired", value: "1,200+" },
                    { label: "Avg. repair time", value: "7 days" },
                    { label: "Customer satisfaction", value: "99%" },
                    { label: "Cost to customer", value: "Free" },
                  ].map((s) => (
                    <div key={s.label} className="p-5 rounded-xl bg-white/4 border border-white/8 text-center">
                      <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                      <p className="text-xs text-white/40 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-surface-1">
          <div
            ref={ctaRef}
            className={`content-grid text-center transition-all duration-[800ms] ease-enter ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-success text-xs font-semibold tracking-widest uppercase">Buy With Purpose</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">
              Every purchase is a vote for craft over waste
            </h2>
            <p className="mt-4 text-ink-500 max-w-lg mx-auto leading-relaxed">
              When you buy Martinonoir, you&apos;re choosing a product designed to last decades — not months.
            </p>
            <Link
              href="/shop"
              className="group mt-10 inline-flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
            >
              Shop the Collection
              <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
