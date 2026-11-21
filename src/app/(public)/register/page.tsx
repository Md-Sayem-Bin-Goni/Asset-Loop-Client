"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import {
  Layers,
  Eye,
  EyeOff,
  Upload,
  Link2,
  Loader2,
  Mail,
  Lock,
  User,
  CheckCircle2,
  XCircle,
  ImagePlus,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { refetchUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [photoMode, setPhotoMode] = useState<"upload" | "url">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Live password checks
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength) {
      return toast.error("Password must be at least 6 characters long.");
    }
    if (!hasUppercase) {
      return toast.error("Password must contain at least one uppercase letter.");
    }
    if (!hasLowercase) {
      return toast.error("Password must contain at least one lowercase letter.");
    }

    try {
      setLoading(true);
      let finalPhotoUrl = imageUrl.trim();

      if (photoMode === "upload") {
        if (!imageFile) {
          setLoading(false);
          return toast.error("Please select a profile photo to upload.");
        }
        finalPhotoUrl = await uploadImageToImgBB(imageFile);
      } else if (!finalPhotoUrl) {
        setLoading(false);
        return toast.error("Please enter a valid profile image URL.");
      }

      const { error } = await signUp.email({
        email: email.trim(),
        password,
        name: name.trim(),
        image: finalPhotoUrl,
      });

      if (error) {
        setLoading(false);
        return toast.error(error.message || "Registration failed. Please try again.");
      }

      await refetchUser();
      toast.success("Account created successfully! Welcome to AssetLoop.");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Ambient Background Accent */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#059669]/10 blur-3xl" />

      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-8 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-[#059669] to-[#047857] text-white shadow-md shadow-emerald-600/20 mb-1">
            <Layers className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Your Account</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Join <span className="font-semibold text-[#059669]">AssetLoop</span> to rent or list equipment across Bangladesh
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all"
              />
            </div>
          </div>

          {/* Profile Photo (Fixed Controlled/Uncontrolled with unique keys) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Profile Photo
              </label>
              <div className="flex items-center gap-1 bg-[var(--secondary)] p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setPhotoMode("upload")}
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                    photoMode === "upload"
                      ? "bg-[#059669] text-white font-medium shadow-xs"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Upload className="h-3 w-3" /> ImgBB
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode("url")}
                  className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                    photoMode === "url"
                      ? "bg-[#059669] text-white font-medium shadow-xs"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Link2 className="h-3 w-3" /> URL
                </button>
              </div>
            </div>

            {photoMode === "upload" ? (
              <label
                key="photo-upload-box"
                className="flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-xl border border-dashed border-[var(--border)] hover:border-[#059669] bg-[var(--secondary)]/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <ImagePlus className="h-5 w-5 text-[#059669] shrink-0" />
                  <span className="text-xs text-[var(--muted-foreground)] truncate">
                    {imageFile ? imageFile.name : "Choose image file (JPG, PNG, WebP)"}
                  </span>
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-8 w-8 rounded-full object-cover border border-[#059669] shrink-0"
                  />
                )}
                <input
                  key="file-input-control"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div key="photo-url-box" className="relative">
                <Link2 className="h-4 w-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  key="url-input-control"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://i.ibb.co/your-photo.jpg"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all"
                />
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Live Password Requirements Checklist */}
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-[11px]">
              <span className={`flex items-center gap-1 ${hasMinLength ? "text-[#059669] font-medium" : "text-[var(--muted-foreground)]"}`}>
                {hasMinLength ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                6+ Chars
              </span>
              <span className={`flex items-center gap-1 ${hasUppercase ? "text-[#059669] font-medium" : "text-[var(--muted-foreground)]"}`}>
                {hasUppercase ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                Uppercase
              </span>
              <span className={`flex items-center gap-1 ${hasLowercase ? "text-[#059669] font-medium" : "text-[var(--muted-foreground)]"}`}>
                {hasLowercase ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                Lowercase
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[var(--card)] px-3 text-[var(--muted-foreground)]">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--secondary)] font-medium text-sm transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
            <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
          </svg>
          Continue with Google
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#059669] hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}