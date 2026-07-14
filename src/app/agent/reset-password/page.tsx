"use client";

import { useState, useEffect, Suspense, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";

/**
 * Mirrors the server's ResetPasswordDto rule exactly (min 8 + lower + upper +
 * digit + special). The customer page's meter allows submitting at 3/4, which
 * the server then rejects; here every bar must be filled to submit, so the
 * agent can't be bounced by a server-side validation error they can't see.
 */
const SPECIAL_RE = /[!@#$%^&*()\-_=+{};:,<.>]/;

function passwordChecks(pw: string) {
  return {
    length: pw.length >= 8,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    digit: /\d/.test(pw),
    special: SPECIAL_RE.test(pw),
  };
}

function passwordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
  valid: boolean;
} {
  const c = passwordChecks(pw);
  // Four bars: length, upper+lower, digit, special.
  let score = 0;
  if (c.length) score++;
  if (c.upper && c.lower) score++;
  if (c.digit) score++;
  if (c.special) score++;

  const levels = [
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-orange-400" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-green-500" },
  ];
  const valid = c.length && c.lower && c.upper && c.digit && c.special;
  return {
    score,
    valid,
    ...(levels[score - 1] ?? { label: "", color: "bg-ink-200" }),
  };
}

function AgentResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = passwordStrength(newPassword);

  useEffect(() => {
    if (!token) {
      setError(
        "Invalid or missing reset token. Please request a new reset link.",
      );
    }
  }, [token]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) return;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!strength.valid) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a special character.",
      );
      return;
    }

    setLoading(true);
    try {
      await api.agentResetPassword(token, newPassword);
      setSuccess(true);
      setTimeout(() => router.push("/agent/login"), 3000);
    } catch (err) {
      setError(
        extractApiMessage(err) ??
          "Failed to reset password. The link may have expired.",
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
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-ink-900 mb-3">
                Password reset
              </h1>
              <p className="text-sm text-ink-500 mb-8">
                Your password has been updated. Taking you to agent sign in…
              </p>
              <Link
                href="/agent/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Sign in now <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-display font-bold text-ink-900 mb-1">
                Set a new password
              </h1>
              <p className="text-sm text-ink-500 mb-6">
                Choose a strong password for your agent account.
              </p>

              {error && (
                <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {!token ? (
                <div className="text-center mt-6">
                  <Link
                    href="/agent/forgot-password"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm rounded-lg transition-colors"
                  >
                    Request a new link
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="agent-new-password"
                      className="block text-xs font-semibold text-ink-700 mb-1.5"
                    >
                      New password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                      />
                      <input
                        id="agent-new-password"
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        aria-label={showNew ? "Hide password" : "Show password"}
                        aria-pressed={showNew}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                      >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {newPassword.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                i <= strength.score
                                  ? strength.color
                                  : "bg-ink-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-ink-400">{strength.label}</p>
                      </div>
                    )}
                    <p className="text-[11px] text-ink-400 mt-1">
                      Min 8 characters, with uppercase, lowercase, number and
                      special character.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="agent-confirm-password"
                      className="block text-xs font-semibold text-ink-700 mb-1.5"
                    >
                      Confirm new password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                      />
                      <input
                        id="agent-confirm-password"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                        aria-pressed={showConfirm}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Resetting…
                      </>
                    ) : (
                      <>
                        Set new password <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}

              <p className="text-xs text-ink-500 mt-6 text-center">
                Remembered it?{" "}
                <Link
                  href="/agent/login"
                  className="text-primary-700 hover:text-primary-800 font-semibold"
                >
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgentResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ink-50">
          <Loader2 size={32} className="animate-spin text-primary-500" />
        </div>
      }
    >
      <AgentResetPasswordForm />
    </Suspense>
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
