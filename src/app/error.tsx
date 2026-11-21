"use client";

import Link from "next/link";
import { RefreshCcw, Home, ShieldAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--background)]">
      <div className="p-4 rounded-2xl bg-red-500/10 text-red-500 mb-4">
        <ShieldAlert className="h-12 w-12" />
      </div>
      <h1 className="text-2xl font-extrabold">Something Went Wrong</h1>
      <p className="text-sm text-[var(--muted-foreground)] max-w-md mt-2">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm cursor-pointer"
        >
          <RefreshCcw className="h-4 w-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] font-semibold text-sm"
        >
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}