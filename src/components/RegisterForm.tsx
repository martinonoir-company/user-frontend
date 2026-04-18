"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Globe, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "CA", name: "Canada" },
  { code: "AE", name: "United Arab Emirates" },
];

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("NG");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const pwStrong = hasLength && hasUpper && hasNumber && hasSpecial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!pwStrong) {
      setError("Password does not meet requirements");
      return;
    }
    setLoading(true);
    try {
      await register({ firstName, lastName, email, password, countryCode });
      router.push("/account");
    } catch (err: unknown) {
      const msg = (err as { message?: string | string[] })?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || "Registration failed");
    }
    setLoading(false);
  };

  const PwCheck = ({ met, label }: { met: boolean; label: string }) => (
    <div className={`flex items-center gap-1.5 text-xs ${met ? "text-green-600" : "text-ink-400"}`}>
      <CheckCircle2 size={12} />
      {label}
    </div>
  );

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
            Join the world of refined luxury.
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            Create your account to unlock exclusive access, personalized recommendations, and seamless checkout.
          </p>
          <div className="mt-8 flex gap-6">
            {["Free Shipping", "Exclusive Offers", "Priority Access"].map((perk) => (
              <div key={perk} className="flex items-center gap-1.5 text-white/30 text-sm">
                <CheckCircle2 size={14} className="text-accent-gold/60" />
                {perk}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/20 text-xs">
          © {new Date().getFullYear()} Martinonoir. All rights reserved.
        </p>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-surface-0">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <span className="text-xl font-display font-bold text-ink-900 tracking-tight">
                MARTINO<span className="text-primary-700">NOIR</span>
              </span>
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold text-ink-900 mb-1">
            Create Account
          </h2>
          <p className="text-ink-500 mb-8">
            Join Martinonoir for a premium experience
          </p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium mb-6">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">First Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">Last Name</label>
                <input
                  type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">Country</label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <select
                  value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all appearance-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-ink-400 mt-1">Determines your default currency (NGN or USD)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" tabIndex={-1}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <PwCheck met={hasLength} label="8+ characters" />
                  <PwCheck met={hasUpper} label="Uppercase" />
                  <PwCheck met={hasNumber} label="Number" />
                  <PwCheck met={hasSpecial} label="Special char" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 mt-2"
            >
              {loading ? "Creating account..." : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-500">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-700 font-semibold hover:text-primary-800 transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
