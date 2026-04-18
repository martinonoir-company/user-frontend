"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Mail } from "lucide-react";

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="content-grid py-16 md:py-24 text-center max-w-2xl mx-auto">
      {/* Success animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-100 rounded-full animate-ping opacity-20" />
      </div>

      <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-3">
        Order Confirmed!
      </h1>
      <p className="text-ink-500 text-lg mb-2">
        Thank you for shopping with Martinonoir
      </p>

      {orderNumber && (
        <div className="inline-flex items-center gap-2 bg-surface-1 border border-ink-100 rounded-lg px-6 py-3 mt-4 mb-8">
          <Package size={18} className="text-primary-600" />
          <span className="text-sm text-ink-500">Order Number:</span>
          <span className="text-sm font-bold text-ink-900 font-mono">{orderNumber}</span>
        </div>
      )}

      <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8 text-left mb-8">
        <h3 className="text-sm font-semibold text-ink-900 mb-4">What happens next?</h3>
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
                <p className="text-sm font-semibold text-ink-900">{step.title}</p>
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
