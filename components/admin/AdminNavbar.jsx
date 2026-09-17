'use client';
import Link from 'next/link';
import JadeChamberLogo from '@/components/JadeChamberLogo';

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-slate-200 bg-white text-slate-800 shadow-xs">
      <Link href="/" className="flex items-center gap-2 group">
        <JadeChamberLogo size={36} showText={true} />
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>DevSecOps Admin Console</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;