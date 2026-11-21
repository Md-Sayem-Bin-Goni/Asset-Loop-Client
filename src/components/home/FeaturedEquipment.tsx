"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { Equipment } from "@/types";
import EquipmentCard from "@/components/shared/EquipmentCard";
import { ArrowRight, PackageOpen } from "lucide-react";

export default function FeaturedEquipment() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/equipments/featured`
        );
        if (res.data?.success) {
          setEquipments(res.data.equipments);
        }
      } catch (error) {
        console.error("Error fetching featured equipment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Top Picks For You
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Featured Equipment
          </h2>
        </div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] hover:text-[#047857]"
        >
          Browse All Equipment <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-2xl bg-[var(--card)] border border-[var(--border)] animate-pulse"
            />
          ))}
        </div>
      ) : equipments.length === 0 ? (
        <div className="text-center py-16 bg-[var(--card)] border border-dashed border-[var(--border)] rounded-2xl space-y-3">
          <PackageOpen className="h-10 w-10 text-[#059669] mx-auto" />
          <h3 className="text-lg font-semibold">No Approved Equipment Yet</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            Once an Equipment Owner adds items and an Admin approves them, the latest 6 items will appear right here.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {equipments.map((item) => (
            <EquipmentCard key={item._id} equipment={item} />
          ))}
        </motion.div>
      )}
    </section>
  );
}