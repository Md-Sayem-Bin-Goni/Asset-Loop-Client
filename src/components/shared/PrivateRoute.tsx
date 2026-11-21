"use client";

import { useAuth } from "@/providers/AuthProvider";
import { UserRole } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

function PrivateRouteGuard({ children, allowedRoles }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace("/dashboard");
      }
    }
  }, [user, isLoading, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-500/30 border-t-emerald-600 animate-spin" />
        <p className="text-sm text-muted-foreground">Verifying session...</p>
      </div>
    );
  }

  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-emerald-500/30 border-t-emerald-600 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <PrivateRouteGuard {...props} />
    </Suspense>
  );
}