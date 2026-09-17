'use client';

import { ArrowRightIcon, ChevronRightIcon, Sparkles, Cpu, Shirt, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CategoriesMarquee from './CategoriesMarquee';

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-8">
        {/* Main Modern SaaS Marketplace Banner */}
        <div className="relative flex-1 flex flex-col bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 border border-slate-200/80 rounded-3xl xl:min-h-100 overflow-hidden shadow-sm group">
          <div className="p-6 sm:p-12 z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 pr-4 p-1 rounded-full text-xs font-mono mb-4">
              <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wide">
                MULTI-VENDOR PLATFORM
              </span>
              Argo Rollouts Canary v1.0.0 Active <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" size={14} />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.12] font-extrabold tracking-tight text-slate-900 max-w-2xl">
              The Enterprise Multi-Vendor{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-4 leading-relaxed font-normal">
              Curating verified independent retailers across consumer electronics, developer workstations, ergonomic living, and smart athletic wearables.
            </p>

            <div className="text-slate-600 text-xs font-mono mt-6 flex items-center gap-3">
              <span className="text-slate-500 font-medium">Catalog prices starting from:</span>
              <span className="text-2xl font-bold text-emerald-700 flex items-center gap-1 font-sans">
                {currency} 6,490
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Redis Cached
              </span>
            </div>

            <div className="flex flex-wrap gap-3.5 mt-8">
              <Link
                href="/shop"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-7 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                EXPLORE ALL PRODUCTS
              </Link>
              <Link
                href="/store"
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-emerald-500 text-xs sm:text-sm py-3 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                BECOME A VENDOR
              </Link>
            </div>
          </div>

          {/* Decorative ambient subtle gradient orbs */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-10 top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Side Feature Highlights (Text-Only Brand Badges, No Store Images) */}
        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm">
          <Link
            href="/shop?category=Computing"
            className="flex-1 flex items-center justify-between w-full bg-white border border-slate-200 hover:border-emerald-500/60 rounded-3xl p-6 px-7 group transition-all shadow-xs hover:shadow-md"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Apex Electronics Hub
              </span>
              <p className="text-lg font-bold text-slate-900 mt-2">Computing & Audio</p>
              <p className="flex items-center gap-1 mt-2.5 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                Browse Workstations <ArrowRightIcon size={14} />
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Cpu className="text-emerald-600" size={24} />
            </div>
          </Link>

          <Link
            href="/shop?category=Fashion"
            className="flex-1 flex items-center justify-between w-full bg-white border border-slate-200 hover:border-emerald-500/60 rounded-3xl p-6 px-7 group transition-all shadow-xs hover:shadow-md"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Urban Aura Studio
              </span>
              <p className="text-lg font-bold text-slate-900 mt-2">Merino Wool Apparel</p>
              <p className="flex items-center gap-1 mt-2.5 text-xs font-semibold text-teal-600 group-hover:gap-2 transition-all">
                View Collection <ArrowRightIcon size={14} />
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
              <Shirt className="text-teal-600" size={24} />
            </div>
          </Link>
        </div>
      </div>

      <CategoriesMarquee />
    </div>
  );
};

export default Hero;