"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosSecure from "@/lib/axiosSecure";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CheckCircle2, Loader2, ArrowRight, Receipt } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !bookingId) {
        setError("Missing payment session information.");
        setLoading(false);
        return;
      }

      try {
        const res = await axiosSecure.post("/bookings/verify-payment", {
          sessionId,
          bookingId,
        });
        if (res.data?.success) {
          setBooking(res.data.booking);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Could not verify payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, bookingId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-10 w-10 text-[#059669] animate-spin" />
        <p className="text-sm font-medium">Verifying your Stripe payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[var(--card)] border border-red-500/30 text-center space-y-4">
        <h2 className="text-xl font-bold text-red-500">Payment Verification Failed</h2>
        <p className="text-sm text-[var(--muted-foreground)]">{error}</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] text-white text-sm font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-16 px-4">
      <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-[#059669]/15 text-[#059669] flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">Payment Successful!</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Your equipment rental booking is confirmed and recorded.
          </p>
        </div>

        {booking && (
          <div className="p-4 rounded-2xl bg-[var(--secondary)]/60 border border-[var(--border)] text-left text-xs space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-sm text-[#059669] pb-1 border-b border-[var(--border)]">
              <Receipt className="h-4 w-4" /> Booking Receipt
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Equipment:</span>
              <span className="font-semibold">{booking.equipmentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Rental Period:</span>
              <span className="font-semibold">{booking.startDate} to {booking.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Quantity:</span>
              <span className="font-semibold">{booking.requiredQuantity} unit(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Transaction ID:</span>
              <span className="font-mono text-[11px]">{booking.transactionId}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--border)] text-sm font-bold">
              <span>Total Paid:</span>
              <span className="text-[#059669]">৳{booking.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Link
          href="/dashboard"
          className="w-full py-3 px-5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
        >
          View My Rentals in Dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-sm">Loading receipt...</div>}>
          <PaymentSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}