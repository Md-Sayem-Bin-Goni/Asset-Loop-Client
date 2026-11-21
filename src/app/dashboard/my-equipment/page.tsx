"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Equipment } from "@/types";
import { toast } from "sonner";
import { Loader2, Package, Edit, Trash2, Eye, X } from "lucide-react";

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
            className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold"
          >
            + Add New
          </Link>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : equipments.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
            <Package className="h-10 w-10 text-[#059669] mx-auto" />
            <h3 className="font-bold text-lg">No Equipment Listed Yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Add your first equipment item to start receiving rental bookings.
            </p>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-xs uppercase text-[var(--muted-foreground)]">
                    <th className="py-3.5 px-4 font-semibold">Equipment Name</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Rental Price</th>
                    <th className="py-3.5 px-4 font-semibold">Quantity</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {equipments.map((item) => (
                    <tr key={item._id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">{item.name}</td>
                      <td className="py-3.5 px-4 text-xs">{item.category}</td>
                      <td className="py-3.5 px-4 font-bold text-[#059669]">
                        ৳{item.rentalPrice.toLocaleString()}/{item.rentalType}
                      </td>
                      <td className="py-3.5 px-4 text-xs">{item.availableQuantity}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Approved"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : item.status === "Rejected"
                              ? "bg-red-500/15 text-red-600"
                              : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <Link
                          href={`/equipment/${item._id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--secondary)] hover:bg-[#059669] hover:text-white text-xs font-medium transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Link>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-semibold cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-semibold cursor-pointer"
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
            <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h2 className="font-bold text-lg">Update Equipment</h2>
                <button onClick={() => setEditingItem(null)} className="cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold mb-1">Equipment Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm"
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
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm"
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
                      className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm"
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
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-transparent text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm cursor-pointer"
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