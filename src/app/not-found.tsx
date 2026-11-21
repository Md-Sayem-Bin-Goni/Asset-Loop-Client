import Link from "next/link";
import { Layers, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--background)]">
      <div className="p-4 rounded-2xl bg-[#059669]/10 text-[#059669] mb-4">
        <AlertTriangle className="h-12 w-12" />
      </div>
      <h1 className="text-6xl font-black tracking-tight text-[#059669]">404</h1>
      <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
      <p className="text-sm text-[var(--muted-foreground)] max-w-md mt-2">
        The equipment or page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm transition-colors"
      >
        <Home className="h-4 w-4" /> Back to AssetLoop Home
      </Link>
    </div>
  );
}