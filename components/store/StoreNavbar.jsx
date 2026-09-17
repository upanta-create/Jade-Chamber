'use client';
import Link from 'next/link';
import JadeChamberLogo from '@/components/JadeChamberLogo';

const StoreNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-slate-200 bg-white text-slate-800 shadow-xs">
      <Link href="/" className="flex items-center gap-2 group">
        <JadeChamberLogo size={36} showText={true} />
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Vendor Management Active</span>
        </div>
      </div>
    </div>
  );
};

export default StoreNavbar;