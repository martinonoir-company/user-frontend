"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Banknote,
  LogOut,
  Copy,
  Check,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import {
  api,
  AgentDashboardView,
  AgentAttributionView,
  AgentPayoutView,
} from "@/lib/api";
import { useAgentAuth } from "@/lib/agent-auth-context";
import { formatPrice } from "@/lib/price";

const ATTR_STYLES: Record<AgentAttributionView["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800",
  EARNED: "bg-emerald-100 text-emerald-800",
  REVERSED: "bg-red-100 text-red-800",
  PAID: "bg-blue-100 text-blue-800",
};

const PAYOUT_STYLES: Record<AgentPayoutView["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SUCCEEDED: "bg-emerald-100 text-emerald-800",
  FAILED: "bg-red-100 text-red-800",
};

export default function AgentDashboardPage() {
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated, logout } = useAgentAuth();
  const [data, setData] = useState<AgentDashboardView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/agent/login");
      return;
    }
    void api
      .getAgentDashboard()
      .then((res) => setData(res.data))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Could not load dashboard"),
      )
      .finally(() => setLoading(false));
  }, [authLoading, isAuthenticated, router]);

  function handleLogout() {
    logout();
    router.replace("/agent/login");
  }

  function copyCode() {
    if (!data) return;
    void navigator.clipboard.writeText(data.agent.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50 text-sm text-ink-500">
        Loading dashboard…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50 p-4">
        <div className="text-sm text-red-700">{error ?? "No data"}</div>
      </div>
    );
  }

  const a = data.agent;

  return (
    <div className="min-h-screen bg-ink-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink-900"
            >
              MARTINO
              <span className="text-accent-gold font-bold">NOIR</span>
            </Link>
            <p className="text-xs tracking-[0.2em] uppercase text-accent-gold mt-2 font-semibold">
              Agent Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-ink-500 hover:text-ink-900 inline-flex items-center gap-1"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>

        {/* Code + status */}
        <div className="bg-ink-900 text-white rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest">
              Your agent code
            </p>
            <button
              onClick={copyCode}
              className="mt-1 font-mono text-2xl font-bold text-accent-gold inline-flex items-center gap-2 hover:opacity-80"
            >
              {a.code}
              {copied ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} className="text-white/60" />
              )}
            </button>
            <p className="text-xs text-white/40 mt-1">
              Share this code with customers. They enter it at checkout — at
              the till, on the website, or in the mobile app.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50 uppercase tracking-widest">
              Status
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-300 inline-flex items-center gap-1.5">
              <ShieldCheck size={14} />
              {a.status === "APPROVED" ? "Active" : a.status}
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi
            icon={Wallet}
            label="Wallet balance"
            value={formatPrice(data.totals.walletBalanceMinor, "NGN")}
            sub="Pending payout"
            accent="text-ink-900"
          />
          <Kpi
            icon={TrendingUp}
            label="Lifetime earned"
            value={formatPrice(data.totals.lifetimeEarnedMinor, "NGN")}
            sub={`${data.totals.ordersCount} order${data.totals.ordersCount === 1 ? "" : "s"}`}
            accent="text-emerald-700"
          />
          <Kpi
            icon={Banknote}
            label="Lifetime paid"
            value={formatPrice(data.totals.lifetimePaidMinor, "NGN")}
            sub="Already disbursed"
            accent="text-primary-700"
          />
        </div>

        {/* Attributions */}
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900 inline-flex items-center gap-2">
              <ReceiptText size={14} /> Recent referrals
            </h3>
            <span className="text-xs text-ink-400">
              {data.recentAttributions.length} shown
            </span>
          </div>
          {data.recentAttributions.length === 0 ? (
            <div className="p-10 text-center text-sm text-ink-500">
              No referrals yet. Share your code and earnings will appear here
              once an order is paid.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ink-50 border-b border-ink-100">
                  <tr className="text-left text-xs text-ink-500 uppercase tracking-wider">
                    <th className="px-4 py-2 font-medium">Order</th>
                    <th className="px-4 py-2 font-medium">Channel</th>
                    <th className="px-4 py-2 font-medium text-right">
                      Order total
                    </th>
                    <th className="px-4 py-2 font-medium text-right">
                      Your commission
                    </th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentAttributions.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-ink-100 last:border-0"
                    >
                      <td className="px-4 py-2 text-ink-700 font-mono text-xs">
                        {row.orderNumber}
                      </td>
                      <td className="px-4 py-2 text-ink-500 text-xs">
                        {row.channel}
                      </td>
                      <td className="px-4 py-2 text-right text-ink-700">
                        {formatPrice(row.orderTotalMinor, row.currency)}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-ink-900">
                        {formatPrice(row.commissionMinor, row.currency)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${ATTR_STYLES[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-ink-500 text-xs">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payouts */}
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-100">
            <h3 className="text-sm font-semibold text-ink-900">
              Payout history
            </h3>
          </div>
          {data.recentPayouts.length === 0 ? (
            <div className="p-10 text-center text-sm text-ink-500">
              No payouts yet — payouts are typically processed at the end of
              each month by the super admin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-ink-50 border-b border-ink-100">
                  <tr className="text-left text-xs text-ink-500 uppercase tracking-wider">
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 font-medium text-right">Amount</th>
                    <th className="px-4 py-2 font-medium text-right">Orders</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium">Paid to</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentPayouts.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-ink-100 last:border-0"
                    >
                      <td className="px-4 py-2 text-ink-700 text-xs">
                        {new Date(row.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-ink-900">
                        {formatPrice(row.amountMinor, row.currency)}
                      </td>
                      <td className="px-4 py-2 text-right text-ink-700">
                        {row.attributionCount}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${PAYOUT_STYLES[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-ink-500 text-xs">
                        {row.bankAccountName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <div className="flex items-center gap-2 text-xs text-ink-500 mb-2">
        <Icon size={14} /> {label}
      </div>
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      <p className="text-xs text-ink-500 mt-1">{sub}</p>
    </div>
  );
}
