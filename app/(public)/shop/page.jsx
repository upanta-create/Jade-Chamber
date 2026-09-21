'use client';

import { Suspense, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';
import { MoveLeftIcon, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { categories } from '@/assets/assets';

function ShopContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');

  const products = useSelector((state) => state.product.list);

  // Filter products by search query and category
  let filtered = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : product.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0));
  }

  const allCategories = ['All', ...categories];

  return (
    <div className="min-h-[75vh] mx-6">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              {(search || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    router.push('/shop');
                  }}
                  className="text-emerald-600 hover:text-emerald-700 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                >
                  <MoveLeftIcon size={16} /> Reset
                </button>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                Marketplace Catalog
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Showing {filtered.length} of {products.length} verified products across active multi-vendor stores
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-1.5 outline-none cursor-pointer focus:border-emerald-500 shadow-xs"
            >
              <option value="featured">Featured Workstations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {allCategories.map((cat, idx) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  router.push(cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 my-10 shadow-xs">
            <Sparkles size={32} className="mx-auto text-emerald-500/60 mb-3" />
            <p className="text-base font-semibold text-slate-900">No Products Found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No store products matched your search criteria. Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                router.push('/shop');
              }}
              className="mt-4 px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition shadow-xs cursor-pointer"
            >
              View Full Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-32">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<Loading text="Synchronizing product catalog..." />}>
      <ShopContent />
    </Suspense>
  );
}