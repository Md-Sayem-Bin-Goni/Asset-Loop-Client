"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axiosSecure from "@/lib/axiosSecure";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { PlatformUser, UserRole } from "@/types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, Users, Trash2, Shield } from "lucide-react";

export default function AllUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      if (res.data?.success) {
        setUsers(res.data.users);
      }
    } catch (err: unknown) {
      let message = "Failed to fetch users.";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      if (res.data?.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole as UserRole } : u))
        );
        toast.success(`User role updated to ${newRole.toUpperCase()}`);
      }
    } catch (err: unknown) {
      let message = "Failed to update user role.";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axiosSecure.delete(`/users/${userId}`);
      if (res.data?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success("User deleted successfully.");
      }
    } catch (err: unknown) {
      let message = "Failed to delete user.";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    }
  };

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Access Control
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">All Platform Users</h1>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader2 className="h-8 w-8 text-[#059669] animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-2xl bg-white dark:bg-gray-900/60 border border-dashed border-gray-300 dark:border-gray-800 text-center space-y-3 shadow-xs">
            <div className="h-14 w-14 rounded-2xl bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="font-extrabold text-lg">No Users Found</h3>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200/90 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/90 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Current Role</th>
                    <th className="py-4 px-5">Change Role</th>
                    <th className="py-4 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-800/80">
                  {users.map((u) => {
                    const isSelf = u.email === currentUser?.email;
                    return (
                      <tr key={u._id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors">
                        <td className="py-4 px-5 flex items-center gap-3.5">
                          <Image
                            src={
                              u.image ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "U")}&background=059669&color=fff`
                            }
                            alt={u.name}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-gray-800 shrink-0 shadow-xs"
                          />
                          <span className="font-bold text-[var(--foreground)]">{u.name}</span>
                        </td>
                        <td className="py-4 px-5 text-xs text-[var(--muted-foreground)]">{u.email}</td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              u.role === "admin"
                                ? "bg-purple-500/15 text-purple-700 dark:text-purple-400"
                                : u.role === "owner"
                                ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            }`}
                          >
                            <Shield className="h-3 w-3" /> {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <select
                            disabled={isSelf}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-xs font-bold disabled:opacity-50 cursor-pointer shadow-xs"
                          >
                            <option value="customer">Customer</option>
                            <option value="owner">Owner</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <button
                            disabled={isSelf}
                            onClick={() => handleDeleteUser(u._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 disabled:opacity-40 text-red-600 text-xs font-bold cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
