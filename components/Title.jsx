'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Title = ({ title, description, visibleButton = true, href = '' }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        {title}
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm text-slate-500 mt-2">
        <p className="max-w-xl text-center font-normal leading-relaxed">{description}</p>
        {visibleButton && href && (
          <Link
            href={href}
            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          >
            Explore All <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Title;