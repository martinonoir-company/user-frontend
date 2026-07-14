"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAgentAuth } from "@/lib/agent-auth-context";

export default function AgentLoginPage() {
  const router = useRouter();
  const { login } = useAgentAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace("/agent/dashboard");
    } catch (err) {
      setError(extractApiMessage(err) ?? "Could not sign you in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block font-display text-xl font-semibold tracking-tight text-ink-900">
            MARTINO<span className="text-accent-gold font-bold">NOIR</span>
          </Link>
          <p className="text-xs tracking-[0.2em] uppercase text-accent-gold mt-3 font-semibold">
            Agent Portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-ink-100 p-8">
          <h1 className="text-2xl font-display font-bold text-ink-900 mb-1">
            Agent sign in
          </h1>
          <p className="text-sm text-ink-500 mb-6">
            Track your referrals and earnings.
          </p>

          {error && (
            <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="agent-login-password"
                  className="block text-xs font-semibold text-ink-700"
                >
                  Password
                </label>
                <Link
                  href="/agent/forgot-password"
                  className="text-xs font-semibold text-primary-700 hover:text-primary-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="agent-login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-3 pr-10 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
            >
              <LogIn size={14} />
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-ink-500 mt-6 text-center">
            Not an agent yet?{" "}
            <Link href="/agent/signup" className="text-primary-700 hover:text-primary-800 font-semibold">
              Apply to become one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Pull a human-readable message off whatever the API client throws. The
 * storefront request() helper throws a plain ApiError object (not an
 * Error instance), so `err instanceof Error` misses it. The server's
 * BadRequest/Unauthorized message lives on `.message` (sometimes an
 * array). This surfaces it so the agent sees the real reason.
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
