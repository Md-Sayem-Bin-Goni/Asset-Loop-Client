"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Booking } from "@/types";
import { Loader2, CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/bookings/customer");
        if (res.data?.success) {
          setRentals(res.data.rentals);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch rentals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const totalPages = Math.max(1, Math.ceil(rentals.length / perPage));
  const paginatedRentals = rentals.slice((page - 1) * perPage, page * perPage);

  return (
    <PrivateRoute allowedRoles={["customer"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Customer Bookings
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">My Rentals</h1>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : rentals.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
            <CalendarCheck className="h-10 w-10 text-[#059669] mx-auto" />
            <h3 className="font-bold text-lg">No Rentals Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Your equipment rental bookings will appear here once you book an item.
            </p>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-xs uppercase text-[var(--muted-foreground)]">
                    <th className="py-3.5 px-4 font-semibold">Equipment Name</th>
                    <th className="py-3.5 px-4 font-semibold">Start Date</th>
                    <th className="py-3.5 px-4 font-semibold">End Date</th>
                    <th className="py-3.5 px-4 font-semibold">Booking Date</th>
                    <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Payment Status</th>
                    <th className="py-3.5 px-4 font-semibold">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {paginatedRentals.map((item) => (
                    <tr key={item._id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">{item.equipmentName}</td>
                      <td className="py-3.5 px-4 text-xs">{item.startDate}</td>
                      <td className="py-3.5 px-4 text-xs">{item.endDate}</td>
                      <td className="py-3.5 px-4 text-xs">
                        {new Date(item.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#059669]">
                        ৳{Number(item.totalAmount).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.paymentStatus === "Paid"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          {item.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="p-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-1.5 rounded-lg border border-[var(--border)] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-1.5 rounded-lg border border-[var(--border)] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
