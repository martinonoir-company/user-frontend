"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  AlertTriangle,
  ShieldX,
  CheckCircle2,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";
import { api } from "@/lib/api";

type Step = "email" | "password" | "done";

export default function AccountDeletionForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [checking, setChecking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Step 1 — verify a deletable account exists for this email, then reveal the
  // password field. We never say "no such account" in a way that aids
  // enumeration beyond this dedicated, rate-limited deletion endpoint.
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const value = email.trim();
    if (!value || !value.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setChecking(true);
    try {
      const res = await api.checkAccountDeletionEmail(value);
      if (res.data.exists) {
        setStep("password");
      } else {
        setError(
          "We couldn't find an account with that email. Please check and try again.",
        );
      }
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setChecking(false);
    }
  };

  // Step 2 — the password field is revealed; submitting opens the confirm modal.
  const handlePasswordContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setModalOpen(true);
  };

  // Step 3 — the real deletion. Authenticate (verifies the password exactly as
  // sign-in does), then delete the now-authenticated account. The token is used
  // transiently and cleared afterwards so this page never leaves a session
  // behind — and any token already in memory is restored on failure.
  const handleConfirmDelete = async () => {
    setError(null);
    setDeleting(true);
    const previousToken = api.getToken();
    let refreshToken: string | null = null;
    try {
      const auth = await api.login(email.trim(), password);
      refreshToken = auth.data.refreshToken;
      api.setToken(auth.data.accessToken);
      await api.deleteAccount();
      // Best-effort: revoke the refresh token we just created.
      if (refreshToken) await api.logout(refreshToken).catch(() => {});
      api.setToken(previousToken);
      setModalOpen(false);
      setStep("done");
    } catch (err: unknown) {
      api.setToken(previousToken);
      const msg = (err as { message?: string | string[] })?.message;
      const text = Array.isArray(msg) ? msg[0] : msg;
      setError(
        text && /password|credential|invalid|unauthor/i.test(text)
          ? "Incorrect password. Please try again."
          : text || "We couldn't complete the deletion. Please try again.",
      );
      setModalOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  // ── Success ──
  if (step === "done") {
    return (
      <div className="content-grid py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-3">
            Account Deleted
          </h1>
          <p className="text-ink-500 leading-relaxed mb-8">
            Your Martinonoir account and associated personal data have been
            permanently deleted. Your past orders are retained for legal and
            accounting records but are no longer linked to you. You can register
            again anytime with the same email.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm transition-all"
          >
            Return Home
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content-grid py-12 md:py-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-5">
            <ShieldX size={28} className="text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-2">
            Delete Your Account
          </h1>
          <p className="text-ink-500 leading-relaxed">
            Permanently remove your Martinonoir account and your personal data.
            Verify it&apos;s you to continue.
          </p>
        </div>

        {/* What gets deleted — set expectations up front */}
        <div className="rounded-xl border border-ink-100 bg-surface-1 p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-3">
            What happens when you delete
          </p>
          <ul className="space-y-2 text-sm text-ink-600">
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              Your profile, saved addresses, cart and wishlist are permanently
              removed.
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              Past orders are kept for legal/accounting records but are unlinked
              from you.
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              This action is{" "}
              <span className="font-semibold text-ink-800">irreversible</span>.
              You can sign up again later with the same email.
            </li>
          </ul>
        </div>

        {/* Card with the staged form */}
        <div className="rounded-2xl border border-ink-100 bg-surface-0 shadow-sm p-6 md:p-8">
          {error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium mb-6">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1 — Email */}
          <form onSubmit={handleCheckEmail} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (step === "password") {
                      // Editing the email invalidates the revealed password step.
                      setStep("email");
                      setPassword("");
                    }
                    setError(null);
                  }}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={checking}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {step === "email" && (
              <button
                type="submit"
                disabled={checking}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {checking ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Checking…
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            )}
          </form>

          {/* Step 2 — Password (revealed only after a real account is found) */}
          {step === "password" && (
            <form onSubmit={handlePasswordContinue} className="space-y-5 mt-5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                <CheckCircle2 size={14} />
                Account found. Enter your password to continue.
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    required
                    autoFocus
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <AlertTriangle size={16} />
                Delete My Account
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          Changed your mind?{" "}
          <Link
            href="/account"
            className="text-primary-700 font-semibold hover:text-primary-800"
          >
            Back to my account
          </Link>
        </p>
      </div>

      {/* Confirmation modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => (deleting ? null : setModalOpen(false))}
          />
          <div className="relative w-full max-w-md bg-surface-0 rounded-2xl shadow-2xl p-6 md:p-8">
            {!deleting && (
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-ink-400 hover:text-ink-600"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-5">
              <AlertTriangle size={28} className="text-red-600" />
            </div>
            <h2 className="text-xl font-display font-bold text-ink-900 text-center mb-2">
              Delete account permanently?
            </h2>
            <p className="text-sm text-ink-500 text-center leading-relaxed mb-6">
              This will permanently delete the account for{" "}
              <span className="font-semibold text-ink-800">{email.trim()}</span>{" "}
              and all associated personal data. This action{" "}
              <span className="font-semibold text-red-600">
                cannot be undone
              </span>
              .
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting…
                  </>
                ) : (
                  "Yes, delete my account"
                )}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                disabled={deleting}
                className="w-full py-3 rounded-lg border border-ink-200 text-ink-700 font-semibold text-sm hover:bg-surface-1 transition-all disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
