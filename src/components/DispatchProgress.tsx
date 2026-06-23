"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Truck, Package, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

/**
 * Post-payment dispatch progress card.
 *
 * After a customer pays, the server fires AAJ create-booking →
 * process-booking in the background. This card polls
 * GET /orders/:id/shipping every ~3 seconds and animates a progress
 * bar as those steps complete:
 *
 *   0%   — payment confirmed, booking not yet created
 *   66%  — booking created (AAJ has the shipment queued)
 *   100% — booking processed; tracking id issued
 *
 * When the order opted out of shipping, the card renders a simple
 * "self-pickup" state instead. When AAJ fails repeatedly, it shows a
 * friendly "we'll retry" message — the customer's payment is safe and
 * the server's retry worker keeps trying.
 *
 * The order id is resolved from the order number once on mount.
 */
export default function DispatchProgress({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [optedOut, setOptedOut] = useState(false);
  const [retryStalled, setRetryStalled] = useState(false);
  const [resolveFailed, setResolveFailed] = useState(false);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resolve order id from number.
  useEffect(() => {
    let cancelled = false;
    api
      .getOrderByNumber(orderNumber)
      .then((res) => {
        if (!cancelled) setOrderId(res.data.id);
      })
      .catch(() => {
        if (!cancelled) setResolveFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  const poll = useCallback(async () => {
    if (!orderId) return;
    try {
      const res = await api.getShippingState(orderId);
      const d = res.data;
      setOptedOut(d.optedOut);
      setProgress(d.progress);
      setTrackingId(d.trackingId);
      // Stop polling once we're done (tracking issued or opted out).
      if (d.trackingId || d.optedOut) return;
      // If AAJ has failed a few times, surface the "we'll retry" note
      // but keep polling at a slower cadence.
      if (d.retryCount >= 3 && !d.trackingId) setRetryStalled(true);
      pollRef.current = setTimeout(
        poll,
        d.retryCount >= 3 ? 8000 : 3000,
      );
    } catch {
      // Transient — try again shortly.
      pollRef.current = setTimeout(poll, 5000);
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    void poll();
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [orderId, poll]);

  if (resolveFailed) return null;

  // ── Opted out of shipping ──
  if (optedOut) {
    return (
      <div className="bg-surface-1 border border-ink-100 rounded-xl p-5 text-left mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-ink-100 flex items-center justify-center shrink-0">
            <Package size={18} className="text-ink-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink-900">
              Self-pickup selected
            </h3>
            <p className="text-xs text-ink-500 mt-0.5">
              No delivery was booked. Please arrange to collect your order.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const done = progress >= 100 && !!trackingId;

  return (
    <div className="bg-surface-1 border border-ink-100 rounded-xl p-5 text-left mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            done ? "bg-green-100" : "bg-primary-50"
          }`}
        >
          {done ? (
            <CheckCircle2 size={18} className="text-green-600" />
          ) : (
            <Truck size={18} className="text-primary-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-ink-900">
            {done ? "Shipment booked" : "Booking your shipment…"}
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">
            {done
              ? "AAJ Express has your parcel. Tracking is ready."
              : retryStalled
                ? "Taking a little longer than usual — we'll keep trying. Your payment is safe."
                : "We're arranging delivery with AAJ Express."}
          </p>
        </div>
        {!done && !retryStalled && (
          <Loader2 size={16} className="text-primary-500 animate-spin shrink-0" />
        )}
        {retryStalled && !done && (
          <AlertCircle size={16} className="text-amber-500 shrink-0" />
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            done ? "bg-green-500" : "bg-primary-600"
          }`}
          style={{ width: `${Math.max(8, progress)}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between text-[10px] text-ink-400 mt-1.5">
        <span className={progress >= 0 ? "text-ink-600 font-medium" : ""}>
          Paid
        </span>
        <span className={progress >= 66 ? "text-ink-600 font-medium" : ""}>
          Booked
        </span>
        <span className={done ? "text-green-600 font-medium" : ""}>
          Tracking ready
        </span>
      </div>

      {done && trackingId && (
        <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between">
          <span className="text-xs text-ink-500">Tracking number</span>
          <span className="text-xs font-mono font-semibold text-ink-900">
            {trackingId}
          </span>
        </div>
      )}
    </div>
  );
}
