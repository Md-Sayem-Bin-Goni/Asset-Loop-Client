"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import axiosSecure from "@/lib/axiosSecure";
import { useAuth } from "@/providers/AuthProvider";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { isAxiosError } from "axios";

import { Equipment, FavoriteItem } from "@/types";
import { toast } from "sonner";
import {
  MapPin,
  Tag,
  Heart,
  Calendar,
  ShieldCheck,
  User,
  Mail,
  Package,
  X,
  CreditCard,
  Loader2,
  CheckCircle2,
  FileText,
} from "lucide-react";

function EquipmentDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const { user } = useAuth();

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Booking Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState(1);
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment") === "cancelled") {
      toast.error("Payment was cancelled. You can try booking again anytime.");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/equipments/${id}`);
        if (res.data?.success) {
          setEquipment(res.data.equipment);
        }
      } catch (error: unknown) {
        toast.error("Failed to load equipment details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  // Check on mount whether this equipment already exists in customer's favorites
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || user.role !== "customer") return;
      try {
        const res = await axiosSecure.get("/favorites");
        if (res.data?.success && Array.isArray(res.data.favorites)) {
          const found = res.data.favorites.some(
            (fav: FavoriteItem) =>
              fav.equipmentId === id ||
              (fav as unknown as { equipmentId?: { _id?: string } }).equipmentId?._id === id ||
              fav._id === id
          );
          setIsFavorite(found);
        }
      } catch (err: unknown) {
        // Silently catch
      }
    };

    if (id && user) {
      checkFavorite();
    }
  }, [id, user]);

  // Automatic Total Rental Calculation based on dates, rentalType, and quantity
  const { durationUnits, totalAmount } = useMemo(() => {
    if (!equipment || !startDate || !endDate) {
      return { durationUnits: 1, totalAmount: equipment ? equipment.rentalPrice * requiredQuantity : 0 };
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    let units = diffDays;
    if (equipment.rentalType === "Weekly") {
      units = Math.max(1, Math.ceil(diffDays / 7));
    } else if (equipment.rentalType === "Monthly") {
      units = Math.max(1, Math.ceil(diffDays / 30));
    }

    return {
      durationUnits: units,
      totalAmount: units * equipment.rentalPrice * requiredQuantity,
    };
  }, [equipment, startDate, endDate, requiredQuantity]);

  const handleAddToFavorites = async () => {
    if (!equipment) return;
    if (user?.role !== "customer") {
      return toast.error("Only Customer accounts can save items to Favorites.");
    }

    try {
      setFavLoading(true);
      const res = await axiosSecure.post("/favorites", { equipmentId: equipment._id });
      if (res.data?.success) {
        setIsFavorite(true);
        toast.success("Saved to your Favorites!");
      }
    } catch (err: unknown) {
      let message = "Could not add to favorites.";
      if (isAxiosError(err)) {
        if (err.response?.data?.message === "Already added to favorites") {
          setIsFavorite(true);
        }
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setFavLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipment) return;

    if (user?.role !== "customer") {
      return toast.error("Only Customer accounts can book equipment.");
    }
    if (!startDate || !endDate) {
      return toast.error("Please select both start and end dates.");
    }
    if (new Date(endDate) < new Date(startDate)) {
      return toast.error("End date cannot be earlier than start date.");
    }
    if (requiredQuantity < 1 || requiredQuantity > equipment.availableQuantity) {
      return toast.error(`Please choose between 1 and ${equipment.availableQuantity} units.`);
    }

    try {
      setBookingLoading(true);
      const res = await axiosSecure.post("/bookings/checkout", {
        equipmentId: equipment._id,
        startDate,
        endDate,
        requiredQuantity,
        contactNumber,
        deliveryAddress,
        notes,
        totalAmount,
      });

      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }
    } catch (err: unknown) {
      let message = "Failed to initiate Stripe checkout.";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="h-96 rounded-3xl bg-[var(--card)] border border-[var(--border)] animate-pulse" />
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Equipment Not Found</h2>
      </div>
    );
  }

  const isAvailable = equipment.availableQuantity > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Equipment Image & Terms */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src={equipment.image}
              alt={equipment.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>

          {/* Rental Terms & Conditions */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] flex items-center gap-2">
              <FileText className="h-4 w-4" /> Rental Terms &amp; Conditions
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
              {equipment.terms || "Standard AssetLoop rental terms apply. Equipment must be returned in original working condition."}
            </p>
          </div>
        </div>

        {/* Right: Equipment Info, Owner & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981] flex items-center gap-1.5 shadow-xs">
                <Tag className="h-3.5 w-3.5" /> {equipment.category}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs ${
                  isAvailable
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-700 dark:text-red-400"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {isAvailable ? `${equipment.availableQuantity} Units Available` : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{equipment.name}</h1>

            <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#059669] dark:text-[#10B981]" /> {equipment.location}
            </p>
          </div>

          {/* Pricing Callout Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">Rental Rate</p>
              <p className="text-3xl sm:text-4xl font-black text-[#059669] dark:text-[#10B981] mt-1">
                ৳{equipment.rentalPrice.toLocaleString()}
                <span className="text-sm font-semibold text-[var(--muted-foreground)]">
                  {" "}
                  / {equipment.rentalType}
                </span>
              </p>
            </div>
            <div className="text-right text-xs text-[var(--muted-foreground)] space-y-1">
              {equipment.brand && <p>Brand: <strong className="text-[var(--foreground)]">{equipment.brand}</strong></p>}
              {equipment.model && <p>Model: <strong className="text-[var(--foreground)]">{equipment.model}</strong></p>}
              {equipment.condition && <p>Condition: <strong className="text-[var(--foreground)]">{equipment.condition}</strong></p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Description
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {equipment.description}
            </p>
          </div>

          {/* Owner Information */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 space-y-2 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Verified Equipment Owner
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="h-10 w-10 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold shadow-xs">
                {equipment.owner?.name?.charAt(0) || "O"}
              </div>
              <div className="text-sm">
                <p className="font-bold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#059669] dark:text-[#10B981]" /> {equipment.owner?.name}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {equipment.owner?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              disabled={!isAvailable}
              onClick={() => setModalOpen(true)}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46] disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              {isAvailable ? "Book Equipment Now" : "Currently Unavailable"}
            </button>

            <button
              onClick={handleAddToFavorites}
              disabled={favLoading || isFavorite}
              className={`py-3.5 px-5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                isFavorite
                  ? "border-rose-200 bg-rose-50/70 dark:border-rose-900/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-[#059669] dark:hover:border-[#10B981]"
              }`}
            >
              <Heart
                className={`h-4 w-4 text-rose-500 ${
                  isFavorite ? "fill-rose-500" : ""
                }`}
              />
              {favLoading
                ? "Saving..."
                : isFavorite
                ? "Saved in Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div>
                <h2 className="text-lg font-bold">Book {equipment.name}</h2>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Complete details below to proceed to Stripe Checkout
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--secondary)] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold mb-1">Rental Start Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Rental End Date</label>
                  <input
                    type="date"
                    required
                    min={startDate || new Date().toISOString().split("T")[0]}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Required Quantity (Max: {equipment.availableQuantity})
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={equipment.availableQuantity}
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House/Site address, Road, Area, City"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Additional Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any delivery instructions or operator requirements..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm"
                />
              </div>

              {/* Price Summary Box */}
              <div className="p-4 rounded-xl bg-[#059669]/10 border border-[#059669]/30 flex items-center justify-between">
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-[var(--foreground)]">
                    Estimated Total ({durationUnits} {equipment.rentalType} x {requiredQuantity} unit)
                  </p>
                  <p className="text-[var(--muted-foreground)]">Includes verified rental protection</p>
                </div>
                <p className="text-2xl font-black text-[#059669] dark:text-[#10B981]">৳{totalAmount.toLocaleString()}</p>
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 transition-all"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" /> Confirm &amp; Pay with Stripe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EquipmentDetailsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <PrivateRoute>
          <EquipmentDetailsContent />
        </PrivateRoute>
      </main>
    </div>
  );
}
