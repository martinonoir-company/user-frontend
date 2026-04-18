"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Package,
  Truck,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Start your return",
    body: "Visit the returns portal below and enter your order number and email. Select the items you'd like to return and the reason.",
  },
  {
    icon: Truck,
    step: "02",
    title: "Ship it back",
    body: "We'll email you a prepaid return label. Pack the item securely in its original packaging and drop it at any approved courier location.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "We inspect it",
    body: "Our quality team inspects your return within 2 business days of receipt. You'll receive an email once the inspection is complete.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Refund issued",
    body: "Approved refunds are processed to your original payment method within 5–7 business days. Bank transfer times may vary.",
  },
];

const eligible = [
  "Unworn and undamaged items",
  "Items in original packaging with all tags attached",
  "Items returned within 30 days of delivery",
  "Accompanied by original receipt or order number",
];

const ineligible = [
  "Items showing signs of wear, use, or damage",
  "Items missing original packaging or tags",
  "Returns initiated after 30 days from delivery",
  "Items purchased during flash sale events (marked Final Sale)",
  "Gift cards",
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

const faqs = [
  {
    q: "How long do I have to return an item?",
    a: "You have 30 days from the date of delivery to initiate a return. Items must be in their original, unworn condition with all tags and packaging intact.",
  },
  {
    q: "Is return shipping free?",
    a: "Yes, for all Nigerian domestic returns we provide a prepaid return label at no cost to you. For international returns, a flat return shipping fee applies and is deducted from your refund.",
  },
  {
    q: "Can I exchange instead of returning?",
    a: "Yes. During the return process you can select 'Exchange' and choose your preferred size or colour. We'll ship the new item as soon as we receive your return.",
  },
  {
    q: "When will I receive my refund?",
    a: "Once your return is inspected and approved, refunds are processed within 5–7 business days to your original payment method. You'll receive an email confirmation.",
  },
  {
    q: "My item arrived damaged. What should I do?",
    a: "We're sorry about this. Please photograph the damage immediately and contact us within 48 hours of delivery at support@martinonoir.com or 0803 801 0651. We'll arrange a replacement at no cost.",
  },
];

export default function ReturnsPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const stepsVisible = useInView(stepsRef, { threshold: 0.08 });
  const eligibilityVisible = useInView(eligibilityRef, { threshold: 0.08 });
  const portalVisible = useInView(portalRef, { threshold: 0.1 });
  const faqVisible = useInView(faqRef, { threshold: 0.05 });

  /* return portal form */
  const [submitted, setSubmitted] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [portalEmail, setPortalEmail] = useState("");

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_0%,rgba(30,95,204,0.12),transparent_55%)]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-64 bg-accent-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">Home</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Returns & Exchanges</span>
            </nav>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
                <RotateCcw size={12} />
                Easy Returns
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-[1.05] text-balance">
                Returns &{" "}
                <span className="gold-gradient">Exchanges</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-lg">
                Not completely satisfied? No problem. We offer free 30-day returns on all eligible items — no questions asked.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {["30-day window", "Free return shipping", "5–7 day refunds", "Easy exchanges"].map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 size={14} className="text-success" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Steps ────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div
              ref={stepsRef}
              className={`text-center mb-16 transition-all duration-[800ms] ease-enter ${
                stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">How It Works</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ink-900">The return process</h2>
              <p className="mt-3 text-ink-500 max-w-md mx-auto">Four simple steps and we take care of everything else.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className={`relative p-8 rounded-xl border border-rule/50 bg-surface-0 hover:bg-surface-1 hover:shadow-md transition-all duration-standard ${
                      stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}
                  >
                    <span className="absolute top-6 right-6 text-5xl font-display font-bold text-surface-2 select-none">{step.step}</span>
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

        {/* ── Eligibility ───────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-1">
          <div className="content-grid">
            <div
              ref={eligibilityRef}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-[800ms] ease-enter ${
                eligibilityVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Policy</span>
                <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900 mb-8">Return eligibility</h2>

                <h3 className="flex items-center gap-2 text-sm font-semibold text-success mb-4">
                  <CheckCircle2 size={16} className="text-success" />
                  Eligible for return
                </h3>
                <ul className="space-y-3 mb-10">
                  {eligible.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-600">
                      <CheckCircle2 size={14} className="text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="flex items-center gap-2 text-sm font-semibold text-danger mb-4">
                  <XCircle size={16} className="text-danger" />
                  Not eligible for return
                </h3>
                <ul className="space-y-3">
                  {ineligible.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-600">
                      <XCircle size={14} className="text-danger mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* policy card */}
              <div className="space-y-4">
                {[
                  { title: "Return window", body: "30 days from the date of delivery confirmed by courier tracking." },
                  { title: "Refund method", body: "Refunds are issued to the original payment method. Bank transfers may take an additional 3–5 days to appear." },
                  { title: "Exchange", body: "Exchanges ship immediately from our warehouse once we receive your return — no waiting for inspection first." },
                  { title: "International returns", body: "International customers may return items within 30 days. A flat return shipping fee is deducted from the refund." },
                  { title: "Lifetime repairs", body: "Prefer a repair over a return? All Martinonoir leather goods come with a lifetime free repair promise." },
                ].map((card) => (
                  <div key={card.title} className="p-6 bg-surface-0 rounded-xl border border-rule/50 hover:border-primary-200 hover:shadow-sm transition-all duration-standard">
                    <h4 className="text-sm font-semibold text-ink-900 mb-1.5">{card.title}</h4>
                    <p className="text-sm text-ink-500 leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Portal ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-0">
          <div
            ref={portalRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              portalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">Start a Return</span>
                <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">Returns Portal</h2>
                <p className="mt-3 text-ink-500">Enter your order details to begin. We&apos;ll send you a prepaid return label by email.</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center text-center py-14 px-8 rounded-2xl border border-success/20 bg-success-light gap-4 animate-scale-in">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 size={28} className="text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-900">Return initiated!</h3>
                  <p className="text-sm text-ink-500 max-w-xs leading-relaxed">
                    Check your email for a prepaid return label and instructions. Your return will be processed within 2 business days of receipt.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setOrderNum(""); setPortalEmail(""); }}
                    className="mt-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors duration-micro"
                  >
                    Start another return
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="bg-surface-0 rounded-2xl border border-rule/60 p-8 shadow-sm space-y-5"
                >
                  <div>
                    <label htmlFor="return-order" className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide">
                      Order Number <span className="text-danger">*</span>
                    </label>
                    <input
                      id="return-order"
                      type="text"
                      required
                      placeholder="e.g. MN-00123"
                      value={orderNum}
                      onChange={(e) => setOrderNum(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                    />
                  </div>
                  <div>
                    <label htmlFor="return-email" className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      id="return-email"
                      type="email"
                      required
                      placeholder="The email you ordered with"
                      value={portalEmail}
                      onChange={(e) => setPortalEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                    />
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-warning-light border border-warning/20 rounded-lg">
                    <AlertCircle size={15} className="text-warning mt-0.5 shrink-0" />
                    <p className="text-xs text-ink-600 leading-relaxed">
                      Make sure your item is unworn, in its original packaging, and within the 30-day return window before proceeding.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Start Return
                    <ArrowRight size={15} className="transition-transform duration-standard group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 bg-surface-1">
          <div
            ref={faqRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-12">
              <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">FAQs</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-ink-900">Common questions</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-ink-500">
              Still have questions?{" "}
              <Link href="/contact" className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro">
                Contact our support team →
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
