"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import axiosSecure from "@/lib/axiosSecure";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
  updateUser: (updatedUser: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refetchUser: async () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  const syncUserWithBackend = async () => {
    if (!session?.user?.email) {
      localStorage.removeItem("assetloop-token");
      setUser(null);
      setIsSyncing(false);
      return;
    }

    try {
      setIsSyncing(true);
      const token = localStorage.getItem("assetloop-token");
      if (token) {
        try {
          const profileRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (profileRes.data?.success && profileRes.data?.user) {
            setUser(profileRes.data.user);
            setIsSyncing(false);
            return;
          }
        } catch {
          // Token expired or invalid, continue to refresh via /auth/jwt
        }
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/jwt`,
        {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image || "",
        }
      );

      if (res.data?.token) {
        localStorage.setItem("assetloop-token", res.data.token);
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Failed to sync user with backend:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const refetchUser = async () => {
    try {
      const res = await axiosSecure.get("/auth/me");
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
        return;
      }
    } catch {
      // Fallback to syncUserWithBackend
    }
    await syncUserWithBackend();
  };

  const updateUser = (updatedUser: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : (updatedUser as UserProfile)));
  };

  useEffect(() => {
    if (!isPending) {
      syncUserWithBackend();
    }
  }, [session?.user?.email, isPending]);

  const isLoading = isPending || isSyncing;

  return (
    <AuthContext.Provider value={{ user, isLoading, refetchUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);