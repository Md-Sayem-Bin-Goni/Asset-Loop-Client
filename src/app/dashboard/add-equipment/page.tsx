"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import axiosSecure from "@/lib/axiosSecure";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { toast } from "sonner";
import { PlusCircle, Upload, Loader2, ShieldCheck } from "lucide-react";

const CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

export default function AddEquipmentPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [rentalType, setRentalType] = useState("Daily");
  const [availableQuantity, setAvailableQuantity] = useState("1");
  const [condition, setCondition] = useState("Excellent");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [terms, setTerms] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      return toast.error("Please select an equipment image to upload.");
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImageToImgBB(imageFile);

      const res = await axiosSecure.post("/equipments", {
        name,
        description,
        category,
        location,
        rentalPrice: Number(rentalPrice),
        rentalType,
        availableQuantity: Number(availableQuantity),
        condition,
        brand,
        model,
        image: imageUrl,
        terms,
      });

      if (res.data?.success) {
        toast.success("Equipment submitted! Status is Pending Admin approval.");
        router.push("/dashboard/my-equipment");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to add equipment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute allowedRoles={["owner"]}>
      <div className="max-w-3xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
            Owner Listing Portal
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">Add New Equipment</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-5"
        >
          {/* Owner Info & Default Status Banner */}
          <div className="p-4 rounded-xl bg-[var(--secondary)]/60 border border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#059669]" />
              <span>
                Listing as: <strong>{user?.name}</strong> ({user?.email})
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 font-bold">
              Initial Status: Pending
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Equipment Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bosch Rotary Hammer GBH 2-26"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Rental Price (৳) *</label>
              <input
                type="number"
                required
                min={1}
                value={rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
                placeholder="1500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Rental Type *</label>
              <select
                value={rentalType}
                onChange={(e) => setRentalType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Available Quantity *</label>
              <input
                type="number"
                required
                min={1}
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Location (City/Area) *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Uttara, Dhaka"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Equipment Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm"
              >
                <option value="Brand New">Brand New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Bosch / Sony / Caterpillar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. FX3 / GBH 2-26"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5 text-[#059669]" /> Equipment Image (ImgBB Upload) *
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#059669]/15 file:text-[#059669] border border-[var(--border)] rounded-xl p-1.5 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe specifications, power capacity, included accessories..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">Rental Terms &amp; Conditions *</label>
            <textarea
              rows={3}
              required
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="e.g. Valid NID copy required at handover. Security deposit or late return rules..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
            {loading ? "Uploading & Submitting..." : "Submit Equipment for Approval"}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}