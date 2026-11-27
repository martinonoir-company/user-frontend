"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

/**
 * Order rating + review block.
 *
 * Renders a 5-star picker and an optional comment field so a customer can rate
 * a completed order. Shown ONLY for successfully-paid orders — the caller is
 * responsible for gating on paid status, and the server independently rejects
 * ratings on unpaid/cancelled orders.
 *
 * On mount it loads any rating the user already left for this order, so the
 * block doubles as an editor (one rating per order, upserted server-side).
 *
 * Self-contained: it's a single card dropped into an existing vertical layout,
 * so it never overlaps or obstructs other UI (dispatch progress, receipt, etc).
 */
export default function OrderRating({
  orderId,
  className = "",
}: {
  orderId: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getOrderRating(orderId)
      .then((res) => {
        if (cancelled || !res.data) return;
        setStars(res.data.stars);
        setComment(res.data.comment ?? "");
        setSaved(true);
      })
      .catch(() => {
        /* no existing rating / not reachable — fall through to the form */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  async function submit() {
    if (stars < 1 || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.submitOrderRating({
        orderId,
        stars,
        comment: comment.trim() || undefined,
      });
      setSaved(true);
    } catch {
      setError("Sorry, we couldn't save your rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  const active = hover || stars;

  return (
    <div
      className={`bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8 text-left ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">
            {saved ? "Your rating" : "How was your order?"}
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">
            {saved
              ? "Thanks for your feedback — you can update it any time."
              : "Tap a star to rate your experience. Your feedback helps us improve."}
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 shrink-0">
            <CheckCircle2 size={15} />
            Saved
          </span>
        )}
      </div>

      {/* Stars */}
      <div
        className="flex items-center gap-1.5 mt-4"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => {
              setStars(n);
              setSaved(false);
            }}
            className="p-1 -m-1 rounded transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
          >
            <Star
              size={30}
              className={
                n <= active
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-ink-300"
              }
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setSaved(false);
        }}
        maxLength={1000}
        rows={3}
        placeholder="Add a comment (optional)…"
        className="mt-4 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
      />

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={stars < 1 || submitting}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ink-900 text-white text-sm font-semibold hover:bg-ink-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting && <Loader2 size={15} className="animate-spin" />}
          {saved ? "Update rating" : "Submit rating"}
        </button>
      </div>
    </div>
  );
}
