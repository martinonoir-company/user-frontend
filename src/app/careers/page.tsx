"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Briefcase,
  Zap,
  Globe,
  Heart,
  Coffee,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const perks = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive HMO for you and your dependants, plus mental health support." },
  { icon: TrendingUp, title: "Growth Budget", description: "₦200,000 annual learning budget for courses, books, and conferences." },
  { icon: Globe, title: "Remote Friendly", description: "Hybrid and fully remote roles available for most positions." },
  { icon: Coffee, title: "Team Culture", description: "Monthly team outings, quarterly retreats, and a stunning Lagos office." },
  { icon: Zap, title: "Equipment Allowance", description: "Best-in-class hardware from day one — MacBook, monitors, peripherals." },
  { icon: Briefcase, title: "Staff Wardrobe", description: "Generous annual Martinonoir wardrobe credit for all team members." },
];

export default function CareersPage() {
  const perksRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const perksVisible = useInView(perksRef, { threshold: 0.08 });
  const rolesVisible = useInView(rolesRef, { threshold: 0.05 });
  const ctaVisible = useInView(ctaRef, { threshold: 0.1 });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(30,95,204,0.12),transparent_60%)]" />
          <div className="absolute bottom-0 left-1/3 w-96 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="content-grid relative z-10 text-center">
            <nav className="flex items-center justify-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Careers</span>
            </nav>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
              Careers at Martinonoir
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] text-balance max-w-3xl mx-auto">
              Build the future of{" "}
              <span className="gold-gradient">African luxury</span>
            </h1>
            <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Join a team of craftspeople, technologists, and storytellers building something genuinely meaningful — one beautiful product at a time.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-white/35">
              {[
                { label: "Team Size", value: "40+" },
                { label: "Countries", value: "3" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks ────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={perksRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                perksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Why Martinonoir</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Life at Martinonoir</h2>
              <p className="mt-3 text-ink-500 max-w-lg mx-auto">We take care of our people the same way we take care of our products — with intention and no corners cut.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className={`group p-8 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:border-primary-200 hover:shadow-md transition-all duration-standard ${
                      perksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms`, transitionDuration: "700ms" }}
                  >
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary-100 group-hover:bg-primary-200 transition-colors duration-standard mb-5">
                      <Icon size={20} className="text-primary-700" />
                    </div>
                    <h3 className="text-base font-semibold text-ink-900 mb-2">{perk.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{perk.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Open Roles ───────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-1">
          <div className="content-grid">
            <div
              ref={rolesRef}
              className={`text-center mb-12 transition-all duration-[800ms] ease-enter ${
                rolesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Open Positions</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Current Openings</h2>
            </div>

            {/* No openings — empty state */}
            <div
              className={`max-w-xl mx-auto text-center bg-surface-0 rounded-2xl border border-rule/50 px-8 py-14 transition-all duration-[800ms] ease-enter ${
                rolesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-primary-100 mb-5">
                <Briefcase size={24} className="text-primary-700" />
              </div>
              <h3 className="text-xl font-display font-bold text-ink-900">
                No open positions right now
              </h3>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                We don&apos;t have any vacancies at the moment. Please check back
                later — new opportunities are posted here as they open. In the
                meantime, you&apos;re welcome to send us an open application below.
              </p>
              <a
                href="mailto:mail@martinonoir.com?subject=Open Application"
                className="group mt-7 inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold rounded-lg transition-all duration-standard hover:shadow-md"
              >
                Send Open Application
                <ArrowRight size={13} className="transition-transform duration-standard group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-ink-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(30,95,204,0.1),transparent_60%)]" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div
            ref={ctaRef}
            className={`content-grid relative z-10 text-center transition-all duration-[800ms] ease-enter ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-balance">
              Don&apos;t see the right role?
            </h2>
            <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
              We&apos;re always looking for exceptional people. Send us your CV and tell us what you&apos;d build at Martinonoir.
            </p>
            <a
              href="mailto:mail@martinonoir.com"
              className="group mt-8 inline-flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
            >
              Send Open Application
              <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
