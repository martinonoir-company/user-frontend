"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, MailOpen, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }

    api.verifyEmail(token)
      .then(() => setStatus("success"))
      .catch((err: unknown) => {
        const msg = (err as { message?: string | string[] })?.message;
        setErrorMsg(
          Array.isArray(msg)
            ? msg[0]
            : msg || "The verification link is invalid or has expired."
        );
        setStatus("error");
      });
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendLoading(true);
    try {
      await api.resendVerification(resendEmail);
      setResendSent(true);
    } catch {
      // Silent — don't reveal if email exists
      setResendSent(true);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <Link href="/" className="relative z-10">
          <span className="text-2xl font-display font-bold text-white tracking-tight">
            MARTINO<span className="text-primary-500">NOIR</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Verifying your email.
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            One click and your account is confirmed.
          </p>
        </div>

        <p className="relative z-10 text-white/20 text-xs">
          © {new Date().getFullYear()} Martinonoir. All rights reserved.
        </p>
      </div>

      {/* Right: Status */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface-0">
        <div className="w-full max-w-md text-center">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-left">
            <Link href="/">
              <span className="text-xl font-display font-bold text-ink-900 tracking-tight">
                MARTINO<span className="text-primary-700">NOIR</span>
              </span>
            </Link>
          </div>

          {status === "loading" && (
            <>
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 size={32} className="text-primary-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-display font-bold text-ink-900 mb-3">
                Verifying your email...
              </h2>
              <p className="text-ink-500">Please wait while we confirm your email address.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-ink-900 mb-3">
                Email verified!
              </h2>
              <p className="text-ink-500 mb-8">
                Your email address has been confirmed. Your account is now fully active.
              </p>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Go to My Account <ArrowRight size={16} />
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-ink-900 mb-3">
                Verification failed
              </h2>
              <p className="text-ink-500 mb-8">{errorMsg}</p>

              {!resendSent ? (
                <form onSubmit={handleResend} className="text-left space-y-4 border border-ink-100 rounded-xl p-6">
                  <p className="text-sm font-semibold text-ink-700">Get a new verification link</p>
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={resendLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-all disabled:opacity-50"
                  >
                    {resendLoading ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    ) : "Resend Verification Email"}
                  </button>
                </form>
              ) : (
                <div className="text-center border border-green-100 bg-green-50 rounded-xl p-6">
                  <CheckCircle2 size={24} className="text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-700 font-medium">
                    If that email is registered, a new verification link is on its way.
                  </p>
                </div>
              )}
            </>
          )}

          {status === "no-token" && (
            <>
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MailOpen size={32} className="text-amber-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-ink-900 mb-3">
                No verification token
              </h2>
              <p className="text-ink-500 mb-8">
                This page requires a verification link from your email. Check your inbox for the verification email we sent when you registered.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary-700 font-semibold hover:text-primary-800 transition-colors"
              >
                Go back home
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface-0">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
