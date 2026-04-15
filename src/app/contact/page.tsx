"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Headphones,
  Package,
  RotateCcw,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Contact channel cards ─────────────────────────────────── */
const channels = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@martinonoir.com",
    description: "We reply within 24 hours on business days.",
    href: "mailto:support@martinonoir.com",
    cta: "Send an email",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "0803 801 0651",
    description: "Available Monday – Friday, 9 am – 6 pm WAT.",
    href: "tel:+2348038010651",
    cta: "Call now",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Lagos, Nigeria",
    description: "Our store is open Monday through Saturday.",
    href: "#",
    cta: "Get directions",
  },
];

/* ─── Quick topic shortcuts ──────────────────────────────────── */
const topics = [
  { icon: Package, label: "Track My Order", href: "/track-order" },
  { icon: RotateCcw, label: "Returns & Exchanges", href: "/returns" },
  { icon: Headphones, label: "Help Center", href: "/help" },
  { icon: MessageSquare, label: "Size Guide", href: "/size-guide" },
];

/* ─── FAQ items ─────────────────────────────────────────────── */
const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard delivery within Lagos takes 1–2 business days. Other states typically take 3–5 business days. International orders ship within 7–14 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery for unworn, undamaged items in original packaging. Refunds are processed within 5–7 business days of receiving your return.",
  },
  {
    q: "Are your leather products authentic?",
    a: "Every Martinonoir piece is crafted from genuine premium leather sourced from certified tanneries. Each product ships with a certificate of authenticity.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept Paystack, Moniepoint, Stripe, Visa, and Mastercard. All transactions are encrypted and fully secured.",
  },
];

/* ─── FAQ accordion item ─────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-rule/60 rounded-xl overflow-hidden transition-shadow duration-standard hover:shadow-sm"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-surface-0 hover:bg-surface-1 transition-colors duration-micro"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-ink-900">{q}</span>
        <ChevronRight
          size={16}
          className={`shrink-0 text-ink-400 transition-transform duration-standard ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-emphatic ease-enter ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-ink-500 leading-relaxed border-t border-rule/40 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ContactPage() {
  /* section refs for scroll animations */
  const heroRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const channelsVisible = useInView(channelsRef, { threshold: 0.1 });
  const formVisible = useInView(formRef, { threshold: 0.08 });
  const faqVisible = useInView(faqRef, { threshold: 0.1 });

  /* form state */
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* TODO: wire to /api/contact */
    setSubmitted(true);
  }

  return (
    <>
      <Header />

      <main>
        {/* ── Hero banner ─────────────────────────────────────── */}
        <section className="relative bg-ink-900 pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          {/* decorative glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div ref={heroRef} className="content-grid relative z-10 text-center">
            {/* breadcrumb */}
            <nav className="flex items-center justify-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">
                Home
              </Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">Contact Us</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
              We&apos;re here to help
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight text-balance">
              Get in{" "}
              <span className="gold-gradient">Touch</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed text-balance">
              Have a question, concern, or just want to say hello? Our team is
              ready to assist you every step of the way.
            </p>

            {/* quick-topic pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {topics.map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.label}
                    href={t.href}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary-800/50 border border-white/10 hover:border-primary-500/40 rounded-full text-xs text-white/60 hover:text-white transition-all duration-standard"
                  >
                    <Icon size={13} className="text-primary-400 group-hover:text-primary-300 transition-colors duration-micro" />
                    {t.label}
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-standard" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Channel cards ────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-surface-1">
          <div ref={channelsRef} className="content-grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <div
                    key={ch.label}
                    className={`group relative bg-surface-0 rounded-xl border border-rule/60 p-8 hover:border-primary-300/60 hover:shadow-lg transition-all duration-emphatic ${
                      channelsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      transitionDuration: "700ms",
                    }}
                  >
                    {/* top accent line */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary-400/0 to-transparent group-hover:via-primary-400/60 rounded-full transition-all duration-emphatic" />

                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 group-hover:bg-primary-200 transition-colors duration-standard mb-5">
                      <Icon size={22} className="text-primary-700" />
                    </div>

                    <p className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-1">
                      {ch.label}
                    </p>
                    <p className="text-lg font-semibold text-ink-900 mb-2">
                      {ch.value}
                    </p>
                    <p className="text-sm text-ink-500 leading-relaxed mb-6">
                      {ch.description}
                    </p>

                    <a
                      href={ch.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors duration-micro group/link"
                    >
                      {ch.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-standard group-hover/link:translate-x-1"
                      />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* business hours strip */}
            <div
              className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 px-6 py-4 rounded-xl bg-surface-0 border border-rule/40 transition-all duration-[700ms] ease-enter ${
                channelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center gap-2 text-sm text-ink-500">
                <Clock size={15} className="text-primary-500" />
                <span className="font-medium text-ink-700">Business Hours</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-rule/60" />
              {[
                { days: "Mon – Fri", hours: "9:00 am – 6:00 pm WAT" },
                { days: "Saturday", hours: "10:00 am – 4:00 pm WAT" },
                { days: "Sunday", hours: "Closed" },
              ].map((h, i, arr) => (
                <span key={h.days} className="flex items-center gap-4 text-sm text-ink-500">
                  <span>
                    <span className="font-medium text-ink-700">{h.days}:</span>{" "}
                    {h.hours}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="hidden sm:block text-rule/80">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact form + FAQ ───────────────────────────────── */}
        <section className="py-20 md:py-32 bg-surface-0">
          <div className="content-grid">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-16">

              {/* ── Form ── */}
              <div
                ref={formRef}
                className={`transition-all duration-[800ms] ease-enter ${
                  formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">
                  Send a Message
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-ink-900">
                  We&apos;d love to hear from you
                </h2>
                <p className="mt-3 text-ink-500 leading-relaxed max-w-lg">
                  Fill in the form and a member of our team will get back to you
                  within one business day.
                </p>

                {submitted ? (
                  /* success state */
                  <div className="mt-10 flex flex-col items-center text-center py-16 px-8 rounded-xl border border-success/20 bg-success-light gap-4 animate-scale-in">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-success/10">
                      <CheckCircle2 size={28} className="text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-ink-900">
                      Message sent!
                    </h3>
                    <p className="text-sm text-ink-500 max-w-xs leading-relaxed">
                      Thank you for reaching out. We&apos;ll reply to{" "}
                      <span className="font-medium text-ink-700">
                        {formData.email}
                      </span>{" "}
                      within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          orderNumber: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors duration-micro"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-5"
                    noValidate
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide"
                        >
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide"
                        >
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                        />
                      </div>
                    </div>

                    {/* Subject + Order Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide"
                        >
                          Subject <span className="text-danger">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A6775' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                            paddingRight: "36px",
                          }}
                        >
                          <option value="" disabled>
                            Select a topic…
                          </option>
                          <option value="order">Order Inquiry</option>
                          <option value="return">Return / Exchange</option>
                          <option value="shipping">Shipping & Delivery</option>
                          <option value="product">Product Question</option>
                          <option value="payment">Payment Issue</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="orderNumber"
                          className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide"
                        >
                          Order Number{" "}
                          <span className="text-ink-300 font-normal">(optional)</span>
                        </label>
                        <input
                          id="orderNumber"
                          name="orderNumber"
                          type="text"
                          placeholder="MN-00000"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide"
                      >
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us how we can help you…"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-800 active:bg-primary-900 text-white font-semibold text-sm tracking-wide rounded-lg transition-all duration-standard hover:shadow-lg hover:shadow-primary-900/20 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Send Message
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-standard group-hover:translate-x-1"
                      />
                    </button>
                  </form>
                )}
              </div>

              {/* ── FAQ sidebar ── */}
              <div
                ref={faqRef}
                className={`transition-all duration-[800ms] ease-enter ${
                  faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                {/* sticky wrapper */}
                <div className="lg:sticky lg:top-28">
                  <span className="text-primary-700 text-xs font-semibold tracking-widest uppercase">
                    Quick Answers
                  </span>
                  <h2 className="mt-2 text-2xl font-display font-bold text-ink-900">
                    Frequently Asked
                  </h2>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed mb-7">
                    Can&apos;t find what you need?{" "}
                    <Link
                      href="/help"
                      className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro"
                    >
                      Browse the Help Center →
                    </Link>
                  </p>

                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                    ))}
                  </div>

                  {/* dark CTA card */}
                  <div className="mt-8 relative rounded-xl overflow-hidden bg-ink-900 p-7">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-800/60 mb-4">
                        <Headphones size={18} className="text-primary-300" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        Need faster support?
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed mb-5">
                        Call us directly for urgent order issues or
                        time-sensitive inquiries.
                      </p>
                      <a
                        href="tel:+2348038010651"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-all duration-standard hover:shadow-md"
                      >
                        <Phone size={14} />
                        0803 801 0651
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-standard group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
