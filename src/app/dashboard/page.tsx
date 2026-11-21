"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import axiosSecure from "@/lib/axiosSecure";
import { AdminAnalyticsStats, OwnerAnalyticsStats } from "@/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Package,
  Clock,
  CalendarCheck,
  CheckCircle2,
  Banknote,
  Heart,
  ArrowRight,
  Loader2,
  LucideIcon,
  Sparkles,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [adminStats, setAdminStats] = useState<AdminAnalyticsStats | null>(null);
  const [ownerStats, setOwnerStats] = useState<OwnerAnalyticsStats | null>(null);
  const [customerCounts, setCustomerCounts] = useState({ rentals: 0, favorites: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        if (user.role === "admin") {
          const res = await axiosSecure.get("/analytics/admin");
          if (res.data?.success) setAdminStats(res.data.stats);
        } else if (user.role === "owner") {
          const res = await axiosSecure.get("/analytics/owner");
          if (res.data?.success) setOwnerStats(res.data.stats);
        } else {
          const [rentalsRes, favRes] = await Promise.all([
            axiosSecure.get("/bookings/customer"),
            axiosSecure.get("/favorites"),
          ]);
          setCustomerCounts({
            rentals: rentalsRes.data?.rentals?.length || 0,
            favorites: favRes.data?.favorites?.length || 0,
          });
        }
      } catch (error: unknown) {
        console.error("Dashboard overview load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
          <Sparkles className="h-3 w-3" />
          {user?.role} Workspace
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Here is a live summary of your AssetLoop activity and performance metrics.
        </p>
      </div>

      {/* ADMIN ANALYTICS */}
      {user?.role === "admin" && adminStats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard title="Total Users" value={adminStats.totalUsers} icon={Users} />
            <StatCard title="Total Equipment" value={adminStats.totalEquipment} icon={Package} />
            <StatCard title="Pending Approvals" value={adminStats.pendingApprovals} icon={Clock} highlight />
            <StatCard title="Total Bookings" value={adminStats.totalBookings} icon={CalendarCheck} />
            <StatCard title="Completed Rentals" value={adminStats.completedRentals} icon={CheckCircle2} />
            <StatCard
              title="Total Platform Revenue"
              value={`৳${Number(adminStats.totalRevenue || 0).toLocaleString()}`}
              icon={Banknote}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs">
              <h3 className="font-bold text-base mb-4">Monthly Revenue Trend (৳)</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adminStats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#059669"
                      fill="#10B981"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs">
              <h3 className="font-bold text-base mb-4">Monthly Bookings Volume</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adminStats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#059669" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* OWNER ANALYTICS */}
      {user?.role === "owner" && ownerStats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatCard title="Listed Equipment" value={ownerStats.totalListedEquipment} icon={Package} />
            <StatCard title="Completed Rentals" value={ownerStats.completedRentals} icon={CheckCircle2} />
            <StatCard
              title="Total Earnings"
              value={`৳${Number(ownerStats.totalEarnings || 0).toLocaleString()}`}
              icon={Banknote}
            />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs">
            <h3 className="font-bold text-base mb-4">Monthly Earnings Overview (৳)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ownerStats.monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* CUSTOMER OVERVIEW */}
      {user?.role === "customer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard title="My Rental Bookings" value={customerCounts.rentals} icon={CalendarCheck} />
            <StatCard title="Saved Favorites" value={customerCounts.favorites} icon={Heart} />
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg">Need equipment for your next project?</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Browse verified construction machinery, cinema cameras, and event equipment across Bangladesh.
              </p>
            </div>
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all shrink-0"
            >
              Browse Equipment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-gray-900/60 border shadow-xs hover:shadow-md transition-all flex items-center justify-between group ${
        highlight
          ? "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10"
          : "border-gray-200/90 dark:border-gray-800 hover:border-[#059669]/40"
      }`}
    >
      <div>
        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
          {title}
        </p>
        <p className={`text-2xl sm:text-3xl font-black mt-2 ${highlight ? "text-amber-500" : "text-[#111827] dark:text-white"}`}>
          {value}
        </p>
      </div>
      <div className="h-12 w-12 rounded-xl bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981] group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 shadow-xs">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
