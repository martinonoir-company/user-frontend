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

/* Mock order statuses */
type OrderStatus = "processing" | "shipped" | "out_for_delivery" | "delivered";

interface MockOrder {
  number: string;
  status: OrderStatus;
  items: string[];
  estimatedDelivery: string;
  lastUpdate: string;
  location: string;
}

const MOCK_ORDERS: Record<string, MockOrder> = {
  "MN-00123": {
    number: "MN-00123",
    status: "shipped",
    items: ["Heritage Tote (Black)"],
    estimatedDelivery: "April 17, 2026",
    lastUpdate: "April 15, 2026 at 10:32 AM",
    location: "Lagos Distribution Centre",
  },
  "MN-00456": {
    number: "MN-00456",
    status: "delivered",
    items: ["Milano Crossbody (Cognac)", "Executive Wallet"],
    estimatedDelivery: "April 13, 2026",
    lastUpdate: "April 13, 2026 at 2:14 PM",
    location: "Delivered to front door",
  },
};

const steps: { key: OrderStatus; label: string; icon: typeof Package }[] = [
  { key: "processing", label: "Order Placed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const statusOrder: OrderStatus[] = ["processing", "shipped", "out_for_delivery", "delivered"];

function getStepIndex(status: OrderStatus) {
  return statusOrder.indexOf(status);
}

export default function TrackOrderPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const formVisible = useInView(formRef, { threshold: 0.1 });
  const tipsVisible = useInView(tipsRef, { threshold: 0.1 });

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<MockOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
    const found = MOCK_ORDERS[orderNumber.toUpperCase().trim()];
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  const currentStep = result ? getStepIndex(result.status) : -1;

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
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all duration-standard hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Search size={16} />
                    Track Order
                    <ArrowRight size={14} className="transition-transform duration-standard group-hover:translate-x-1" />
                  </button>
                </form>

                {/* demo hint */}
                <p className="mt-5 text-xs text-ink-400 text-center">
                  Try demo orders: <button onClick={() => setOrderNumber("MN-00123")} className="text-primary-600 font-medium hover:text-primary-700">MN-00123</button> or{" "}
                  <button onClick={() => setOrderNumber("MN-00456")} className="text-primary-600 font-medium hover:text-primary-700">MN-00456</button>
                </p>
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
                      <p className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-1">Order {result.number}</p>
                      <p className="text-sm text-ink-500">{result.items.join(", ")}</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                      result.status === "delivered"
                        ? "bg-success-light text-success"
                        : "bg-primary-100 text-primary-700"
                    }`}>
                      {result.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* stepper */}
                  <div className="relative mb-8">
                    {/* progress bar */}
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-rule/60" />
                    <div
                      className="absolute top-5 left-5 h-0.5 bg-primary-600 transition-all duration-[1000ms] ease-enter"
                      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />
                    <div className="relative flex justify-between">
                      {steps.map((step, i) => {
                        const Icon = step.icon;
                        const done = i <= currentStep;
                        const active = i === currentStep;
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-standard z-10 ${
                              done
                                ? "bg-primary-700 border-primary-700"
                                : "bg-surface-0 border-rule/50"
                            } ${active ? "ring-4 ring-primary-200" : ""}`}>
                              <Icon size={16} className={done ? "text-white" : "text-ink-300"} />
                            </div>
                            <span className={`text-[10px] font-semibold text-center leading-tight max-w-[60px] ${done ? "text-ink-700" : "text-ink-300"}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-ink-600">
                      <Clock size={15} className="text-primary-500 shrink-0" />
                      <span><span className="font-medium text-ink-800">Last update:</span> {result.lastUpdate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-ink-600">
                      <MapPin size={15} className="text-primary-500 shrink-0" />
                      <span><span className="font-medium text-ink-800">Location:</span> {result.location}</span>
                    </div>
                    {result.status !== "delivered" && (
                      <div className="flex items-center gap-3 text-ink-600">
                        <Truck size={15} className="text-primary-500 shrink-0" />
                        <span><span className="font-medium text-ink-800">Estimated delivery:</span> {result.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
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
