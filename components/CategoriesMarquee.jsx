'use client';

import { categories } from '@/assets/assets';
import Link from 'next/link';

const CategoriesMarquee = () => {
  return (
    <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-8 sm:my-12">
      <div className="absolute left-0 top-0 h-full w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="flex min-w-[200%] animate-[marqueeScroll_15s_linear_infinite] sm:animate-[marqueeScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] gap-3">
        {[...categories, ...categories, ...categories, ...categories].map((cat, index) => (
          <Link
            href={`/shop?category=${encodeURIComponent(cat)}`}
            key={index}
            className="px-5 py-2 bg-white border border-slate-200 hover:border-emerald-500 rounded-full text-slate-700 hover:text-emerald-700 text-xs sm:text-sm font-medium hover:bg-emerald-50/50 hover:scale-103 active:scale-95 transition-all duration-200 whitespace-nowrap shadow-xs"
          >
            {cat}
          </Link>
        ))}
      </div>
      <div className="absolute right-0 top-0 h-full w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent" />
    </div>
  );
};

export default CategoriesMarquee;