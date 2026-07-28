"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, CreditCard, ShoppingBag, ArrowRight, ArrowLeft,
  Shield, Truck, AlertCircle, CheckCircle2, Lock, Loader2,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { api, QuoteResult } from "@/lib/api";
import { COUNTRIES, countryName } from "@/lib/countries";
import { formatPrice } from "@/lib/price";
import LoginModal from "@/components/LoginModal";

type Step = "shipping" | "review";

const NG_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export default function CheckoutView() {
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCart();
  const { isAuthenticated, currency } = useAuth();

  const [step, setStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // True when the failure was an auth error (e.g. guest checkout blocked),
  // so we can offer a login link alongside the message.
  const [authError, setAuthError] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  // Shipping form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Anambra");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("NG");
  const [phone, setPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  // Shipping opt-out: when ticked, no AAJ shipping is booked and the
  // shipping fee is removed from the total. The customer arranges
  // pickup themselves.
  const [shippingOptOut, setShippingOptOut] = useState(false);
  // Marketing-agent referral code, optional. We validate against the
  // server before submitting so a typo doesn't sit silently on the order.
  const [agentCode, setAgentCode] = useState("");
  const [agentVerified, setAgentVerified] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const [agentVerifying, setAgentVerifying] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);

  async function verifyAgentCode() {
    const code = agentCode.trim().toUpperCase();
    if (!code) return;
    setAgentVerifying(true);
    setAgentError(null);
    try {
      const res = await api.validateAgentCode(code);
      if (res.ok) {
        setAgentVerified({ code, name: res.agentName });
      } else {
        setAgentError(res.error);
        setAgentVerified(null);
      }
    } catch (e) {
      setAgentError(
        e instanceof Error ? e.message : "Could not verify code",
      );
      setAgentVerified(null);
    } finally {
      setAgentVerifying(false);
    }
  }

  // Switching country resets the state field: Nigerian orders pick from
  // NG_STATES, international ones type a free-form state/province.
  function handleCountryChange(next: string) {
    setCountry(next);
    if (next === "NG") {
      setState("Anambra");
    } else if (country === "NG") {
      setState("");
    }
  }

  const cur = currency ?? "NGN";
  const subtotal = getSubtotal(cur);

  // Empty cart redirect
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  // Fetch quote when moving to review
  const handleProceedToReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Phone is compulsory for a shipped order — the courier (AAJ) requires a
    // reachable contact number for dispatch. Guard here too in case the
    // browser's native `required` is bypassed.
    if (!shippingOptOut && !phone.trim()) {
      setError("A phone number is required for delivery.");
      return;
    }

    setLoading(true);

    try {
      const quoteItems = items.map((item) => ({
        variantId: item.variantId,
        sku: item.sku,
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        unitPrice: cur === "USD" ? item.priceUsd : item.priceNgn,
        weightKg: 0.5,
      }));

      const res = await api.getQuote(quoteItems, {
        currency: cur,
        country,
        state,
        channel: "STOREFRONT",
      });

      setQuote(res.data);
      setStep("review");
    } catch {
      setError("Failed to calculate order total. Please try again.");
    }
    setLoading(false);
  };

  // Place order, then initiate payment and hand off to the Paystack
  // hosted checkout. All provider communication is server-side; here we
  // only follow the checkout URL the server returns.
  const handlePlaceOrder = async () => {
    setError(null);
    setAuthError(false);
    setPlacing(true);

    try {
      const res = await api.checkout({
        items: items.map((i) => ({
          variantId: i.variantId,
          quantity: i.quantity,
          wholesale: i.isWholesale,
        })),
        shippingAddress: {
          firstName,
          lastName,
          line1,
          line2: line2 || undefined,
          city,
          state,
          postalCode: postalCode || undefined,
          country,
          phone: phone || undefined,
        },
        currency: cur,
        guestEmail: !isAuthenticated ? guestEmail : undefined,
        customerNote: customerNote || undefined,
        agentCode: agentVerified?.code,
        shippingOptOut,
        idempotencyKey: `checkout_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      });

      const order = res.data;

      // Begin payment. The server returns the Paystack hosted-checkout URL.
      const pay = await api.initiatePayment({
        orderId: order.id,
        channel: "STOREFRONT",
        customerEmail: isAuthenticated ? undefined : guestEmail,
        customerName: `${firstName} ${lastName}`.trim(),
        callbackUrl: `${window.location.origin}/order-confirmation?order=${order.orderNumber}`,
      });

      if (!pay.data.checkoutUrl) {
        throw new Error("Could not start payment. Please try again.");
      }

      // Cart is cleared only once we have a valid order + payment session.
      clearCart();
      // Hand off to the Paystack hosted page. On completion Paystack
      // redirects the customer back to the callback URL above.
      window.location.href = pay.data.checkoutUrl;
    } catch (err: unknown) {
      const e = err as { message?: string | string[]; status?: number };
      const msg = Array.isArray(e?.message) ? e.message[0] : e?.message;
      // A 401, or an "Unauthorized" message, means the session isn't valid —
      // surface a login link instead of a dead-end error.
      const isAuth =
        e?.status === 401 || /unauthorized/i.test(String(msg ?? ""));
      setAuthError(isAuth);
      setError(msg || "Failed to place order");
      setPlacing(false);
    }
  };

  if (items.length === 0) return null;

  const inputCls = "w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all";

  return (
    <div className="content-grid py-8 md:py-12">
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          // Auth refreshed in place — clear the auth error and resume the
          // checkout the customer was on. Cart and form state are intact.
          setAuthError(false);
          setError(null);
          void handlePlaceOrder();
        }}
      />
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900">Checkout</h1>
        {/* Steps indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[
            { id: "shipping" as Step, label: "Shipping", icon: <MapPin size={14} /> },
            { id: "review" as Step, label: "Review & Pay", icon: <CreditCard size={14} /> },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-ink-200" />}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                step === s.id
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : s.id === "shipping" && step === "review"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-surface-1 text-ink-400 border border-ink-100"
              }`}>
                {s.id === "shipping" && step === "review" ? <CheckCircle2 size={14} /> : s.icon}
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium mb-6">
          <AlertCircle size={16} className="shrink-0" />
          <span>
            {error}
            {authError && (
              <>
                {". "}Please{" "}
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="underline font-semibold hover:text-red-800"
                >
                  click login
                </button>{" "}
                to continue.
              </>
            )}
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Main content */}
        <div>
          {/* Step 1: Shipping */}
          {step === "shipping" && (
            <form onSubmit={handleProceedToReview}>
              <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8">
                <h2 className="text-lg font-semibold text-ink-900 mb-6 flex items-center gap-2">
                  <MapPin size={18} className="text-primary-600" />
                  Shipping Address
                </h2>

                {!isAuthenticated && (
                  <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="text-sm text-primary-800">
                      <Link href="/login" className="font-semibold underline">Sign in</Link> for faster
                      checkout, or continue as guest below.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {!isAuthenticated && (
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">Email *</label>
                      <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required placeholder="your@email.com" className={inputCls} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">First Name *</label>
                      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">Last Name *</label>
                      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                      Address Line 1 {shippingOptOut ? "" : "*"}
                    </label>
                    <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} required={!shippingOptOut} placeholder="123 Victoria Island" className={inputCls} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Address Line 2</label>
                    <input type="text" value={line2} onChange={(e) => setLine2(e.target.value)} placeholder="Apartment, suite (optional)" className={inputCls} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Country *</label>
                    <select value={country} onChange={(e) => handleCountryChange(e.target.value)} className={inputCls + " appearance-none"}>
                      {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                    {country !== "NG" && (
                      <p className="text-xs text-ink-400 mt-1">
                        International order — shipping rates for {countryName(country)} are calculated at the next step.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                        City {shippingOptOut ? "" : "*"}
                      </label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required={!shippingOptOut} placeholder={country === "NG" ? "Lagos" : "City"} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                        {country === "NG" ? "State *" : "State / Province *"}
                      </label>
                      {country === "NG" ? (
                        <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls + " appearance-none"}>
                          {NG_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required placeholder="State / Province" className={inputCls} />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                        Postal Code {shippingOptOut ? "" : "*"}
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required={!shippingOptOut}
                        placeholder="100001"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Shipping opt-out */}
                  <label className="flex items-start gap-2.5 cursor-pointer rounded-lg border border-ink-200 bg-surface-1 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={shippingOptOut}
                      onChange={(e) => setShippingOptOut(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-primary-700"
                    />
                    <span className="text-sm text-ink-700">
                      I don&apos;t need shipping — I&apos;ll arrange pickup myself.
                      <span className="block text-xs text-ink-400 mt-0.5">
                        No shipping fee will be charged and no delivery will be booked.
                      </span>
                    </span>
                  </label>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                      Phone {shippingOptOut ? "" : "*"}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={!shippingOptOut}
                      placeholder="+234 800 000 0000"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Order Note</label>
                    <textarea value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} placeholder="Special instructions (optional)" rows={2} className={inputCls + " resize-none"} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                      Agent Code <span className="text-ink-400 font-normal">(optional)</span>
                    </label>
                    {agentVerified ? (
                      <div className="flex items-center justify-between px-3 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="text-sm">
                          <span className="font-mono font-semibold text-emerald-700">
                            ✓ {agentVerified.code}
                          </span>
                          <span className="text-ink-500 ml-2">
                            {agentVerified.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAgentVerified(null);
                            setAgentCode("");
                            setAgentError(null);
                          }}
                          className="text-xs text-ink-500 hover:text-red-600 underline"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={agentCode}
                          onChange={(e) =>
                            setAgentCode(e.target.value.toUpperCase())
                          }
                          placeholder="e.g. ABC-XY12"
                          maxLength={16}
                          className={inputCls + " font-mono uppercase"}
                        />
                        <button
                          type="button"
                          onClick={verifyAgentCode}
                          disabled={!agentCode.trim() || agentVerifying}
                          className="px-4 py-2.5 bg-ink-100 hover:bg-ink-200 text-ink-700 text-xs font-medium rounded-lg disabled:opacity-50"
                        >
                          {agentVerifying ? "…" : "Verify"}
                        </button>
                      </div>
                    )}
                    {agentError && !agentVerified && (
                      <p className="text-xs text-red-600 mt-1.5">
                        ⚠ {agentError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link href="/cart" className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-700 transition-colors">
                  <ArrowLeft size={16} />
                  Back to Cart
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-ink-900 text-white font-semibold text-sm rounded-lg hover:bg-ink-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Calculating...</> : <>Continue to Review <ArrowRight size={16} /></>}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Review & Pay */}
          {step === "review" && quote && (
            <div>
              <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-primary-600" />
                  Order Items
                </h2>
                <div className="divide-y divide-ink-100">
                  {quote.lines.map((line) => (
                    <div key={line.variantId} className="flex items-center gap-4 py-4">
                      <div className="w-16 h-16 bg-surface-2 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag size={20} className="text-ink-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink-900 truncate">{line.productName}</p>
                        {line.variantName && <p className="text-xs text-ink-500">{line.variantName}</p>}
                        <p className="text-xs text-ink-400">Qty: {line.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-ink-900">
                        {formatPrice(String(line.lineTotal), cur)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-primary-600" />
                  Shipping To
                </h2>
                <div className="text-sm text-ink-700 space-y-1">
                  <p className="font-medium">{firstName} {lastName}</p>
                  <p>{line1}{line2 ? `, ${line2}` : ""}</p>
                  <p>{city}, {state}, {countryName(country)}</p>
                  {phone && <p>{phone}</p>}
                </div>
                <button onClick={() => setStep("shipping")} className="mt-3 text-xs text-primary-600 font-semibold hover:text-primary-700">
                  Edit Address
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button onClick={() => setStep("shipping")} className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-700 transition-colors">
                  <ArrowLeft size={16} />
                  Back to Shipping
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="flex items-center gap-2 px-8 py-3.5 bg-green-700 text-white font-semibold text-sm rounded-lg hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  {placing ? <><Loader2 size={16} className="animate-spin" /> Placing order...</> : <><Lock size={16} /> Place Order</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:sticky lg:top-32 self-start">
          <div className="bg-surface-0 border border-ink-100 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-ink-900 mb-4 flex items-center gap-2">
              Order Summary
              {items.some((i) => i.isWholesale) && (
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  Wholesale
                </span>
              )}
            </h3>
            <div className="space-y-2 text-sm">
              {(() => {
                const hasWholesale = items.some((i) => i.isWholesale);
                // Effective subtotal (what's actually charged — wholesale price
                // for wholesale lines). Prefer the server quote when present.
                const effectiveSubtotal = quote?.subtotal ?? subtotal;
                // Retail subtotal: every line at its retail price. Prefer the
                // explicit retail snapshot; fall back to the live retail price
                // (currentPrice*, which the server sets to retail), then the
                // effective price as a last resort.
                const retailSubtotal = items.reduce((s, i) => {
                  const retail =
                    (cur === "USD" ? i.retailPriceUsd : i.retailPriceNgn) ??
                    (cur === "USD" ? i.currentPriceUsd : i.currentPriceNgn) ??
                    (cur === "USD" ? i.priceUsd : i.priceNgn);
                  return s + retail * i.quantity;
                }, 0);
                const itemCount = items.reduce((s, i) => s + i.quantity, 0);
                // Only show the strike-through when wholesale actually saves
                // money vs retail (avoids a confusing equal/struck line).
                const showWholesale =
                  hasWholesale && retailSubtotal > effectiveSubtotal;
                return showWholesale ? (
                  <>
                    <div className="flex justify-between text-ink-400">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="line-through">
                        {formatPrice(String(retailSubtotal), cur)}
                      </span>
                    </div>
                    <div className="flex justify-between text-ink-900 font-medium">
                      <span className="flex items-center gap-1.5">
                        Wholesale subtotal
                        <span className="inline-flex items-center rounded bg-amber-100 text-amber-800 px-1.5 py-0.5 text-[10px] font-bold uppercase">
                          Wholesale
                        </span>
                      </span>
                      <span>{formatPrice(String(effectiveSubtotal), cur)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-ink-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(String(effectiveSubtotal), cur)}</span>
                  </div>
                );
              })()}
              {quote && (
                <>
                  {quote.discountTotal > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(String(quote.discountTotal), cur)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-ink-600">
                    <span>Shipping</span>
                    <span>
                      {shippingOptOut
                        ? "Not required"
                        : quote.shippingTotal === 0
                          ? "Calculated at payment"
                          : formatPrice(String(quote.shippingTotal), cur)}
                    </span>
                  </div>
                  {!shippingOptOut && quote.shippingTotal > 0 && (
                    <p className="text-[11px] text-ink-400 -mt-1">
                      Shipping is an estimate from AAJ Express; the final
                      price may vary slightly.
                    </p>
                  )}
                  <div className="flex justify-between text-ink-600">
                    <span>Tax</span>
                    <span>{formatPrice(String(quote.taxTotal), cur)}</span>
                  </div>
                </>
              )}
              <hr className="border-ink-100 my-2" />
              <div className="flex justify-between text-base font-bold text-ink-900">
                <span>Total</span>
                <span>
                  {formatPrice(
                    String(
                      shippingOptOut && quote
                        ? quote.grandTotal - quote.shippingTotal
                        : (quote?.grandTotal ?? subtotal),
                    ),
                    cur,
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {[
              { icon: <Shield size={14} />, text: "Secure checkout" },
              { icon: <Truck size={14} />, text: "Shipping available" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs text-ink-400">
                <span className="text-primary-500">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
