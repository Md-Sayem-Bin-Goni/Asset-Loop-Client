"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HardHat, Camera, Truck, Tractor, Cpu, Speaker, ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Construction Equipment",
    desc: "Excavators, mixers, scaffolding & power drills",
    icon: HardHat,
  },
  {
    name: "Photography Equipment",
    desc: "DSLR/Mirrorless bodies, cinema lenses & drones",
    icon: Camera,
  },
  {
    name: "Vehicles & Transportation",
    desc: "Pickup vans, cargo trucks & commercial movers",
    icon: Truck,
  },
  {
    name: "Agriculture Equipment",
    desc: "Tractors, harvesters, water pumps & tillers",
    icon: Tractor,
  },
  {
    name: "Electronics",
    desc: "Generators, projectors, workstations & servers",
    icon: Cpu,
  },
  {
    name: "Event Equipment",
    desc: "Sound systems, stage lighting, tents & LED walls",
    icon: Speaker,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50/70 to-white dark:from-[#090D16] dark:to-[#0c121e] border-y border-gray-200/80 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
            Browse By Industry
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Popular Equipment Categories
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">
            Select an industry category to filter verified rental gear available in your district.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/equipment?category=${encodeURIComponent(cat.name)}`}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 hover:border-[#059669] dark:hover:border-[#10B981] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start justify-between gap-4 group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981] group-hover:bg-[#059669] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#059669] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
