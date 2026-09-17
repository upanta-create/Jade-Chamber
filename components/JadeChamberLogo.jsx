import React from 'react';

export default function JadeChamberLogo({ size = 42, showText = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Contrast Jade Crest Icon */}
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-0.5 shadow-md shadow-emerald-700/20 ring-1 ring-emerald-500/40"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Outer Diamond/Pagoda Foundation */}
          <path
            d="M24 4L42 16V32L24 44L6 32V16L24 4Z"
            stroke="#FDE68A"
            strokeWidth="2"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
          {/* Inner Chamber Pavilion Rites */}
          <path
            d="M24 10L36 18V28L24 38L12 28V18L24 10Z"
            fill="#047857"
            stroke="#34D399"
            strokeWidth="1.5"
          />
          {/* Celestial Apex Tier */}
          <path
            d="M18 19L24 14L30 19M16 25L24 20L32 25M24 21V31"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Gold Core Gem */}
          <circle cx="24" cy="25" r="3.5" fill="#F59E0B" stroke="#FFFBEB" strokeWidth="1" />
          {/* Subtle Star Spark */}
          <path
            d="M24 6V9M24 39V42M8 24H11M37 24H40"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Jade <span className="text-emerald-600">Chamber</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded uppercase tracking-wider">
              B2B / Multi-Vendor
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono tracking-wider mt-0.5">
            GitOps & DevSecOps Platform
          </span>
        </div>
      )}
    </div>
  );
}
