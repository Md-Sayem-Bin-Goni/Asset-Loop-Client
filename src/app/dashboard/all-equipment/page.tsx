"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Equipment } from "@/types";
import { toast } from "sonner";
import { Loader2, Package, CheckCircle2, XCircle, Trash2, Clock } from "lucide-react";

export default function AdminAllEquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Deletion Modal State
  const [deletingItem, setDeletingItem] = useState<Equipment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAllEquipment = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/equipments/admin/all");
      if (res.data?.success) {
        setEquipments(res.data.equipments);
      }
    } catch {
      toast.error("Failed to fetch equipment list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEquipment();
  }, []);

  const handleStatusChange = async (id: string, status: "Approved" | "Rejected") => {
    try {
      const res = await axiosSecure.patch(`/equipments/${id}/status`, { status });
      if (res.data?.success) {
        setEquipments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
        toast.success(`Equipment ${status}!`);
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      setIsDeleting(true);
      const res = await axiosSecure.delete(`/equipments/${deletingItem._id}`);
      if (res.data?.success) {
        setEquipments((prev) => prev.filter((item) => item._id !== deletingItem._id));
        toast.success("Equipment deleted permanently.");
        setDeletingItem(null);
      }
    } catch {
      toast.error("Failed to delete equipment.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Listing Moderation
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">All Equipment Listings</h1>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : equipments.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-2xl bg-white dark:bg-gray-900/60 border border-dashed border-gray-300 dark:border-gray-800 text-center space-y-3 shadow-xs">
            <div className="h-14 w-14 rounded-2xl bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <Package className="h-7 w-7" />
            </div>
            <h3 className="font-extrabold text-lg">No Equipment Submitted Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
              Equipment listings submitted by owners will appear here for review and approval.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200/90 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/90 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="py-4 px-5">Equipment</th>
                    <th className="py-4 px-5">Owner</th>
                    <th className="py-4 px-5">Category</th>
                    <th className="py-4 px-5">Price</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-800/80">
                  {equipments.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 px-5 flex items-center gap-3.5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={40}
                          className="h-10 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-800 shrink-0 shadow-xs"
                        />
                        <div>
                          <p className="font-bold text-[var(--foreground)]">{item.name}</p>
                          <p className="text-[11px] text-[var(--muted-foreground)]">{item.location}</p>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-xs">
                        <p className="font-bold text-[var(--foreground)]">{item.owner?.name}</p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">{item.owner?.email}</p>
                      </td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)]">{item.category}</td>
                      <td className="py-4 px-5 font-extrabold text-[#059669] dark:text-[#10B981] whitespace-nowrap">
                        ৳{item.rentalPrice.toLocaleString()}/{item.rentalType}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "Approved"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                              : item.status === "Rejected"
                              ? "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {item.status === "Approved" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : item.status === "Rejected" ? (
                            <XCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-1.5 whitespace-nowrap">
                        {item.status !== "Approved" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "Approved")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:text-emerald-400 dark:hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                        )}
                        {item.status !== "Rejected" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "Rejected")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-600 text-amber-700 hover:text-white dark:text-amber-400 dark:hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        )}
                        <button
                          onClick={() => setDeletingItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-bold cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Trash2 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-[var(--foreground)]">Permanently Delete</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">Administrative listing removal</p>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-[var(--foreground)]">{deletingItem.name}</strong>? This listing and all its historical records will be permanently removed.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setDeletingItem(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  {isDeleting ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
