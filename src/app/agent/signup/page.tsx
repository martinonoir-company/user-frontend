"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";

interface Bank {
  name: string;
  code: string;
}

export default function AgentSignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyingBank, setVerifyingBank] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ code: string } | null>(null);

  // Load Paystack-supported banks for the dropdown. /refunds/banks is open
  // to authenticated staff only; we expose the same data via the public
  // agent path implicitly because the bank list isn't sensitive — but
  // here we want it accessible without auth, so we try and fall back to
  // a small hand-curated list if the call is rejected.
  useEffect(() => {
    void api
      .getRefundsBanks()
      .then((res) => {
        // Dedupe by code (Paystack returns digital + commercial variants).
        const seen = new Set<string>();
        setBanks(
          res.data
            .filter((b) => {
              if (!b.code || seen.has(b.code)) return false;
              seen.add(b.code);
              return true;
            })
            .sort((a, b) => a.name.localeCompare(b.name)),
        );
      })
      .catch(() => {
        // Fallback — only the most common NG banks.
        setBanks([
          { name: "Access Bank", code: "044" },
          { name: "First Bank", code: "011" },
          { name: "GTBank", code: "058" },
          { name: "UBA", code: "033" },
          { name: "Zenith Bank", code: "057" },
        ]);
      });
  }, []);

  async function verifyAccount() {
    if (!bankCode || accountNumber.replace(/\D/g, "").length < 10) return;
    setVerifyingBank(true);
    setVerifiedName(null);
    setError(null);
    try {
      const res = await api.verifyBankAccount({
        accountNumber: accountNumber.trim(),
        bankCode,
      });
      if (res.data.ok) {
        setVerifiedName(res.data.accountName);
      } else {
        setError(res.data.error);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not verify account",
      );
    } finally {
      setVerifyingBank(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!verifiedName) {
      setError(
        "Please verify your bank account first — tap Verify next to the account number.",
      );
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const res = await api.agentSignup({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        password,
        bankCode,
        bankAccountNumber: accountNumber.trim(),
      });
      setDone({ code: res.data.code });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not submit application",
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-ink-100 p-8 max-w-md w-full text-center">
          <CheckCircle2 className="mx-auto mb-3 text-emerald-600" size={42} />
          <h1 className="text-2xl font-display font-bold text-ink-900 mb-2">
            Application submitted
          </h1>
          <p className="text-sm text-ink-500 mb-4">
            Your agent code will be{" "}
            <span className="font-mono font-bold text-primary-700">
              {done.code}
            </span>
            . You&apos;ll be able to sign in once a super admin approves
            your account.
          </p>
          <Link
            href="/agent/login"
            className="inline-block px-6 py-2.5 bg-ink-900 text-white font-semibold text-sm rounded-lg hover:bg-ink-800"
          >
            Go to sign-in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-block font-display text-xl font-semibold tracking-tight text-ink-900"
          >
            MARTINO
            <span className="text-accent-gold font-bold">NOIR</span>
          </Link>
          <p className="text-xs tracking-[0.2em] uppercase text-accent-gold mt-3 font-semibold">
            Become an Agent
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-ink-100 p-8">
          <h1 className="text-2xl font-display font-bold text-ink-900 mb-1">
            Apply to become an agent
          </h1>
          <p className="text-sm text-ink-500 mb-6">
            Refer customers to Martinonoir and earn a commission on every
            successful order. Bank verification is required for monthly
            payouts.
          </p>

          {error && (
            <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="First name">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={INPUT}
                />
              </FormField>
              <FormField label="Last name">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={INPUT}
                />
              </FormField>
            </div>

            <FormField label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={INPUT}
              />
            </FormField>

            <FormField label="Phone (optional)">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234…"
                className={INPUT}
              />
            </FormField>

            <FormField label="Password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
                className={INPUT}
              />
              <p className="text-[11px] text-ink-400 mt-1">
                At least 8 characters.
              </p>
            </FormField>

            <div className="pt-3 border-t border-ink-100">
              <p className="text-xs font-semibold text-ink-700 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-600" />
                Bank details for payouts
              </p>
              <div className="space-y-3">
                <FormField label="Bank">
                  <select
                    value={bankCode}
                    onChange={(e) => {
                      setBankCode(e.target.value);
                      setVerifiedName(null);
                    }}
                    required
                    className={INPUT}
                  >
                    <option value="">Select a bank</option>
                    {banks.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Account number">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        );
                        setVerifiedName(null);
                      }}
                      placeholder="10-digit account number"
                      maxLength={10}
                      required
                      className={INPUT}
                    />
                    <button
                      type="button"
                      onClick={verifyAccount}
                      disabled={
                        verifyingBank ||
                        !bankCode ||
                        accountNumber.length < 10
                      }
                      className="px-4 py-2.5 bg-ink-100 hover:bg-ink-200 text-ink-700 text-xs font-medium rounded-lg disabled:opacity-50"
                    >
                      {verifyingBank ? "…" : "Verify"}
                    </button>
                  </div>
                  {verifiedName && (
                    <p className="text-xs text-emerald-700 mt-1.5 font-medium">
                      ✓ {verifiedName} — must match your name above.
                    </p>
                  )}
                </FormField>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy || !verifiedName}
              className="w-full py-3 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
            >
              {busy ? "Submitting…" : "Submit application"}
            </button>
          </form>

          <p className="text-xs text-ink-500 mt-6 text-center">
            Already an agent?{" "}
            <Link
              href="/agent/login"
              className="text-primary-700 hover:text-primary-800 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const INPUT =
  "w-full px-3 py-2.5 bg-white border border-ink-200 rounded-lg text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
