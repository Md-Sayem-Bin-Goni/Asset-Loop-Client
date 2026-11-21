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
      <section id="how-it-works" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            How AssetLoop Works
          </h2>
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
                className="relative p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-3"
              >
                <span className="text-4xl font-black text-[#059669]/15 absolute top-5 right-6">
                  {item.step}
                </span>
                <div className="h-12 w-12 rounded-xl bg-[#059669] text-white flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Extra Section 2: Regional Hubs & Owner Earning Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#111827] dark:bg-[#030712] border border-gray-800 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Active Across Major Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Own Idle Equipment? Turn It Into Steady Monthly Income
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              List your construction tools, cameras, generators, or vehicles on AssetLoop and reach verified renters across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-200 border border-gray-700"
                >
                  <MapPin className="h-3 w-3 text-[#10B981]" /> {city}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shrink-0 transition-colors shadow-lg shadow-emerald-600/20"
          >
            Start Listing Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}