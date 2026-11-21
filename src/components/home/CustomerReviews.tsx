"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Mahmudul Hasan",
    role: "Civil Engineer, Dhaka",
    rating: 5,
    comment:
      "Rented a concrete vibrator and rotary hammer for our Uttara site. Delivered on time and saved our firm huge upfront capital.",
  },
  {
    name: "Nusrat Jahan",
    role: "Wedding Filmmaker, Sylhet",
    rating: 5,
    comment:
      "Found a Sony FX3 cinema rig with gimbal on AssetLoop in minutes. Smooth Stripe checkout and super responsive owner!",
  },
  {
    name: "Rafiqul Islam",
    role: "Agro Entrepreneur, Bogura",
    rating: 5,
    comment:
      "Weekly tractor and irrigation pump rentals helped us finish harvest right before the monsoon. Truly reliable service.",
  },
  {
    name: "Tariqul Alam",
    role: "Event Director, Chattogram",
    rating: 4,
    comment:
      "Booked line-array sound systems and truss lighting for a corporate summit. Transparent daily rates with zero hidden fees.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50/70 to-white dark:from-[#090D16] dark:to-[#0c121e] border-y border-gray-200/80 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            What Our Renters Say
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">
            Real feedback from verified contractors, filmmakers, and business owners.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-[#059669]/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-[#059669]/30 dark:text-[#10B981]/30" />
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)]">
                <p className="text-sm font-bold">{rev.name}</p>
                <p className="text-[11px] text-[#059669] dark:text-[#10B981] font-semibold">{rev.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
