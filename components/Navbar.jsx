'use client';

import { Search, ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import JadeChamberLogo from './JadeChamberLogo';

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <nav className="relative bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 sticky top-0 z-40 shadow-xs">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-3.5 transition-all">
          {/* Brand Logo: Jade Chamber (High-Contrast Vector) */}
          <Link href="/" className="group flex items-center hover:opacity-95 transition-opacity">
            <JadeChamberLogo size={42} showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="hover:text-emerald-700 transition-colors">
              Explore Shop
            </Link>
            <Link href="/orders" className="hover:text-emerald-700 transition-colors">
              My Orders
            </Link>
            <Link href="/store" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <Store size={15} className="text-emerald-600" />
              Vendor Portal
            </Link>
            <Link href="/admin" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-teal-600" />
              Admin Console
            </Link>
          </div>

          {/* Right Actions: Search & Cart */}
          <div className="flex items-center gap-3.5">
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center w-64 text-xs gap-2 bg-slate-100 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white px-3.5 py-2 rounded-full transition-all"
            >
              <Search size={15} className="text-slate-400" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-800"
                type="text"
                placeholder="Search electronics, apparel, gear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              <ShoppingBag size={16} className="text-emerald-600" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-emerald-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/store"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Become Seller
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;