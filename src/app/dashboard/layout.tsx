"use client";

import { useState } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Menu, Layers } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <PrivateRoute>
      <div className="min-h-screen flex w-full bg-[var(--background)]">
        <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Top Header */}
          <header className="lg:hidden h-16 px-4 bg-[#111827] dark:bg-[#030712] text-white border-b border-gray-800 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#059669]">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">AssetLoop Dashboard</span>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg bg-gray-800 text-gray-200"
            >
              <Menu className="h-5 w-5" />
            </button>
          </header>

          {/* Main Dashboard Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}