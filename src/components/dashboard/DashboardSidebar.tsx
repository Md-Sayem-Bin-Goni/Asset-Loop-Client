"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { signOut } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Layers,
  LayoutDashboard,
  Package,
  PlusCircle,
  CalendarCheck,
  Heart,
  Users,
  UserCircle,
  Home,
  LogOut,
  Sun,
  Moon,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function DashboardSidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("assetloop-token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  const customerLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Rentals", href: "/dashboard/my-rentals", icon: CalendarCheck },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  const ownerLinks = [
    { name: "Analytics Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Equipment", href: "/dashboard/add-equipment", icon: PlusCircle },
    { name: "My Equipment", href: "/dashboard/my-equipment", icon: Package },
    { name: "My Equipment Rental", href: "/dashboard/owner-rentals", icon: CalendarCheck },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  const adminLinks = [
    { name: "Analytics Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "All Users", href: "/dashboard/all-users", icon: Users },
    { name: "All Equipment", href: "/dashboard/all-equipment", icon: Package },
    { name: "All Rentals", href: "/dashboard/all-rentals", icon: CalendarCheck },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "owner"
      ? ownerLinks
      : customerLinks;

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#090D16] text-[#111827] dark:text-gray-200 border-r border-gray-200 dark:border-gray-800 transition-colors">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#059669]">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#111827] dark:text-white">
            Asset<span className="text-[#059669] dark:text-[#10B981]">Loop</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-[#111827] dark:text-gray-400 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Mini Profile Card */}
      <div className="p-4 mx-3 mt-4 rounded-xl bg-slate-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/70 flex items-center gap-3 shadow-xs">
        <img
          src={user?.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=059669&color=fff"}
          alt={user?.name || "User"}
          className="h-10 w-10 rounded-full object-cover border border-[#10B981]"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-[#111827] dark:text-white truncate">{user?.name}</p>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#059669] text-white shadow-md shadow-emerald-950/20"
                  : "text-gray-600 hover:text-[#111827] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/70"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1.5">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-700" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">{SidebarContent}</aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-xs h-full z-10">{SidebarContent}</div>
        </div>
      )}
    </>
  );
}
