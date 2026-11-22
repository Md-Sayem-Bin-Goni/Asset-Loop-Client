"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  Zap,
  MapPin,
} from "lucide-react";

export default function BannerSection() {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: "500+ Verified Gear",
      subtitle: "Inspected & authentic listings",
    },
    {
      icon: Zap,
      title: "Instant Stripe Payments",
      subtitle: "Protected digital checkout",
    },
    {
      icon: CheckCircle2,
      title: "100% Insured Rentals",
      subtitle: "Damage & transit protection",
    },
    {
      icon: MapPin,
      title: "All 64 Districts",
      subtitle: "Nationwide coverage & pickup",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-[#090D16] text-[#111827] dark:text-white py-20 sm:py-28 lg:py-32 border-b border-gray-200/90 dark:border-gray-800 transition-colors bg-hero-grid">
      {/* Ambient Emerald & Mint Radial Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[44rem] rounded-full bg-gradient-to-br from-[#059669]/20 via-[#10B981]/15 to-transparent blur-3xl dark:from-[#059669]/25 dark:via-[#10B981]/15 animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[20rem] w-[36rem] rounded-full bg-gradient-to-t from-[#10B981]/10 via-[#059669]/5 to-transparent blur-3xl dark:from-[#10B981]/15 dark:to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Trust Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/80 border border-[#059669]/30 dark:border-[#10B981]/30 shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#059669] dark:text-[#10B981] tracking-wide">
              Bangladesh&apos;s #1 Equipment Rental Platform
            </span>
          </div>

          {/* Clean High-Impact Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-[#111827] dark:text-white max-w-4xl mx-auto">
            Rent Pro-Grade Equipment <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#059669] via-[#047857] to-[#10B981] dark:from-[#10B981] dark:via-[#34D399] dark:to-[#059669] bg-clip-text text-transparent">
              Without Heavy Ownership
            </span>
          </h1>

          {/* Clean Value Proposition Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Direct access to verified construction machinery, cinema camera rigs, agricultural tractors, and event sound systems across all 64 districts with flexible daily, weekly, and monthly rates.
          </p>

          {/* Centered Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore All Equipment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/90 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-800 border border-gray-300/90 dark:border-gray-700/80 text-[#111827] dark:text-white font-bold text-sm sm:text-base transition-all shadow-xs hover:border-[#059669]/60 hover:-translate-y-0.5 active:scale-[0.98] backdrop-blur-md cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 text-[#059669] dark:text-[#10B981]" />
              <span>List Your Equipment</span>
            </Link>
          </div>

          {/* Clean Trust Features Grid */}
          <div className="pt-8 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {trustFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800/80 shadow-xs hover:shadow-md hover:border-[#059669]/40 dark:hover:border-[#10B981]/30 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm text-left flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-[#059669] dark:text-[#10B981] shrink-0 group-hover:bg-[#059669] group-hover:text-white transition-colors">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm font-extrabold text-[#111827] dark:text-white truncate">
                      {feat.title}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
