'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Sparkles, X } from 'lucide-react';

export default function Banner() {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClaim = () => {
    setIsOpen(false);
    toast.success('Promotional Coupon "JADE20" copied to clipboard!');
    navigator.clipboard.writeText('JADE20');
  };

  return (
    isOpen && (
      <div className="w-full px-4 py-2 font-medium text-xs text-white bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 shadow-xs">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span className="tracking-wide">
              <strong className="text-amber-300 font-semibold">Special Offer:</strong> Claim 20% OFF across all verified vendors with coupon code{' '}
              <code className="bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded font-mono font-bold">
                JADE20
              </code>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClaim}
              type="button"
              className="font-semibold text-[11px] text-slate-900 bg-amber-300 hover:bg-amber-200 px-3.5 py-1 rounded-full shadow-sm max-sm:hidden transition cursor-pointer"
            >
              Claim Coupon
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close announcement banner"
              className="text-white/70 hover:text-white transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}