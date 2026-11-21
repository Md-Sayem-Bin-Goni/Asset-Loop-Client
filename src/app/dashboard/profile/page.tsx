"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import axiosSecure from "@/lib/axiosSecure";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import { toast } from "sonner";
import { UserCircle, Mail, Phone, MapPin, Save, Loader2, Upload } from "lucide-react";

export default function ProfilePage() {
  const { user, refetchUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      let finalImage = imageUrl;

      if (imageFile) {
        finalImage = await uploadImageToImgBB(imageFile);
      }

      const res = await axiosSecure.put("/users/profile", {
        name,
        phone,
        address,
        image: finalImage,
      });

      if (res.data?.success) {
        await refetchUser();
        setImageFile(null);
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
          Account Settings
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight mt-1">My Profile</h1>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-6">
        {/* Avatar Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[var(--border)]">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=059669&color=fff`
            }
            alt={name}
            className="h-20 w-20 rounded-full object-cover border-2 border-[#059669]"
          />
          <div>
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <p className="text-xs text-[var(--muted-foreground)]">{user?.email}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#059669]/15 text-[#059669]">
              Role: {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <UserCircle className="h-3.5 w-3.5 text-[#059669]" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#059669]" /> Email (Read-Only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/60 text-sm opacity-75 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#059669]" /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 17XX-XXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5 text-[#059669]" /> Update Photo (ImgBB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#059669]/15 file:text-[#059669] border border-[var(--border)] rounded-xl p-1.5 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#059669]" /> Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area, District (e.g. Dhanmondi, Dhaka)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-60 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving Changes..." : "Save Profile Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}