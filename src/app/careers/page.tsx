"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Clock,
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

const openings = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Lagos / Remote",
    type: "Full-time",
    description: "Build world-class commerce experiences with Next.js, TypeScript, and Tailwind. You'll own the user-facing storefront and help define our frontend architecture.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Lagos",
    type: "Full-time",
    description: "Lead the design of our digital and physical brand experiences. You'll work closely with engineering and brand to craft beautiful, functional interfaces.",
  },
  {
    title: "Operations Manager",
    department: "Operations",
    location: "Lagos",
    type: "Full-time",
    description: "Oversee our supply chain, logistics, and fulfilment operations as we scale across Africa and beyond.",
  },
  {
    title: "Brand & Content Lead",
    department: "Marketing",
    location: "Lagos / Remote",
    type: "Full-time",
    description: "Own the Martinonoir brand voice across all channels — social, email, editorial, and beyond.",
  },
  {
    title: "Leather Goods Artisan",
    department: "Production",
    location: "Lagos",
    type: "Full-time",
    description: "Join our in-house workshop team. You have at least 3 years of leather crafting experience and take immense pride in your work.",
  },
];

const deptColors: Record<string, string> = {
  Engineering: "bg-primary-100 text-primary-700",
  Design: "bg-accent-gold-light text-accent-gold-dark",
  Operations: "bg-surface-2 text-ink-600",
  Marketing: "bg-success-light text-success",
  Production: "bg-warning-light text-warning",
};

export default function CareersPage() {
  const perksRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const perksVisible = useInView(perksRef, { threshold: 0.08 });
  const rolesVisible = useInView(rolesRef, { threshold: 0.05 });
  const ctaVisible = useInView(ctaRef, { threshold: 0.1 });

  const [filter, setFilter] = useState("All");
  const departments = ["All", ...Array.from(new Set(openings.map((o) => o.department)))];
  const filtered = filter === "All" ? openings : openings.filter((o) => o.department === filter);

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
              We&apos;re Hiring
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
                { label: "Open Roles", value: `${openings.length}` },
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
              className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-[800ms] ease-enter ${
                rolesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Open Positions</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Current Openings</h2>
              </div>
              {/* department filter */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilter(d)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-micro ${
                      filter === d
                        ? "bg-primary-700 text-white shadow-sm"
                        : "bg-surface-0 text-ink-500 border border-rule/60 hover:border-primary-300 hover:text-primary-700"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filtered.map((role, i) => (
                <div
                  key={role.title}
                  className={`group bg-surface-0 rounded-xl border border-rule/50 p-6 md:p-8 hover:border-primary-300/60 hover:shadow-md transition-all duration-standard ${
                    rolesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms`, transitionDuration: "700ms" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${deptColors[role.department] ?? "bg-surface-2 text-ink-500"}`}>
                          {role.department}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <MapPin size={11} /> {role.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <Clock size={11} /> {role.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-ink-900 group-hover:text-primary-700 transition-colors duration-micro mb-2">
                        {role.title}
                      </h3>
                      <p className="text-sm text-ink-500 leading-relaxed max-w-2xl">{role.description}</p>
                    </div>
                    <Link
                      href={`mailto:careers@martinonoir.com?subject=Application: ${encodeURIComponent(role.title)}`}
                      className="group/btn shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold rounded-lg transition-all duration-standard hover:shadow-md self-start"
                    >
                      Apply Now
                      <ArrowRight size={13} className="transition-transform duration-standard group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
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
              href="mailto:careers@martinonoir.com"
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
