"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Booking } from "@/types";
import { Loader2, CalendarCheck } from "lucide-react";

export default function AdminAllRentalsPage() {
  const [rentals, setRentals] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRentals = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/bookings/admin");
        if (res.data?.success) {
          setRentals(res.data.rentals);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch all rentals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRentals();
  }, []);

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Platform Transactions
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">All Platform Rentals</h1>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : rentals.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
            <CalendarCheck className="h-10 w-10 text-[#059669] mx-auto" />
            <h3 className="font-bold text-lg">No Platform Rentals Yet</h3>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-xs uppercase text-[var(--muted-foreground)]">
                    <th className="py-3.5 px-4 font-semibold">Equipment</th>
                    <th className="py-3.5 px-4 font-semibold">Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Owner</th>
                    <th className="py-3.5 px-4 font-semibold">Duration</th>
                    <th className="py-3.5 px-4 font-semibold">Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Payment</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {rentals.map((item) => (
                    <tr key={item._id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">{item.equipmentName}</td>
                      <td className="py-3.5 px-4 text-xs">
                        <p className="font-medium">{item.customerName}</p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">{item.customerEmail}</p>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[var(--muted-foreground)]">{item.ownerEmail}</td>
                      <td className="py-3.5 px-4 text-xs">
                        {item.startDate} → {item.endDate}
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
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-600">
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
