"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Equipment } from "@/types";
import { toast } from "sonner";
import { Loader2, Package, Edit, Trash2, Eye, X, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function MyEquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchMyEquipments = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/equipments/owner/my-equipments");
      if (res.data?.success) {
        setEquipments(res.data.equipments);
      }
    } catch {
      toast.error("Failed to fetch your equipment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEquipments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this equipment?")) return;
    try {
      const res = await axiosSecure.delete(`/equipments/${id}`);
      if (res.data?.success) {
        setEquipments((prev) => prev.filter((item) => item._id !== id));
        toast.success("Equipment deleted successfully");
      }
    } catch {
      toast.error("Failed to delete equipment");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      setUpdating(true);
      const res = await axiosSecure.put(`/equipments/${editingItem._id}`, {
        name: editingItem.name,
        rentalPrice: Number(editingItem.rentalPrice),
        availableQuantity: Number(editingItem.availableQuantity),
        location: editingItem.location,
      });

      if (res.data?.success) {
        toast.success("Equipment updated!");
        setEditingItem(null);
        fetchMyEquipments();
      }
    } catch {
      toast.error("Failed to update equipment");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PrivateRoute allowedRoles={["owner"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Inventory Management
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">My Equipment</h1>
          </div>
          <Link
            href="/dashboard/add-equipment"
            className="px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all"
          >
            + Add New
          </Link>
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
            <h3 className="font-extrabold text-lg">No Equipment Listed Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
              Add your first equipment item to start receiving rental bookings.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200/90 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/90 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="py-4 px-5">Equipment Name</th>
                    <th className="py-4 px-5">Category</th>
                    <th className="py-4 px-5">Rental Price</th>
                    <th className="py-4 px-5">Quantity</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-800/80">
                  {equipments.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-[var(--foreground)]">{item.name}</td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)]">{item.category}</td>
                      <td className="py-4 px-5 font-extrabold text-[#059669] dark:text-[#10B981]">
                        ৳{item.rentalPrice.toLocaleString()}/{item.rentalType}
                      </td>
                      <td className="py-4 px-5 text-xs text-[var(--muted-foreground)]">{item.availableQuantity} units</td>
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
                      <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                        <Link
                          href={`/equipment/${item._id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#059669] hover:text-white dark:hover:bg-[#059669] text-xs font-bold transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Link>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold cursor-pointer transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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

        {/* Update Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h2 className="font-extrabold text-lg">Update Equipment</h2>
                <button onClick={() => setEditingItem(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Equipment Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Rental Price (৳)</label>
                    <input
                      type="number"
                      required
                      value={editingItem.rentalPrice}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, rentalPrice: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Available Quantity</label>
                    <input
                      type="number"
                      required
                      value={editingItem.availableQuantity}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          availableQuantity: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
