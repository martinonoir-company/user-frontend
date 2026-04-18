"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Leaf, Award, Users, Heart } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Every stitch, every cut, every finish is reviewed against the highest standard. We reject anything that doesn't meet the Martinonoir benchmark.",
  },
  {
    icon: Leaf,
    title: "Responsible Sourcing",
    description:
      "Our leather comes exclusively from certified tanneries that meet international animal welfare and environmental standards.",
  },
  {
    icon: Users,
    title: "Artisan Partnership",
    description:
      "We work directly with master craftspeople across West Africa and Italy, paying fair wages and preserving generational techniques.",
  },
  {
    icon: Heart,
    title: "Crafted with Intention",
    description:
      "Each product is designed to be worn daily for years — not seasons. Timelessness is the ultimate luxury.",
  },
];

const milestones = [
  { year: "2018", event: "Founded in Lagos by Martins Nwude with a single leather bag design." },
  { year: "2019", event: "First collection sold out in 72 hours. Workshop expanded to 12 artisans." },
  { year: "2021", event: "Launched clothing line. Opened flagship showroom in Onitsha." },
  { year: "2023", event: "Introduced international shipping to 7+ countries." },
  { year: "2024", event: "Reached 50,000 customers across Africa, Europe, and North America." },
  { year: "2025", event: "Launched Martinonoir digital storefront and unified commerce platform." },
];


export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const missionVisible = useInView(missionRef, { threshold: 0.1 });
  const valuesVisible = useInView(valuesRef, { threshold: 0.08 });
  const timelineVisible = useInView(timelineRef, { threshold: 0.08 });
  const ctaVisible = useInView(ctaRef, { threshold: 0.1 });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-0 md:pt-44 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary-800/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">About Us</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end pb-0">
              <div className="pb-20 md:pb-28">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                  Our Story
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] text-balance">
                  Built on{" "}
                  <span className="gold-gradient">Craft</span>,<br />
                  Driven by{" "}
                  <span className="gold-gradient">Purpose</span>
                </h1>
                <p className="mt-6 text-lg text-white/55 leading-relaxed max-w-lg">
                  Martinonoir was born from a single belief: that truly great things are made slowly, with intention, by people who care deeply about their work.
                </p>
                <div className="mt-10 flex flex-wrap gap-10">
                  {[
                    { number: "6+", label: "Years of Craft" },
                    { number: "7+", label: "Countries Serving" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-display font-bold text-white">{stat.number}</p>
                      <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero image — bleeds to bottom */}
              <div className="relative h-[420px] md:h-[560px] rounded-t-2xl overflow-hidden self-end">
                <Image
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=1100&fit=crop&q=85"
                  alt="Martinonoir leather craft"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ──────────────────────────────────────────── */}
        <section className="py-24 md:py-36 bg-surface-1">
          <div
            ref={missionRef}
            className={`content-grid transition-all duration-[900ms] ease-enter ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Our Mission</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold text-ink-900 leading-tight text-balance">
                Luxury that respects people, craft, and the planet
              </h2>
              <p className="mt-6 text-lg text-ink-500 leading-relaxed">
                We believe luxury should never come at someone else&apos;s expense. From the ranches where our hides are sourced to the workshops where our bags are assembled, every decision is made with care. We don&apos;t chase trends. We build heirlooms.
              </p>
            </div>

            <div className="mt-16 relative rounded-2xl overflow-hidden aspect-[21/8]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=540&fit=crop&q=85"
                alt="Martinonoir atelier"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-ink-900/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <blockquote className="text-center px-8">
                  <p className="text-2xl md:text-4xl font-display font-bold text-white leading-snug text-balance max-w-2xl">
                    &ldquo;Crafted with intention. Delivered with care.&rdquo;
                  </p>
                  <cite className="block mt-4 text-white/50 text-sm not-italic">— Martins Nwude, Founder</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={valuesRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">What We Stand For</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className={`group p-8 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:border-primary-200 hover:shadow-md transition-all duration-standard ${
                      valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "800ms" }}
                  >
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary-100 group-hover:bg-primary-200 transition-colors duration-standard mb-5">
                      <Icon size={20} className="text-primary-700" />
                    </div>
                    <h3 className="text-base font-semibold text-ink-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{v.description}</p>
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
              ref={timelineRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                timelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">The Journey</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">Our Milestones</h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              {/* vertical line */}
              <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-rule/60 -translate-x-1/2" />
              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className={`relative flex items-start gap-6 md:gap-0 transition-all duration-[800ms] ease-enter ${
                      timelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* dot */}
                    <div className="absolute left-[18px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 border-2 border-surface-1 shadow-sm mt-1 z-10" />
                    <div className={`pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                      <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">{m.year}</span>
                      <p className="mt-1 text-sm text-ink-600 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-ink-900 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-800/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div
            ref={ctaRef}
            className={`content-grid relative z-10 text-center transition-all duration-[800ms] ease-enter ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white text-balance">
              Join the <span className="gold-gradient">Martinonoir</span> family
            </h2>
            <p className="mt-5 text-white/50 max-w-lg mx-auto leading-relaxed">
              Experience what it means to wear something made with purpose. Explore the full collection.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop the Collection
                <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-sm rounded-lg transition-all duration-standard hover:-translate-y-0.5"
              >
                View Careers
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
