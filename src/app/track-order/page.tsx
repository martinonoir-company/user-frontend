"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api, ShippingTracking } from "@/lib/api";

/**
 * AAJ status enum → the 5-step stepper. AAJ:
 *   0 LABEL_CREATED, 1 PICKED_UP, 2 IN_TRANSIT, 3 OUT_FOR_DELIVERY, 4 DELIVERED.
 * We collapse PICKED_UP + the booking stage into "Shipped" for a clean
 * 4-step bar that mirrors the order lifecycle a customer expects.
 */
const steps: { label: string; icon: typeof Package; minStatus: number }[] = [
  { label: "Order Placed", icon: Package, minStatus: 0 },
  { label: "Shipped", icon: Truck, minStatus: 1 },
  { label: "Out for Delivery", icon: MapPin, minStatus: 3 },
  { label: "Delivered", icon: CheckCircle2, minStatus: 4 },
];

/** Map an AAJ status code to the active stepper index (0..3). */
function stepIndexFromStatus(status: number | null): number {
  if (status === null) return 0;
  if (status >= 4) return 3;
  if (status >= 3) return 2;
  if (status >= 1) return 1;
  return 0;
}

const STATUS_LABELS: Record<number, string> = {
  0: "Label created",
  1: "Picked up",
  2: "In transit",
  3: "Out for delivery",
  4: "Delivered",
};

export default function TrackOrderPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const formVisible = useInView(formRef, { threshold: 0.1 });
  const tipsVisible = useInView(tipsRef, { threshold: 0.1 });

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ShippingTracking | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await api.trackByOrderNumber(orderNumber.trim());
      setResult(res.data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  const currentStep = result ? stepIndexFromStatus(result.status) : -1;

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
              <span className="text-white/50">Track Order</span>
            </nav>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-500/25 text-white/80 text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
              Order Tracking
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight text-balance">
              Track your <span className="gold-gradient">order</span>
            </h1>
            <p className="mt-5 text-white/50 max-w-lg mx-auto leading-relaxed">
              Enter your order number and email address to see real-time delivery status.
            </p>
          </div>
        </section>

        {/* ── Form + Result ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-surface-1">
          <div className="content-grid">
            <div
              ref={formRef}
              className={`max-w-xl mx-auto transition-all duration-[800ms] ease-enter ${
                formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-surface-0 rounded-2xl border border-rule/60 p-8 md:p-10 shadow-sm">
                <h2 className="text-xl font-display font-bold text-ink-900 mb-6">Find your order</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="order-number" className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide">
                      Order Number <span className="text-danger">*</span>
                    </label>
                    <input
                      id="order-number"
                      type="text"
                      required
                      placeholder="e.g. MN-00123"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-email" className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      required
                      placeholder="The email you ordered with"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-rule bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-micro"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    <Search size={16} />
                    {loading ? "Tracking…" : "Track Order"}
                    <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
                  </button>
                </form>
              </div>

              {/* ── Not found ── */}
              {searched && notFound && (
                <div className="mt-6 p-6 bg-danger-light border border-danger/20 rounded-xl flex items-start gap-4 animate-scale-in">
                  <AlertCircle size={20} className="text-danger shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-ink-900">Order not found</h3>
                    <p className="text-sm text-ink-500 mt-1">
                      We couldn&apos;t find an order matching those details. Please check your order confirmation email and try again, or{" "}
                      <Link href="/contact" className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro">
                        contact support
                      </Link>.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Result ── */}
              {result && (
                <div className="mt-6 bg-surface-0 rounded-2xl border border-rule/60 p-8 shadow-sm animate-scale-in">
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-1">
                        Order {result.orderNumber ?? orderNumber.trim()}
                      </p>
                      {result.trackingNumber && (
                        <p className="text-sm text-ink-500 font-mono">
                          AAJ {result.trackingNumber}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                        result.status === 4
                          ? "bg-success-light text-success"
                          : result.pending
                            ? "bg-amber-100 text-amber-700"
                            : "bg-primary-100 text-primary-700"
                      }`}
                    >
                      {result.optedOut
                        ? "Self-pickup"
                        : result.pending
                          ? "Preparing"
                          : STATUS_LABELS[result.status ?? 0] ?? "Processing"}
                    </span>
                  </div>

                  {/* Opted out — no shipment to track */}
                  {result.optedOut ? (
                    <p className="text-sm text-ink-500">
                      This order was placed for self-pickup, so there is no
                      delivery to track.
                    </p>
                  ) : result.pending ? (
                    <p className="text-sm text-ink-500">
                      {result.description ||
                        "We're still arranging your shipment. Check back in a few minutes."}
                    </p>
                  ) : (
                    <>
                      {/* stepper */}
                      <div className="relative mb-8">
                        <div className="absolute top-5 left-5 right-5 h-0.5 bg-rule/60" />
                        <div
                          className="absolute top-5 left-5 h-0.5 bg-primary-600 transition-all duration-[1000ms] ease-enter"
                          style={{
                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                          }}
                        />
                        <div className="relative flex justify-between">
                          {steps.map((step, i) => {
                            const Icon = step.icon;
                            const done = i <= currentStep;
                            const active = i === currentStep;
                            return (
                              <div
                                key={step.label}
                                className="flex flex-col items-center gap-2"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-standard z-10 ${
                                    done
                                      ? "bg-primary-700 border-primary-700"
                                      : "bg-surface-0 border-rule/50"
                                  } ${active ? "ring-4 ring-primary-200" : ""}`}
                                >
                                  <Icon
                                    size={16}
                                    className={done ? "text-white" : "text-ink-300"}
                                  />
                                </div>
                                <span
                                  className={`text-[10px] font-semibold text-center leading-tight max-w-[60px] ${
                                    done ? "text-ink-700" : "text-ink-300"
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Latest + ETA */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-ink-600">
                          <Clock size={15} className="text-primary-500 shrink-0" />
                          <span>
                            <span className="font-medium text-ink-800">
                              Latest:
                            </span>{" "}
                            {result.description ||
                              STATUS_LABELS[result.status ?? 0]}
                          </span>
                        </div>
                        {result.etaDate && result.status !== 4 && (
                          <div className="flex items-center gap-3 text-ink-600">
                            <Truck size={15} className="text-primary-500 shrink-0" />
                            <span>
                              <span className="font-medium text-ink-800">
                                Estimated delivery:
                              </span>{" "}
                              {new Date(result.etaDate).toLocaleDateString(
                                "en-NG",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Event timeline */}
                      {result.events.length > 0 && (
                        <ol className="mt-6 pt-6 border-t border-rule/40 space-y-4">
                          {[...result.events].reverse().map((ev, i) => (
                            <li key={i} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-2.5 h-2.5 rounded-full mt-1 ${
                                    i === 0 ? "bg-primary-600" : "bg-ink-200"
                                  }`}
                                />
                                {i < result.events.length - 1 && (
                                  <div className="w-px flex-1 bg-rule/50 my-1" />
                                )}
                              </div>
                              <div className="pb-1">
                                <p className="text-sm text-ink-800 font-medium">
                                  {ev.description}
                                </p>
                                <p className="text-xs text-ink-400 mt-0.5">
                                  {ev.location ? `${ev.location} · ` : ""}
                                  {new Date(ev.dateTime).toLocaleString("en-NG", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Tips ─────────────────────────────────────────────── */}
        <section className="py-20 bg-surface-0">
          <div
            ref={tipsRef}
            className={`content-grid transition-all duration-[800ms] ease-enter ${
              tipsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-ink-900 mb-8 text-center">Helpful information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Order confirmation email", body: "Your order number is in your confirmation email, sent immediately after purchase. Check your spam folder if you can't find it." },
                  { title: "Tracking updates", body: "Tracking information is updated every 4–8 hours. If your status hasn't changed in 48 hours, please contact us." },
                  { title: "Delivery attempts", body: "If you miss a delivery, our courier will leave a card. You can reschedule via the tracking link in your email." },
                  { title: "International orders", body: "International tracking may show fewer updates between countries. This is normal — your package is on the way." },
                ].map((tip, i) => (
                  <div
                    key={tip.title}
                    className="p-6 rounded-xl bg-surface-1 border border-rule/40"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <h3 className="text-sm font-semibold text-ink-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{tip.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-ink-500">
                Need more help?{" "}
                <Link href="/contact" className="text-primary-700 font-medium hover:text-primary-800 transition-colors duration-micro">
                  Contact our support team →
                </Link>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
