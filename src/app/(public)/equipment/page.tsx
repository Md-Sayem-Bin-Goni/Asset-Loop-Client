"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Equipment } from "@/types";
import EquipmentCard from "@/components/shared/EquipmentCard";
import { Search, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, PackageX } from "lucide-react";

const CATEGORIES = [
  "All",
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

function AllEquipmentContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [rentalType, setRentalType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("recent");

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          search,
          category,
          rentalType,
          minPrice,
          maxPrice,
          availability,
          sort,
          page: page.toString(),
          limit: "9",
        });

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/equipments?${params.toString()}`
        );

        if (res.data?.success) {
          setEquipments(res.data.equipments);
          setTotalPages(res.data.totalPages || 1);
          setTotalItems(res.data.total || 0);
        }
      } catch (error) {
        console.error("Failed to fetch equipments:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchEquipments, 300);
    return () => clearTimeout(debounce);
  }, [search, category, rentalType, minPrice, maxPrice, availability, sort, page]);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setRentalType("All");
    setMinPrice("");
    setMaxPrice("");
    setAvailability("all");
    setSort("recent");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Verified Marketplace
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">
            All Rental Equipment
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Showing {equipments.length} of {totalItems} approved equipment items across Bangladesh
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#059669]"
          >
            <option value="recent">Recently Added</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 mb-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#059669]" />
            Search &amp; Filter Controls
          </span>
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-[#059669] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="h-4 w-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by equipment name or city..."
              className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rental Type Filter */}
          <div>
            <select
              value={rentalType}
              onChange={(e) => {
                setRentalType(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="All">All Rental Types</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <select
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="all">All Availability</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </div>

          {/* Min - Max Price */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              placeholder="Min ৳"
              className="w-1/2 px-2.5 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
              placeholder="Max ৳"
              className="w-1/2 px-2.5 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* 3-Column Equipment Grid */}
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
        <div className="text-center py-20 bg-[var(--card)] border border-dashed border-[var(--border)] rounded-2xl space-y-3">
          <PackageX className="h-12 w-12 text-[#059669] mx-auto" />
          <h3 className="text-lg font-bold">No Matching Equipment Found</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            Try adjusting your search keywords, category, or price range filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((item) => (
            <EquipmentCard key={item._id} equipment={item} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] disabled:opacity-40 hover:border-[#059669] transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`h-10 w-10 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  page === pageNum
                    ? "bg-[#059669] text-white"
                    : "bg-[var(--card)] border border-[var(--border)] hover:border-[#059669]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] disabled:opacity-40 hover:border-[#059669] transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AllEquipmentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm">Loading equipment catalog...</div>}>
      <AllEquipmentContent />
    </Suspense>
  );
}