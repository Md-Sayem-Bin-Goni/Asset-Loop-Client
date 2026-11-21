"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, CalendarCheck, CreditCard, MapPin, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search & Filter Gear",
    desc: "Browse verified equipment by category, city, rental type, and budget.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Dates & Quantity",
    desc: "Choose your start date, end date, delivery address, and required units.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Pay Securely & Rent",
    desc: "Complete instant payment via Stripe and receive your equipment on schedule.",
    icon: CreditCard,
  },
];

const cities = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Gazipur", "Cumilla", "Bogura"];

export default function ExtraSections() {
  return (
    <>
      {/* Extra Section 1: How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            How AssetLoop Works
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">
            Rent pro-grade machinery in 3 easy steps with guaranteed protection.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-7 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs hover:shadow-xl hover:border-[#059669]/60 hover:-translate-y-1 transition-all duration-300 space-y-4 group overflow-hidden"
              >
                <span className="text-5xl font-black text-[#059669]/10 dark:text-[#10B981]/15 absolute top-4 right-5 select-none">
                  {item.step}
                </span>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white flex items-center justify-center shadow-md shadow-emerald-950/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Extra Section 2: Regional Hubs & Owner Earning Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#111827] via-[#090D16] to-[#059669]/30 border border-emerald-900/50 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Active Across Major Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Own Idle Equipment? Turn It Into Steady Monthly Income
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              List your construction tools, cameras, generators, or vehicles on AssetLoop and reach verified renters across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-xs text-gray-200 border border-gray-700 backdrop-blur-xs transition-colors"
                >
                  <MapPin className="h-3 w-3 text-[#10B981]" /> {city}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shrink-0 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all relative z-10"
          >
            Start Listing Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
