"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Booking } from "@/types";
import InvoiceModal from "@/components/shared/InvoiceModal";
import { Loader2, CalendarCheck, ChevronLeft, ChevronRight, CheckCircle2, Clock, FileText } from "lucide-react";

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
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
          <div className="p-12 sm:p-16 rounded-2xl bg-white dark:bg-gray-900/60 border border-dashed border-gray-300 dark:border-gray-800 text-center space-y-3 shadow-xs">
            <div className="h-14 w-14 rounded-2xl bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <CalendarCheck className="h-7 w-7" />
            </div>
            <h3 className="font-extrabold text-lg">No Rentals Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
              Your equipment rental bookings and receipts will appear here once you book an item.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200/90 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/90 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="py-4 px-5">Equipment Name</th>
                    <th className="py-4 px-5">Start Date</th>
                    <th className="py-4 px-5">End Date</th>
                    <th className="py-4 px-5">Booking Date</th>
                    <th className="py-4 px-5">Total Amount</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5">Booking Status</th>
                    <th className="py-4 px-5 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-800/80">
                  {paginatedRentals.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-[var(--foreground)]">{item.equipmentName}</td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{item.startDate}</td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{item.endDate}</td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                        {new Date(item.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-5 font-extrabold text-[#059669] dark:text-[#10B981] whitespace-nowrap">
                        ৳{Number(item.totalAmount).toLocaleString()}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            item.paymentStatus === "Paid"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {item.paymentStatus === "Paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-400">
                          {item.bookingStatus}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        {item.paymentStatus === "Paid" ? (
                          <button
                            onClick={() => setSelectedBooking(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-[#059669] hover:text-white text-[#059669] dark:text-[#10B981] text-xs font-bold transition-all cursor-pointer shadow-xs"
                            title="View / Download Invoice"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Invoice
                          </button>
                        ) : (
                          <span className="text-xs text-[var(--muted-foreground)] italic">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200/90 dark:border-gray-800 flex items-center justify-between text-xs font-medium">
                <span className="text-[var(--muted-foreground)]">
                  Page <strong className="text-[var(--foreground)]">{page}</strong> of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#059669] disabled:opacity-40 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#059669] disabled:opacity-40 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Invoice Modal Component */}
        <InvoiceModal
          isOpen={!!selectedBooking}
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </div>
    </PrivateRoute>
  );
}
