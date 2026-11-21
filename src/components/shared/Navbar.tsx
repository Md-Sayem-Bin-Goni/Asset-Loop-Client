"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { signOut } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Sun, Moon, Layers, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("assetloop-token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Equipment", href: "/equipment" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#why-choose-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#090D16] text-[#111827] dark:text-white border-b border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-[#059669] group-hover:bg-[#047857] transition-colors">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#111827] dark:text-white">
            Asset<span className="text-[#059669] dark:text-[#10B981]">Loop</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#059669] dark:text-[#10B981] font-semibold"
                    : "text-gray-600 hover:text-[#111827] dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Auth Buttons */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer shrink-0"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-700" />}
            </button>
          )}

          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-2.5 lg:gap-3">
                  {/* Compact User Profile Pill */}
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700/80 transition-all cursor-pointer group shrink-0"
                    title="View Profile"
                  >
                    <Image
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=059669&color=fff`
                      }
                      alt={user.name || "User"}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover border border-[#059669]/60 shrink-0"
                    />
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[80px] lg:max-w-[120px] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                      {user.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#059669]/15 text-[#059669] dark:text-[#10B981] shrink-0">
                      {user.role}
                    </span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 lg:px-3.5 py-1.5 lg:py-2 rounded-lg text-sm font-medium bg-[#059669] hover:bg-[#047857] text-white transition-colors shrink-0 shadow-xs"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 lg:py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-600/90 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer shrink-0"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#111827] hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#059669] hover:bg-[#047857] text-white transition-colors shadow-xs"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-700" />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-[#111827] hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#090D16] border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-[#059669] dark:text-gray-300 dark:hover:text-[#10B981]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2.5">
            {user ? (
              <>
                {/* Mobile User Profile Card */}
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 hover:bg-slate-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=059669&color=fff`
                    }
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover border border-[#059669] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] dark:text-white truncate">
                      {user.name}
                    </p>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#059669]/15 text-[#059669] dark:text-[#10B981]">
                      {user.role}
                    </span>
                  </div>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-[#059669] hover:bg-[#047857] text-white transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-600 dark:hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg text-sm font-medium bg-[#059669] text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 w-full bg-white/95 dark:bg-[#090D16] border-b border-gray-200 dark:border-gray-800" />}>
      <NavbarContent />
    </Suspense>
  );
}
