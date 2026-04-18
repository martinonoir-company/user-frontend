"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Ruler, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Bag dimensions ─────────────────────────────── */
const bagSizes = [
  { name: "Mini", width: "18 cm", height: "14 cm", depth: "6 cm", strap: "60–110 cm", bestFor: "Evenings, minimalists" },
  { name: "Small", width: "24 cm", height: "18 cm", depth: "8 cm", strap: "65–115 cm", bestFor: "Daily essentials" },
  { name: "Medium", width: "30 cm", height: "22 cm", depth: "10 cm", strap: "70–120 cm", bestFor: "Work & travel" },
  { name: "Large", width: "36 cm", height: "28 cm", depth: "12 cm", strap: "75–125 cm", bestFor: "Laptop, gym, travel" },
  { name: "Tote", width: "42 cm", height: "34 cm", depth: "14 cm", strap: "55 cm (fixed)", bestFor: "Carry-all, market" },
];

/* ── Clothing sizes ──────────────────────────────── */
type Gender = "Women" | "Men";

const clothingSizes: Record<Gender, { size: string; chest: string; waist: string; hips: string; }[]> = {
  Women: [
    { size: "XS", chest: "81–84 cm", waist: "63–66 cm", hips: "89–92 cm" },
    { size: "S",  chest: "85–88 cm", waist: "67–70 cm", hips: "93–96 cm" },
    { size: "M",  chest: "89–93 cm", waist: "71–75 cm", hips: "97–101 cm" },
    { size: "L",  chest: "94–98 cm", waist: "76–80 cm", hips: "102–106 cm" },
    { size: "XL", chest: "99–104 cm", waist: "81–86 cm", hips: "107–112 cm" },
    { size: "XXL", chest: "105–110 cm", waist: "87–92 cm", hips: "113–118 cm" },
  ],
  Men: [
    { size: "XS", chest: "86–90 cm", waist: "72–76 cm", hips: "88–92 cm" },
    { size: "S",  chest: "91–95 cm", waist: "77–81 cm", hips: "93–97 cm" },
    { size: "M",  chest: "96–100 cm", waist: "82–86 cm", hips: "98–102 cm" },
    { size: "L",  chest: "101–106 cm", waist: "87–92 cm", hips: "103–108 cm" },
    { size: "XL", chest: "107–112 cm", waist: "93–98 cm", hips: "109–114 cm" },
    { size: "XXL", chest: "113–118 cm", waist: "99–104 cm", hips: "115–120 cm" },
  ],
};

/* ── How to measure tips ─────────────────────────── */
const tips = [
  { label: "Chest / Bust", body: "Measure around the fullest part of your chest, keeping the tape parallel to the floor and your arms relaxed at your sides." },
  { label: "Waist", body: "Measure around your natural waistline — the narrowest part of your torso, usually just above your belly button." },
  { label: "Hips", body: "Stand with feet together and measure around the fullest part of your hips and seat, about 20 cm below your natural waist." },
  { label: "Strap length", body: "Wear the bag at your preferred position and measure from shoulder to the base of the bag. Compare this to the strap range in the table." },
];

export default function SizeGuidePage() {
  const bagsRef = useRef<HTMLDivElement>(null);
  const clothingRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const bagsVisible = useInView(bagsRef, { threshold: 0.08 });
  const clothingVisible = useInView(clothingRef, { threshold: 0.08 });
  const tipsVisible = useInView(tipsRef, { threshold: 0.1 });

  const [gender, setGender] = useState<Gender>("Women");

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,95,204,0.12),transparent_55%)]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="content-grid relative z-10 text-center">
            <nav className="flex items-center justify-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Size Guide</span>
            </nav>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
              <Ruler size={12} />
              Sizing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight text-balance">
              Find your <span className="gold-gradient">perfect fit</span>
            </h1>
            <p className="mt-5 text-white/50 max-w-xl mx-auto leading-relaxed">
              Every Martinonoir piece is cut to precise measurements. Use these guides to select the right size — and enjoy free exchanges if you need to swap.
            </p>
          </div>
        </section>

        {/* ── Bag dimensions ────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={bagsRef}
              className={`transition-all duration-[800ms] ease-enter ${
                bagsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Bags</span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">Bag Dimensions</h2>
                  <p className="mt-2 text-sm text-ink-500 max-w-lg">All measurements are external. Interior capacity is approximately 85% of the external volume.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-rule/50 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-900 text-white">
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Size</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Width</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Height</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Depth</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider hidden md:table-cell">Strap Range</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider hidden md:table-cell">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface-0">
                    {bagSizes.map((bag, i) => (
                      <tr
                        key={bag.name}
                        className={`border-b border-rule/40 hover:bg-primary-100/30 transition-colors duration-micro ${
                          i === bagSizes.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-5 py-4 font-bold text-ink-900">{bag.name}</td>
                        <td className="px-5 py-4 text-ink-600">{bag.width}</td>
                        <td className="px-5 py-4 text-ink-600">{bag.height}</td>
                        <td className="px-5 py-4 text-ink-600">{bag.depth}</td>
                        <td className="px-5 py-4 text-ink-600 hidden md:table-cell">{bag.strap}</td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-100 text-primary-700">{bag.bestFor}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-ink-400">All measurements in centimetres (cm). Slight variations of ±1 cm may occur due to handcrafting.</p>
            </div>
          </div>
        </section>

        {/* ── Clothing sizes ────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-1">
          <div className="content-grid">
            <div
              ref={clothingRef}
              className={`transition-all duration-[800ms] ease-enter ${
                clothingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Clothing</span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">Clothing Size Guide</h2>
                  <p className="mt-2 text-sm text-ink-500">All measurements are body measurements, not garment measurements.</p>
                </div>
                <div className="flex gap-2">
                  {(["Women", "Men"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-micro ${
                        gender === g
                          ? "bg-ink-900 text-white shadow-sm"
                          : "bg-surface-0 text-ink-500 border border-rule/60 hover:border-ink-400 hover:text-ink-700"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-rule/50 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-900 text-white">
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Size</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Chest / Bust</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Waist</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider">Hips</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface-0">
                    {clothingSizes[gender].map((row, i) => (
                      <tr
                        key={row.size}
                        className={`border-b border-rule/40 hover:bg-primary-100/30 transition-colors duration-micro ${
                          i === clothingSizes[gender].length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-5 py-4 font-bold text-ink-900">{row.size}</td>
                        <td className="px-5 py-4 text-ink-600">{row.chest}</td>
                        <td className="px-5 py-4 text-ink-600">{row.waist}</td>
                        <td className="px-5 py-4 text-ink-600">{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-ink-400">
                Between sizes? We recommend sizing up for a relaxed fit, or sizing down for a more tailored silhouette. Free exchanges if your size isn&apos;t right.
              </p>
            </div>
          </div>
        </section>

        {/* ── How to measure ────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-0">
          <div
            ref={tipsRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              tipsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-12">
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Measuring Guide</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">How to measure yourself</h2>
              <p className="mt-3 text-ink-500 max-w-md mx-auto">Use a soft tape measure and have a friend help for the most accurate results.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {tips.map((tip, i) => (
                <div
                  key={tip.label}
                  className="p-7 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:border-primary-200 hover:shadow-sm transition-all duration-standard"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <h3 className="text-sm font-semibold text-ink-900 mb-2">{tip.label}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ─────────────────────────────────────────── */}
        <section className="py-16 bg-ink-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,95,204,0.08),transparent_60%)]" />
          <div className="content-grid relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">Not sure about your size?</h2>
              <p className="mt-1 text-sm text-white/50">Our team is happy to advise. We also offer free exchanges.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-md hover:-translate-y-0.5"
              >
                Ask us
                <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
              </Link>
              <Link
                href="/returns"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-sm rounded-lg transition-all duration-standard"
              >
                View exchange policy
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
