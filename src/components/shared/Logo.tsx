"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "iconOnly" | "vertical";
  clickable?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105`}
      aria-hidden="true"
    >
      <defs>
        {/* Dark Emerald Squircle Base Gradient */}
        <linearGradient
          id="assetloop-bg-grad"
          x1="0"
          y1="0"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0A1612" />
          <stop offset="60%" stopColor="#052E20" />
          <stop offset="100%" stopColor="#042017" />
        </linearGradient>

        {/* Primary Over-Strand (Vibrant Mint to Emerald Gradient) */}
        <linearGradient
          id="loop-front-grad"
          x1="6"
          y1="14"
          x2="38"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="45%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Secondary Under-Strand (Deep Emerald Gradient with Shadow Depth) */}
        <linearGradient
          id="loop-back-grad"
          x1="38"
          y1="14"
          x2="6"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#059669" />
          <stop offset="55%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* 3D Overlap Drop Shadow */}
        <filter id="loop-cross-shadow" x="14" y="14" width="16" height="16" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* Rounded Squircle Container with Subtle Emerald Glow Border */}
      <rect
        width="44"
        height="44"
        rx="12"
        fill="url(#assetloop-bg-grad)"
        stroke="#10B981"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />

      {/* Subtle Inner Radial Ambient Light */}
      <circle cx="22" cy="22" r="14" fill="#10B981" fillOpacity="0.12" />

      {/* Under-Strand of the Continuous Infinity Loop */}
      <path
        d="M 22 22 C 26.5 15, 36.5 15, 36.5 22 C 36.5 29, 26.5 29, 22 22 C 17.5 15, 7.5 15, 7.5 22"
        stroke="url(#loop-back-grad)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Over-Strand of the Infinity Loop (Crosses through center with realistic 3D depth) */}
      <path
        d="M 7.5 22 C 7.5 29, 17.5 29, 22 22 C 26.5 15, 36.5 15, 36.5 22"
        stroke="url(#loop-front-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#loop-cross-shadow)"
      />

      {/* Glowing Center Hub / Connection Spark */}
      <circle cx="22" cy="22" r="2" fill="#FFFFFF" />
      <circle cx="22" cy="22" r="3.2" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.8" />
    </svg>
  );
}

export default function Logo({
  size = "md",
  variant = "full",
  clickable = true,
  className = "",
  iconClassName = "",
  textClassName = "",
}: LogoProps) {
  const sizeMap = {
    sm: { icon: "h-7 w-7", text: "text-lg" },
    md: { icon: "h-9 w-9", text: "text-xl" },
    lg: { icon: "h-11 w-11", text: "text-2xl" },
    xl: { icon: "h-14 w-14", text: "text-3xl" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div
      className={`inline-flex items-center gap-2.5 transition-all group select-none ${
        variant === "vertical" ? "flex-col gap-2 text-center" : "flex-row"
      } ${className}`}
    >
      <LogoIcon className={`${currentSize.icon} ${iconClassName}`} />
      {variant !== "iconOnly" && (
        <span
          className={`font-black tracking-tight leading-none text-[#111827] dark:text-white ${currentSize.text} ${textClassName}`}
        >
          Asset
          <span className="bg-gradient-to-r from-[#059669] to-[#10B981] bg-clip-text text-transparent">
            Loop
          </span>
        </span>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" className="inline-block cursor-pointer" aria-label="AssetLoop Home">
        {content}
      </Link>
    );
  }

  return content;
}
