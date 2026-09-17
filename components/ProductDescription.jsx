'use client';

import { ArrowRight, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState('Description');

  return (
    <div className="my-16 text-xs sm:text-sm text-slate-300 border-t border-slate-800 pt-10">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-8 max-w-xl">
        {['Description', 'Adeptal Reviews'].map((tab, index) => {
          const isActive = (tab === 'Description' && selectedTab === 'Description') ||
                           (tab === 'Adeptal Reviews' && selectedTab === 'Reviews');
          return (
            <button
              key={index}
              onClick={() => setSelectedTab(tab === 'Description' ? 'Description' : 'Reviews')}
              className={`px-5 py-2.5 font-medium text-xs font-mono transition-all cursor-pointer border-b-2 ${
                isActive
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Description Content */}
      {selectedTab === 'Description' && (
        <div className="max-w-2xl bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 leading-relaxed text-slate-300 font-light">
          <p>{product.description}</p>
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span>Authentication: Certified Genuine</span>
            <span>•</span>
            <span>Origin: Liyue Harbor</span>
            <span>•</span>
            <span>Category: {product.category}</span>
          </div>
        </div>
      )}

      {/* Reviews Content */}
      {selectedTab === 'Reviews' && (
        <div className="space-y-6 max-w-2xl">
          {product.rating?.map((item, index) => (
            <div key={index} className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex gap-4">
              <Image
                src={item.user.image}
                alt=""
                className="size-10 rounded-full border border-amber-500/30 object-cover shrink-0"
                width={80}
                height={80}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-100 text-xs sm:text-sm">{item.user.name}</p>
                  <div className="flex items-center">
                    {Array(5)
                      .fill('')
                      .map((_, idx) => (
                        <StarIcon
                          key={idx}
                          size={13}
                          className="text-transparent"
                          fill={item.rating >= idx + 1 ? '#F59E0B' : '#334155'}
                        />
                      ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 my-2.5 leading-relaxed font-light">{item.review}</p>
                <p className="text-[10px] text-slate-500 font-mono">{new Date(item.createdAt).toDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Merchant Stall Card */}
      {product.store && (
        <div className="flex items-center gap-4 mt-12 p-4 bg-slate-900/50 border border-slate-800 rounded-xl max-w-md">
          <Image
            src={product.store.logo}
            alt=""
            className="size-12 rounded-xl border border-amber-500/30 object-cover"
            width={80}
            height={80}
          />
          <div>
            <span className="text-[10px] font-mono text-amber-400/80 uppercase">Consigned Merchant Guild</span>
            <p className="font-bold text-white text-sm">{product.store.name}</p>
            <Link
              href={`/shop`}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 mt-1 font-medium"
            >
              Visit Guild Stall <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;