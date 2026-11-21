"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, PlusCircle } from "lucide-react";

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#090D16] text-[#111827] dark:text-white py-16 sm:py-24 lg:py-28 border-b border-gray-200 dark:border-gray-800 transition-colors">
      {/* Subtle Emerald Glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#059669]/10 dark:bg-[#059669]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-[#10B981]/10 dark:bg-[#10B981]/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669]/10 dark:bg-[#059669]/20 border border-[#059669]/20 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Bangladesh&apos;s #1 Verified Equipment Rental Platform
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#111827] dark:text-white">
              Rent Pro-Grade Gear <br />
              <span className="text-[#059669] dark:text-[#10B981]">Without Heavy Ownership</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              From heavy construction machinery in Dhaka to cinema cameras in Sylhet and agricultural tractors in Khulna—book verified equipment securely with flexible daily, weekly, or monthly plans.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all"
              >
                Explore All Equipment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 text-[#111827] dark:text-white font-semibold text-sm transition-all shadow-xs"
              >
                <PlusCircle className="h-4 w-4 text-[#059669] dark:text-[#10B981]" />
                List Your Equipment
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#059669] dark:text-[#10B981]" /> 100% Admin-Verified Listings
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#059669] dark:text-[#10B981]" /> Instant Stripe Checkout
              </span>
            </div>
          </motion.div>

          {/* Right High-Quality Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial and Commercial Equipment"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#059669] dark:text-[#10B981] font-semibold">Nationwide Network</p>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">64 Districts Coverage Ready</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#059669] text-white text-xs font-bold">
                  Active 24/7
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
