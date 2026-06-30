"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogIn, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/**
 * Lightweight sign-in modal. Used at checkout so a guest who hits an auth
 * wall can authenticate without navigating away — `login()` updates the
 * auth context in place, so the underlying page (and any form state) is
 * preserved. On success we call `onSuccess` and close.
 */
export default function LoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { login } = useAuth();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  // Send sign-ups to register, then back to wherever the user was (e.g.
  // /checkout) so they land where they started after creating an account.
  const registerHref = `/register?next=${encodeURIComponent(pathname ?? "/")}`;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      onSuccess?.();
      onClose();
    } catch (err) {
      const msg = (err as { message?: string | string[] })?.message;
      setError(
        (Array.isArray(msg) ? msg[0] : msg) ||
          "Could not sign you in. Check your email and password.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-0 rounded-2xl shadow-xl border border-ink-100 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-ink-900">
              Sign in to continue
            </h2>
            <p className="text-sm text-ink-500 mt-0.5">
              Your cart and details are kept as they are.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-700 -mr-1 -mt-1 p-1"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
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
              autoFocus
              className="w-full px-3 py-2.5 bg-surface-0 border border-ink-200 rounded-lg text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 pr-10 bg-surface-0 border border-ink-200 rounded-lg text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700"
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
            {busy ? <Loader2 size={14} className="animate-spin" /> : <LogIn size={14} />}
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-500">
          Don&apos;t have an account?{" "}
          <Link
            href={registerHref}
            onClick={onClose}
            className="font-semibold text-primary-700 hover:text-primary-800"
          >
            Click to sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
