"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  LogOut,
  Package,
  Heart,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Clock,
  Truck,
  CreditCard,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api, UserProfile, Order } from "@/lib/api";
import { formatPrice } from "@/lib/price";

type Tab = "profile" | "password" | "orders";

export default function AccountView() {
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [changingPw, setChangingPw] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    api.getProfile()
      .then((res) => {
        setProfile(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhone(res.data.phone ?? "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  // Fetch orders when tab switches
  useEffect(() => {
    if (activeTab === "orders" && isAuthenticated && !ordersLoaded) {
      setOrdersLoading(true);
      api.getMyOrders({ page: 1, limit: 20 })
        .then((res) => {
          setOrders(res.data.items ?? []);
          setOrdersLoaded(true);
        })
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, isAuthenticated, ordersLoaded]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg(null);
    try {
      const res = await api.updateProfile({ firstName, lastName, phone: phone || undefined });
      setProfile(res.data);
      setProfileMsg({ type: "success", text: "Profile updated successfully" });
    } catch {
      setProfileMsg({ type: "error", text: "Failed to update profile" });
    }
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Password must be at least 8 characters" });
      return;
    }
    setChangingPw(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setPasswordMsg({ type: "success", text: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to change password";
      setPasswordMsg({ type: "error", text: msg });
    }
    setChangingPw(false);
  };

  // Not logged in
  if (!loading && !isAuthenticated) {
    return (
      <div className="content-grid py-16 text-center">
        <User size={48} className="mx-auto text-ink-200 mb-4" />
        <h1 className="text-2xl font-display font-bold text-ink-900 mb-2">Sign In Required</h1>
        <p className="text-ink-500 mb-8">Please sign in to view your account.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/login" className="px-8 py-3 bg-primary-700 text-white font-medium text-sm rounded-lg hover:bg-primary-800 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-8 py-3 border border-ink-200 text-ink-700 font-medium text-sm rounded-lg hover:bg-surface-1 transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-grid py-16">
        <div className="animate-pulse space-y-4 max-w-2xl">
          <div className="h-8 bg-surface-2 rounded w-1/3" />
          <div className="h-4 bg-surface-2 rounded w-1/2" />
          <div className="h-40 bg-surface-2 rounded mt-8" />
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "password", label: "Security", icon: <Lock size={16} /> },
    { id: "orders", label: "Orders", icon: <Package size={16} /> },
  ];

  return (
    <div className="content-grid py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink-900">
          My Account
        </h1>
        <p className="text-ink-500 mt-1">
          Welcome back, {profile?.firstName}
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-ink-600 hover:bg-surface-1"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <hr className="my-3 border-ink-100" />

          <Link
            href="/wishlist"
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium text-ink-600 hover:bg-surface-1 transition-all"
          >
            <Heart size={16} />
            Wishlist
            <ChevronRight size={14} className="ml-auto text-ink-300" />
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="min-w-0">
          {/* Profile tab */}
          {activeTab === "profile" && (
            <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-ink-900 mb-6">Personal Information</h2>

              {profileMsg && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm font-medium ${
                  profileMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {profileMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {profileMsg.text}
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">First Name</label>
                    <input
                      type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Last Name</label>
                    <input
                      type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">Email</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-1 text-sm text-ink-500">
                    <Mail size={16} />
                    {profile?.email}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                      type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">Country</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-1 text-sm text-ink-500">
                    <MapPin size={16} />
                    {profile?.countryCode === "NG" ? "Nigeria" : profile?.countryCode}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-medium text-sm rounded-lg transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* Password tab */}
          {activeTab === "password" && (
            <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-ink-900 mb-6">Change Password</h2>

              {passwordMsg && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm font-medium ${
                  passwordMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {passwordMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"} value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)} required
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"} value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} required minLength={8}
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-ink-400 mt-1">Min 8 chars, 1 uppercase, 1 number, 1 special character</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-surface-0 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={changingPw}
                  className="px-6 py-3 bg-ink-900 hover:bg-ink-800 text-white font-medium text-sm rounded-lg transition-all disabled:opacity-50"
                >
                  {changingPw ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          )}

          {/* Orders tab */}
          {activeTab === "orders" && (
            <div className="bg-surface-0 border border-ink-100 rounded-xl p-6 md:p-8">
              <h2 className="text-lg font-semibold text-ink-900 mb-6">Order History</h2>

              {ordersLoading && (
                <div className="text-center py-12">
                  <Loader2 size={32} className="mx-auto text-primary-500 animate-spin mb-3" />
                  <p className="text-sm text-ink-400">Loading orders...</p>
                </div>
              )}

              {!ordersLoading && orders.length === 0 && (
                <div className="text-center py-12">
                  <Package size={40} className="mx-auto text-ink-200 mb-3" />
                  <p className="text-ink-700 font-medium">No orders yet</p>
                  <p className="text-sm text-ink-400 mt-1">When you make a purchase, it will appear here.</p>
                  <Link href="/shop" className="inline-flex mt-4 px-6 py-2.5 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              )}

              {!ordersLoading && orders.length > 0 && (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
                      PENDING_PAYMENT: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <Clock size={14} />, label: "Pending Payment" },
                      PAID: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <CreditCard size={14} />, label: "Paid" },
                      PROCESSING: { color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: <Package size={14} />, label: "Processing" },
                      SHIPPED: { color: "bg-purple-50 text-purple-700 border-purple-200", icon: <Truck size={14} />, label: "Shipped" },
                      DELIVERED: { color: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 size={14} />, label: "Delivered" },
                      COMPLETED: { color: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 size={14} />, label: "Completed" },
                      CANCELLED: { color: "bg-red-50 text-red-700 border-red-200", icon: <XCircle size={14} />, label: "Cancelled" },
                      REFUNDED: { color: "bg-gray-50 text-gray-700 border-gray-200", icon: <RotateCcw size={14} />, label: "Refunded" },
                    };
                    const st = statusConfig[order.status] ?? { color: "bg-gray-50 text-gray-600 border-gray-200", icon: <Package size={14} />, label: order.status };
                    const orderDate = new Date(order.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });

                    return (
                      <div key={order.id} className="border border-ink-100 rounded-lg p-4 hover:border-primary-200 hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-sm font-bold text-ink-900 font-mono">{order.orderNumber}</p>
                            <p className="text-xs text-ink-400 mt-0.5">{orderDate}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${st.color}`}>
                            {st.icon}
                            {st.label}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-xs text-ink-500">
                            {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""} &middot; {order.channel}
                          </p>
                          <p className="text-sm font-bold text-ink-900">
                            {formatPrice(order.grandTotal, order.currency)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
