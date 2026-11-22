import Link from "next/link";
import Logo from "@/components/shared/Logo";
import {
  Layers,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Headphones,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#090D16] text-[#111827] dark:text-gray-300 border-t border-gray-200 dark:border-gray-800/80 mt-auto transition-colors">
      {/* Top Trust & Quick CTA Banner */}
      <div className="border-b border-gray-200 dark:border-gray-800/80 bg-white/70 dark:bg-gray-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 shadow-xs">
              <div className="p-2 rounded-lg bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] dark:text-white">Verified Equipment</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin-checked quality &amp; owners</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 shadow-xs">
              <div className="p-2 rounded-lg bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] dark:text-white">Secure Stripe Payments</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Protected transactions &amp; receipts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 shadow-xs">
              <div className="p-2 rounded-lg bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981]">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] dark:text-white">Nationwide Coverage</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dhaka, Chattogram, Sylhet &amp; more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="lg" />

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Bangladesh&apos;s modern peer-to-peer &amp; commercial equipment rental marketplace. Rent verified machinery, cinema cameras, vehicles, and event gear on flexible terms.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow AssetLoop on X"
                className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800/80 hover:bg-[#059669] dark:hover:bg-[#059669] border border-gray-200 dark:border-gray-700/80 hover:border-[#10B981] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all shadow-xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="AssetLoop GitHub"
                className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800/80 hover:bg-[#059669] dark:hover:bg-[#059669] border border-gray-200 dark:border-gray-700/80 hover:border-[#10B981] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all shadow-xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="AssetLoop LinkedIn"
                className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800/80 hover:bg-[#059669] dark:hover:bg-[#059669] border border-gray-200 dark:border-gray-700/80 hover:border-[#10B981] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all shadow-xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[#111827] dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors inline-flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-gray-600 dark:text-gray-300 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors inline-flex items-center gap-1">
                  All Equipment
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors inline-flex items-center gap-1">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors inline-flex items-center gap-1 group">
                  Dashboard
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-[#111827] dark:text-white uppercase tracking-wider mb-4">
              Top Categories
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/equipment?category=Construction+Equipment" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Construction Equipment
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=Photography+Equipment" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Photography Equipment
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=Vehicles+%26+Transportation" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Vehicles &amp; Transportation
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=Agriculture+Equipment" className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors">
                  Agriculture &amp; Event Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact HQ (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-[#111827] dark:text-white uppercase tracking-wider mb-4">
              Bangladesh HQ
            </h3>
            <ul className="space-y-3.5 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-1" />
                <span>House 42, Road 11, Banani, Dhaka 1213, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>support@assetloop.com.bd</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 AssetLoop Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/equipment" className="hover:text-[#111827] dark:hover:text-gray-200 transition-colors">
              Rental Policy
            </Link>
            <Link href="/#why-choose-us" className="hover:text-[#111827] dark:hover:text-gray-200 transition-colors">
              Safety &amp; Trust
            </Link>
            <span className="text-gray-400 dark:text-gray-600">Dhaka, BD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
