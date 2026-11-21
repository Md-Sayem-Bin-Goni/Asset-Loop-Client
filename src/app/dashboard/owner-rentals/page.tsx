"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Booking } from "@/types";
import { Loader2, CalendarCheck, CheckCircle2, Clock } from "lucide-react";

export default function OwnerRentalsPage() {
  const [rentals, setRentals] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerRentals = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/bookings/owner");
        if (res.data?.success) {
          setRentals(res.data.rentals);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch owner rentals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerRentals();
  }, []);

  return (
    <PrivateRoute allowedRoles={["owner"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Customer Orders
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">My Equipment Rental</h1>
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
            <h3 className="font-extrabold text-lg">No Bookings Received Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
              When customers rent your approved equipment, their booking details and receipts will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200/90 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/90 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="py-4 px-5">Customer Info</th>
                    <th className="py-4 px-5">Equipment Info</th>
                    <th className="py-4 px-5">Rental Duration</th>
                    <th className="py-4 px-5">Quantity</th>
                    <th className="py-4 px-5">Booking Amount</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-800/80">
                  {rentals.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-bold text-[var(--foreground)]">{item.customerName}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.customerEmail}</p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">{item.contactNumber}</p>
                      </td>
                      <td className="py-4 px-5 font-bold text-[var(--foreground)]">{item.equipmentName}</td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                        {item.startDate} → {item.endDate}
                      </td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{item.requiredQuantity} units</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
