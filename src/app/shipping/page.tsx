"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Truck,
  Globe,
  Clock,
  Package,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const domesticZones = [
  { zone: "Lagos (Island & Mainland)", time: "1 – 2 business days", cost: "₦2,500", free: "Orders above ₦150,000" },
  { zone: "Abuja, Port Harcourt", time: "2 – 3 business days", cost: "₦3,500", free: "Orders above ₦150,000" },
  { zone: "Other Nigerian States", time: "3 – 5 business days", cost: "₦4,000", free: "Orders above ₦150,000" },
];

const internationalZones = [
  { zone: "United Kingdom", time: "5 – 7 business days", cost: "$25" },
  { zone: "United States & Canada", time: "7 – 10 business days", cost: "$30" },
  { zone: "Europe", time: "6 – 9 business days", cost: "$28" },
  { zone: "West Africa", time: "4 – 6 business days", cost: "$18" },
  { zone: "Rest of World", time: "10 – 14 business days", cost: "$35" },
];

const processSteps = [
  { icon: Package, title: "Order Confirmed", body: "You'll receive an email confirmation with your order number within minutes of placing your order." },
  { icon: ShieldCheck, title: "Quality Check", body: "Each item is inspected by our team before packaging to ensure it meets Martinonoir standards." },
  { icon: Truck, title: "Shipped & Tracked", body: "Your order is handed to our courier partner. A tracking link is emailed to you immediately." },
  { icon: CheckCircle2, title: "Delivered", body: "Your order arrives in our signature packaging, protected and presentation-ready." },
];

export default function ShippingPage() {
  const processRef = useRef<HTMLDivElement>(null);
  const domesticRef = useRef<HTMLDivElement>(null);
  const intlRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const processVisible = useInView(processRef, { threshold: 0.08 });
  const domesticVisible = useInView(domesticRef, { threshold: 0.08 });
  const intlVisible = useInView(intlRef, { threshold: 0.08 });
  const infoVisible = useInView(infoRef, { threshold: 0.1 });

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(30,95,204,0.12),transparent_55%)]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Shipping Info</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
                  <Truck size={12} />
                  Delivery
                </span>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.05] text-balance">
                  Shipping &{" "}
                  <span className="gold-gradient">Delivery</span>
                </h1>
                <p className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed">
                  Every Martinonoir order is carefully packaged and dispatched with a premium courier. We ship across Nigeria and to 40+ countries worldwide.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 px-5 py-3.5 bg-success/10 border border-success/20 rounded-xl">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-white">Free shipping</span> on all Nigerian orders above ₦150,000
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "Countries", value: "40+" },
                  { icon: Clock, label: "Fastest delivery", value: "Next day" },
                  { icon: ShieldCheck, label: "Every order", value: "Insured" },
                  { icon: Package, label: "Packaging", value: "Signature" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="p-6 rounded-xl bg-white/4 border border-white/8 flex flex-col gap-3">
                      <Icon size={20} className="text-primary-400" />
                      <div>
                        <p className="text-xl font-display font-bold text-white">{s.value}</p>
                        <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={processRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">How It Works</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">From order to door</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`relative flex flex-col items-start p-8 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:shadow-md transition-all duration-standard ${
                      processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}
                  >
                    <span className="absolute top-6 right-6 text-5xl font-display font-bold text-surface-2 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary-100 mb-5 relative z-10">
                      <Icon size={20} className="text-primary-700" />
                    </div>
                    <h3 className="text-base font-semibold text-ink-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Domestic rates ────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-1">
          <div className="content-grid">
            <div
              ref={domesticRef}
              className={`transition-all duration-[800ms] ease-enter ${
                domesticVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Nigeria</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900 mb-8">Domestic Shipping</h2>
              <div className="overflow-hidden rounded-xl border border-rule/50 bg-surface-0 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-1 border-b border-rule/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Delivery Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Standard Rate</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Free Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domesticZones.map((zone, i) => (
                      <tr key={zone.zone} className={`border-b border-rule/30 hover:bg-surface-1 transition-colors duration-micro ${i === domesticZones.length - 1 ? "border-b-0" : ""}`}>
                        <td className="px-6 py-4 font-medium text-ink-900">{zone.zone}</td>
                        <td className="px-6 py-4 text-ink-600">{zone.time}</td>
                        <td className="px-6 py-4 font-semibold text-ink-900">{zone.cost}</td>
                        <td className="px-6 py-4 text-success text-xs font-medium">{zone.free}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── International rates ───────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-0">
          <div className="content-grid">
            <div
              ref={intlRef}
              className={`transition-all duration-[800ms] ease-enter ${
                intlVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Worldwide</span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">International Shipping</h2>
                  <p className="mt-2 text-sm text-ink-500">All international shipments are fully tracked, insured, and delivered by premium courier partners.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-rule/50 bg-surface-0 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-1 border-b border-rule/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Region</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Delivery Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">Flat Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internationalZones.map((zone, i) => (
                      <tr key={zone.zone} className={`border-b border-rule/30 hover:bg-surface-1 transition-colors duration-micro ${i === internationalZones.length - 1 ? "border-b-0" : ""}`}>
                        <td className="px-6 py-4 font-medium text-ink-900">{zone.zone}</td>
                        <td className="px-6 py-4 text-ink-600">{zone.time}</td>
                        <td className="px-6 py-4 font-semibold text-ink-900">{zone.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-ink-400">
                * Delivery times are estimates and exclude customs clearance delays. International duties and taxes are the responsibility of the recipient.
              </p>
            </div>
          </div>
        </section>

        {/* ── Info boxes ────────────────────────────────────────── */}
        <section className="py-20 bg-surface-1">
          <div
            ref={infoRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Order cut-off time", body: "Orders placed before 2:00 PM WAT on business days are dispatched the same day. Orders after 2:00 PM ship the next business day." },
                { title: "Packaging", body: "All orders ship in our signature box with a dust bag, tissue paper, and authenticity certificate. No plastic packaging is used." },
                { title: "Damaged in transit?", body: "If your order arrives damaged, please photograph it immediately and contact us within 48 hours. We'll arrange a replacement at no cost." },
              ].map((info, i) => (
                <div
                  key={info.title}
                  className="p-7 bg-surface-0 rounded-xl border border-rule/50 hover:border-primary-200 hover:shadow-sm transition-all duration-standard"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className="text-sm font-semibold text-ink-900 mb-2">{info.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{info.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-ink-500">
              Questions about your delivery?{" "}
              <Link href="/contact" className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro">
                Contact us →
              </Link>{" "}
              or{" "}
              <Link href="/track-order" className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro">
                track your order →
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
