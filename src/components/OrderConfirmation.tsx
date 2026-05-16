"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  ShoppingBag,
  Mail,
  Loader2,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";

type PayState = "verifying" | "paid" | "failed" | "pending" | "none";

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  // Paystack appends `reference` (and `trxref`) to the callback URL.
  const reference =
    searchParams.get("reference") ?? searchParams.get("trxref");

  const [payState, setPayState] = useState<PayState>(
    reference ? "verifying" : "none",
  );
  const [failureReason, setFailureReason] = useState<string | null>(null);
  // Number of reconcile attempts — used to keep polling a still-pending payment.
  const [attempt, setAttempt] = useState(0);

  const reconcile = useCallback(async () => {
    if (!reference) return;
    try {
      const res = await api.reconcilePayment(reference);
      const status = res.data.status;
      if (status === "SUCCEEDED") {
        setPayState("paid");
      } else if (status === "FAILED" || status === "CANCELLED") {
        setPayState("failed");
        setFailureReason(res.data.failureReason ?? null);
      } else {
        // PENDING / PROCESSING — webhook may not have landed yet; poll.
        setPayState("pending");
      }
    } catch {
      setPayState("pending");
    }
  }, [reference]);

  useEffect(() => {
    reconcile();
  }, [reconcile, attempt]);

  // While the payment is still pending, re-check a few times — the
  // Paystack webhook usually settles it within seconds.
  useEffect(() => {
    if (payState !== "pending" || attempt >= 5) return;
    const t = setTimeout(() => setAttempt((a) => a + 1), 3000);
    return () => clearTimeout(t);
  }, [payState, attempt]);

  // ── Payment failed ──
  if (payState === "failed") {
    return (
      <div className="content-grid py-16 md:py-24 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-8">
          <XCircle size={48} className="text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-3">
          Payment Not Completed
        </h1>
        <p className="text-ink-500 text-lg mb-2">
          {failureReason ||
            "Your payment could not be confirmed. You have not been charged."}
        </p>
        {orderNumber && (
          <p className="text-sm text-ink-400 mb-8">
            Order <span className="font-mono font-semibold">{orderNumber}</span>{" "}
            is held — you can retry payment from your account.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink-200 rounded-lg text-sm font-semibold text-ink-700 hover:bg-surface-1 transition-colors"
          >
            <Package size={16} />
            View My Orders
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-lg text-sm font-semibold hover:bg-ink-800 transition-all"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  // ── Verifying / still pending ──
  if (payState === "verifying" || payState === "pending") {
    return (
      <div className="content-grid py-20 md:py-28 text-center max-w-xl mx-auto">
        <div className="w-20 h-20 mx-auto bg-surface-1 rounded-full flex items-center justify-center mb-6">
          {payState === "verifying" ? (
            <Loader2 size={36} className="text-primary-600 animate-spin" />
          ) : (
            <Clock size={36} className="text-amber-500" />
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-2">
          {payState === "verifying"
            ? "Confirming your payment…"
            : "Almost there…"}
        </h1>
        <p className="text-ink-500">
          {payState === "verifying"
            ? "Please wait while we confirm your payment with the bank."
            : "Your payment is still being confirmed. This page will update automatically."}
        </p>
        {payState === "pending" && attempt >= 5 && (
          <button
            onClick={() => setAttempt((a) => a + 1)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium transition-colors"
          >
            <RefreshCw size={14} />
            Check again
          </button>
        )}
        {orderNumber && (
          <p className="mt-6 text-xs text-ink-400">
            Order{" "}
            <span className="font-mono font-semibold">{orderNumber}</span>
          </p>
        )}
      </div>
    );
  }

  // ── Confirmed (paid) or a plain confirmation with no payment reference ──
  return (
    <div className="content-grid py-16 md:py-24 text-center max-w-2xl mx-auto">
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-100 rounded-full animate-ping opacity-20" />
      </div>

      <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-3">
        {payState === "paid" ? "Payment Confirmed!" : "Order Confirmed!"}
      </h1>
      <p className="text-ink-500 text-lg mb-2">
        Thank you for shopping with Martinonoir
      </p>

      {orderNumber && (
        <div className="inline-flex items-center gap-2 bg-surface-1 border border-ink-100 rounded-lg px-6 py-3 mt-4 mb-8">
          <Package size={18} className="text-primary-600" />
          <span className="text-sm text-ink-500">Order Number:</span>
          <span className="text-sm font-bold text-ink-900 font-mono">
            {orderNumber}
          </span>
        </div>
      )}

      <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8 text-left mb-8">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">
          What happens next?
        </h3>
        <div className="space-y-4">
          {[
            {
              icon: <Mail size={18} className="text-primary-600" />,
              title: "Order Confirmation Email",
              desc: "You'll receive an email with your order details shortly.",
            },
            {
              icon: <Package size={18} className="text-primary-600" />,
              title: "Order Processing",
              desc: "Our team will prepare your items for shipment within 1-2 business days.",
            },
            {
              icon: <ShoppingBag size={18} className="text-primary-600" />,
              title: "Shipping & Delivery",
              desc: "You'll get a tracking number once your order ships. Delivery takes 2-5 business days.",
            },
          ].map((step) => (
            <div key={step.title} className="flex gap-3">
              <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {step.title}
                </p>
                <p className="text-xs text-ink-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {orderNumber && (
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink-200 rounded-lg text-sm font-semibold text-ink-700 hover:bg-surface-1 transition-colors"
          >
            <Package size={16} />
            View My Orders
          </Link>
        )}
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-lg text-sm font-semibold hover:bg-ink-800 hover:shadow-lg transition-all"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
