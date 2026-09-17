'use client';

import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // calculate the average rating of the product
  const rating =
    product.rating && product.rating.length > 0
      ? Math.round(product.rating.reduce((acc, curr) => acc + (curr.rating || 5), 0) / product.rating.length)
      : 5;

  const storeName = product.store?.name || 'Verified Vendor';

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-3 transition-all duration-200 shadow-xs hover:shadow-md max-w-[280px] w-full"
    >
      <div className="relative bg-slate-100/60 h-44 sm:h-52 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
        <Image
          width={500}
          height={500}
          className="max-h-36 sm:max-h-44 w-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
          alt={product.name}
        />
        {product.category && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide bg-white/90 text-emerald-800 border border-slate-200 shadow-xs backdrop-blur-xs">
            {product.category}
          </span>
        )}
      </div>

      <div className="pt-3 pb-1 px-1 flex flex-col justify-between flex-1">
        <div>
          {/* Text-Only Vendor Badge */}
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {storeName}
          </span>

          <p className="font-semibold text-sm text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
            {product.name}
          </p>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center">
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={13}
                    className="text-transparent"
                    fill={rating >= index + 1 ? '#F59E0B' : '#E2E8F0'}
                  />
                ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">({rating}.0)</span>
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between pt-2.5 border-t border-slate-100">
          <div>
            <span className="text-sm sm:text-base font-bold text-slate-900 font-sans">
              {currency} {Number(product.price).toLocaleString()}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
                {currency} {Number(product.mrp).toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-[11px] font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;