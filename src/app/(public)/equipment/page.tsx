"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Equipment } from "@/types";
import EquipmentCard from "@/components/shared/EquipmentCard";
import { Search, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, PackageX, Sparkles } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
            <Sparkles className="h-3 w-3" />
            Verified Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            All Rental Equipment
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1.5">
            Showing <strong className="text-[var(--foreground)]">{equipments.length}</strong> of {totalItems} verified machinery &amp; gear across Bangladesh
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-[var(--muted-foreground)]">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] shadow-xs cursor-pointer"
          >
            <option value="recent">Recently Added</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl p-5 sm:p-6 mb-10 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#059669] dark:text-[#10B981]" />
            Search &amp; Filter Controls
          </span>
          <button
            onClick={handleReset}
            className="text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
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
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] transition-all"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] cursor-pointer"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] cursor-pointer"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] cursor-pointer"
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
              className="w-1/2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
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
              className="w-1/2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* 3-Column Equipment Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-88 rounded-2xl bg-[var(--card)] border border-[var(--border)] animate-pulse"
            />
          ))}
        </div>
      ) : equipments.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900/60 border border-dashed border-[var(--border)] rounded-2xl space-y-3 shadow-xs">
          <PackageX className="h-12 w-12 text-[#059669] dark:text-[#10B981] mx-auto" />
          <h3 className="text-lg font-bold">No Matching Equipment Found</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            Try adjusting your search keywords, category, or price range filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 disabled:opacity-40 hover:border-[#059669] transition-colors cursor-pointer shadow-xs"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`h-10 w-10 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs ${
                  page === pageNum
                    ? "bg-[#059669] text-white shadow-md shadow-emerald-600/25"
                    : "bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-[#059669]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 disabled:opacity-40 hover:border-[#059669] transition-colors cursor-pointer shadow-xs"
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
    <Suspense fallback={<div className="py-20 text-center text-sm font-medium">Loading equipment catalog...</div>}>
      <AllEquipmentContent />
    </Suspense>
  );
}
