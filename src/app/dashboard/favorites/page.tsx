"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { FavoriteItem } from "@/types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, Heart, Trash2, ExternalLink } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/favorites");
      if (res.data?.success) {
        setFavorites(res.data.favorites);
      }
    } catch (error: unknown) {
      console.error("Failed to load favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      if (res.data?.success) {
        setFavorites((prev) => prev.filter((item) => item._id !== id));
        toast.success("Removed from favorites");
      }
    } catch (err: unknown) {
      let message = "Failed to remove item";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    }
  };

  return (
    <PrivateRoute allowedRoles={["customer"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Saved Items
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">My Favorites</h1>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--border)] text-center space-y-2">
            <Heart className="h-10 w-10 text-rose-500 mx-auto" />
            <h3 className="font-bold text-lg">No Favorites Saved</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Click &ldquo;Add to Favorites&rdquo; on any equipment page to save it here.
            </p>
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-xs uppercase text-[var(--muted-foreground)]">
                    <th className="py-3.5 px-4 font-semibold">Equipment</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Location</th>
                    <th className="py-3.5 px-4 font-semibold">Rental Rate</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {favorites.map((fav) => (
                    <tr key={fav._id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={fav.image}
                          alt={fav.equipmentName}
                          className="h-10 w-12 rounded-lg object-cover border border-[var(--border)] shrink-0"
                        />
                        <span className="font-semibold">{fav.equipmentName}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs">{fav.category}</td>
                      <td className="py-3.5 px-4 text-xs">{fav.location}</td>
                      <td className="py-3.5 px-4 font-bold text-[#059669]">
                        ৳{Number(fav.rentalPrice).toLocaleString()} / {fav.rentalType}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/equipment/${fav.equipmentId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> View
                        </Link>
                        <button
                          onClick={() => handleRemove(fav._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-semibold cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
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
