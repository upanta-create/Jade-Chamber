'use client';

import React from 'react';

const Loading = ({ text = 'Synchronizing Jade Chamber Marketplace...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Animated Multi-Ring Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 border-r-teal-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-500 animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
        <div className="absolute inset-5 rounded-full bg-emerald-600/20 animate-pulse"></div>
      </div>

      {/* Status Text & Pulsing Dots */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-semibold text-slate-700 tracking-wide">{text}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
        </div>
      </div>

      {/* Observability Footprint Badge */}
      <span className="text-[11px] font-mono text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
        Redis Cache-Aside • Sub-5ms Target
      </span>
    </div>
  );
};

export default Loading;