"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { Equipment } from "@/types";
import { toast } from "sonner";
import { Loader2, Package, CheckCircle2, XCircle, Trash2 } from "lucide-react";

export default function AdminAllEquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this equipment permanently?")) return;
    try {
      const res = await axiosSecure.delete(`/equipments/${id}`);
      if (res.data?.success) {
        setEquipments((prev) => prev.filter((item) => item._id !== id));
        toast.success("Equipment deleted.");
      }
    } catch {
      toast.error("Failed to delete equipment.");
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
          <div className="p-12 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
            <Package className="h-10 w-10 text-[#059669] mx-auto" />
            <h3 className="font-bold text-lg">No Equipment Submitted Yet</h3>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-xs uppercase text-[var(--muted-foreground)]">
                    <th className="py-3.5 px-4 font-semibold">Equipment</th>
                    <th className="py-3.5 px-4 font-semibold">Owner</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {equipments.map((item) => (
                    <tr key={item._id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-12 rounded-lg object-cover border border-[var(--border)] shrink-0"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-[11px] text-[var(--muted-foreground)]">{item.location}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <p className="font-medium">{item.owner?.name}</p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">{item.owner?.email}</p>
                      </td>
                      <td className="py-3.5 px-4 text-xs">{item.category}</td>
                      <td className="py-3.5 px-4 font-bold text-[#059669]">
                        ৳{item.rentalPrice.toLocaleString()}/{item.rentalType}
                      </td>
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
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {item.status !== "Approved" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "Approved")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-600 text-emerald-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                        )}
                        {item.status !== "Rejected" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "Rejected")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-600 text-amber-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        )}
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
      </div>
    </PrivateRoute>
  );
}