"use client";

import Link from "next/link";
import Image from "next/image";
import { Equipment } from "@/types";
import { useAuth } from "@/providers/AuthProvider";
import { MapPin, Tag, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const { user } = useAuth();
  const isAvailable = equipment.availableQuantity > 0;
  const targetUrl = user
    ? `/equipment/${equipment._id}`
    : `/login?redirect=${encodeURIComponent(`/equipment/${equipment._id}`)}`;

  return (
    <div className="h-full flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#059669]/50 transition-all duration-300 group">
      {/* Uniform Fixed Aspect Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        <Image
          src={equipment.image || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"}
          alt={equipment.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#111827]/85 text-white backdrop-blur-xs flex items-center gap-1 z-10">
          <Tag className="h-3 w-3 text-[#10B981]" />
          {equipment.category}
        </span>
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 backdrop-blur-xs z-10 ${
            isAvailable
              ? "bg-emerald-600/90 text-white"
              : "bg-red-600/90 text-white"
          }`}
        >
          {isAvailable ? (
            <>
              <CheckCircle2 className="h-3 w-3" /> In Stock ({equipment.availableQuantity})
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3" /> Booked Out
            </>
          )}
        </span>
      </div>

      {/* Card Body (Flex-1 ensures equal card height) */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-[#059669] transition-colors">
            {equipment.name}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#059669] shrink-0" />
            <span className="truncate">{equipment.location}</span>
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
          <div>
            <p className="text-xl font-extrabold text-[#059669]">
              ৳{equipment.rentalPrice.toLocaleString()}
              <span className="text-xs font-normal text-[var(--muted-foreground)]">
                /{equipment.rentalType.toLowerCase()}
              </span>
            </p>
          </div>

          <Link
            href={targetUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors shrink-0"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
