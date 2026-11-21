"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HardHat, Camera, Truck, Tractor, Cpu, Speaker } from "lucide-react";

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
    <section className="py-16 sm:py-20 bg-[var(--secondary)]/50 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Browse By Industry
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Popular Equipment Categories
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">
            Select a category to filter verified rental gear available near your city.
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
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[#059669] shadow-xs hover:shadow-md transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-[#059669]/10 text-[#059669] group-hover:bg-[#059669] group-hover:text-white transition-colors shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base group-hover:text-[#059669] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}