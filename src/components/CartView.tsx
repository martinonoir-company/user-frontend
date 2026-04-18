"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/price";
import { useState } from "react";
import { api, QuoteResult } from "@/lib/api";

export default function CartView() {
  const { items, itemCount, updateQuantity, removeItem, clearCart, getSubtotal } = useCart();
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const currency: string = "NGN"; // TODO: derive from auth context

  const fetchQuote = async (coupon?: string) => {
    if (items.length === 0) return;
    setLoadingQuote(true);
    try {
      const quoteItems = items.map((item) => ({
        variantId: item.variantId,
        sku: item.sku,
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        unitPrice: currency === "USD" ? item.priceUsd : item.priceNgn,
      }));

      const res = await api.getQuote(quoteItems, {
        currency,
        country: "NG",
        state: "Lagos",
        couponCode: coupon || undefined,
      });
      setQuote(res.data);
    } catch {
      // Quote failed — show subtotal only
    }
    setLoadingQuote(false);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      fetchQuote(couponCode.trim());
    }
  };

  // Fetch quote when items change
  // Using subtotal as display fallback
  const subtotal = getSubtotal(currency);

  if (items.length === 0) {
    return (
      <div className="content-grid py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-ink-200 mb-6" />
        <h1 className="text-2xl font-display font-bold text-ink-900 mb-2">
          Your Bag is Empty
        </h1>
        <p className="text-ink-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-medium text-sm rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="content-grid py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-8">
        Shopping Bag
        <span className="text-base font-normal text-ink-400 ml-2">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-0">
          {items.map((item, i) => (
            <div
              key={item.variantId}
              className={`flex gap-4 py-6 ${
                i > 0 ? "border-t border-ink-100" : ""
              }`}
            >
              {/* Image */}
              <Link href={`/product/${item.productSlug}`} className="flex-shrink-0">
                <div className="relative w-24 h-28 md:w-28 md:h-32 rounded-lg overflow-hidden bg-surface-2">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-ink-300">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.productSlug}`}>
                  <h3 className="text-sm md:text-base font-semibold text-ink-900 hover:text-primary-700 transition-colors truncate">
                    {item.productName}
                  </h3>
                </Link>
                <p className="text-xs text-ink-500 mt-0.5">{item.variantName}</p>
                <p className="text-xs text-ink-400 mt-0.5">SKU: {item.sku}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="inline-flex items-center border border-ink-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-600 hover:bg-surface-1 transition-colors rounded-l-lg"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-ink-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-600 hover:bg-surface-1 transition-colors rounded-r-lg"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-ink-900">
                      {formatPrice(
                        (currency === "USD" ? item.priceUsd : item.priceNgn) * item.quantity,
                        currency,
                      )}
                    </p>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="w-8 h-8 flex items-center justify-center text-ink-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear cart */}
          <div className="pt-4 border-t border-ink-100">
            <button
              onClick={clearCart}
              className="text-sm text-ink-400 hover:text-red-500 transition-colors"
            >
              Clear entire bag
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-1 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-ink-900 mb-4">
              Order Summary
            </h2>

            {/* Coupon */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-ink-200 rounded-lg text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                id="coupon-input"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-ink-900 text-white text-sm font-medium rounded-lg hover:bg-ink-800 transition-colors"
              >
                Apply
              </button>
            </form>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-medium text-ink-900">
                  {formatPrice(quote?.subtotal ?? subtotal, currency)}
                </span>
              </div>

              {quote?.coupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({quote.coupon.code})</span>
                  <span>-{formatPrice(quote.coupon.discountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-ink-500">Shipping</span>
                <span className="font-medium text-ink-900">
                  {quote?.shippingMethod
                    ? quote.shippingTotal === 0
                      ? "Free"
                      : formatPrice(quote.shippingTotal, currency)
                    : "Calculated at checkout"}
                </span>
              </div>

              <div className="pt-3 border-t border-ink-200 flex justify-between">
                <span className="font-semibold text-ink-900">Total</span>
                <span className="text-xl font-bold text-ink-900">
                  {formatPrice(quote?.grandTotal ?? subtotal, currency)}
                </span>
              </div>

              {quote?.savings ? (
                <p className="text-xs text-green-600 font-medium text-right">
                  You save {formatPrice(quote.savings, currency)}
                </p>
              ) : null}
            </div>

            <button
              onClick={() => fetchQuote(couponCode || undefined)}
              className="w-full mt-4 py-2 text-sm text-primary-700 font-medium border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
            >
              {loadingQuote ? "Calculating..." : "Update Quote"}
            </button>

            <Link
              href="/checkout"
              id="checkout-btn"
              className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/shop"
              className="block mt-3 text-center text-sm text-ink-500 hover:text-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
