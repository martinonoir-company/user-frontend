"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";

export default function AgentForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.agentForgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      // The endpoint answers 200 whether or not the agent exists, so a failure
      // here is a genuine transport/server problem — surface it rather than
      // pretending the mail went out.
      setError(
        extractApiMessage(err) ??
          "Could not send the reset link. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block font-display text-xl font-semibold tracking-tight text-ink-900"
          >
            MARTINO<span className="text-accent-gold font-bold">NOIR</span>
          </Link>
          <p className="text-xs tracking-[0.2em] uppercase text-accent-gold mt-3 font-semibold">
            Agent Portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-ink-100 p-8">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-ink-900 mb-3">
                Check your inbox
              </h1>
              <p className="text-sm text-ink-500 mb-2">
                If an agent account exists for{" "}
                <span className="font-semibold text-ink-700">{email}</span>,
                we&apos;ve sent a password reset link.
              </p>
              <p className="text-xs text-ink-400 mb-8">
                The link expires in 30 minutes. Check your spam folder if you
                don&apos;t see it.
              </p>
              <Link
                href="/agent/login"
                className="inline-flex items-center gap-2 text-sm text-primary-700 font-semibold hover:text-primary-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to agent sign in
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/agent/login"
                className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700 transition-colors mb-6"
              >
                <ArrowLeft size={15} />
                Back to agent sign in
              </Link>

              <h1 className="text-2xl font-display font-bold text-ink-900 mb-1">
                Reset your password
              </h1>
              <p className="text-sm text-ink-500 mb-6">
                Enter the email address on your agent account and we&apos;ll
                send you a reset link.
              </p>

              {error && (
                <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="agent-forgot-email"
                    className="block text-xs font-semibold text-ink-700 mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                    <input
                      id="agent-forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send reset link <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * The storefront request() helper throws a plain ApiError object rather than
 * an Error, so `instanceof Error` misses it; the server message can also be a
 * validation array. Mirrors the helper on the agent login page.
 */
function extractApiMessage(err: unknown): string | null {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    const m = (err as { message?: unknown }).message;
    if (Array.isArray(m)) return m.filter(Boolean).join(", ") || null;
    if (typeof m === "string") return m || null;
  }
  return null;
}
