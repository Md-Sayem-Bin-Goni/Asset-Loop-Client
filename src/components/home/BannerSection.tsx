"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, PlusCircle } from "lucide-react";

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 dark:bg-[#090D16] text-[#111827] dark:text-white py-16 sm:py-24 lg:py-28 border-b border-gray-200 dark:border-gray-800 transition-colors">
      {/* Subtle Emerald Background Glows */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#059669]/15 to-[#10B981]/10 blur-3xl dark:from-[#059669]/25 dark:to-[#10B981]/15" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#10B981]/10 to-[#059669]/10 blur-3xl dark:from-[#10B981]/15 dark:to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669]/10 dark:bg-[#059669]/20 border border-[#059669]/25 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981] text-xs font-semibold shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#059669] dark:text-[#10B981]" />
              Bangladesh&apos;s #1 Verified Equipment Rental Platform
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#111827] dark:text-white">
              Rent Pro-Grade Gear <br />
              <span className="bg-gradient-to-r from-[#059669] via-[#047857] to-[#10B981] dark:from-[#10B981] dark:to-[#059669] bg-clip-text text-transparent">
                Without Heavy Ownership
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              From heavy construction machinery in Dhaka to cinema cameras in Sylhet and agricultural tractors in Khulna—book verified equipment securely with flexible daily, weekly, or monthly plans.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all"
              >
                Explore All Equipment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 dark:bg-gray-800/90 dark:hover:bg-gray-700/90 dark:border-gray-700 text-[#111827] dark:text-white font-semibold text-sm transition-all shadow-xs hover:border-[#059669]/40 hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4 text-[#059669] dark:text-[#10B981]" />
                List Your Equipment
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-[#059669] dark:text-[#10B981]" /> 100% Admin-Verified Listings
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-[#059669] dark:text-[#10B981]" /> Instant Stripe Checkout
              </span>
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-gray-200/90 dark:border-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial and Commercial Equipment"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-800 shadow-xl flex items-center justify-between z-10">
                <div>
                  <p className="text-xs text-[#059669] dark:text-[#10B981] font-bold">Nationwide Network</p>
                  <p className="text-sm font-extrabold text-[#111827] dark:text-white">64 Districts Coverage Ready</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#059669] text-white text-xs font-bold shadow-xs">
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
