'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { assets, categoriesData } from '@/assets/assets';
import { Sparkles, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StoreAddProduct() {
  const router = useRouter();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '✦ ';

  const [loading, setLoading] = useState(false);
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    mrp: '',
    price: '',
    category: 'Adepti Relics',
    imageUrl: '',
    inStock: true,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Convert file to base64 Data URL (saved directly in database, not local disk)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size exceeds 2MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProductInfo((prev) => ({ ...prev, imageUrl: reader.result }));
      toast.success('Image encoded into database payload');
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!productInfo.name.trim() || !productInfo.price) {
      toast.error('Please fill in product name and price');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: productInfo.name.trim(),
        description: productInfo.description.trim(),
        category: productInfo.category,
        mrp: parseFloat(productInfo.mrp) || parseFloat(productInfo.price),
        price: parseFloat(productInfo.price),
        images: productInfo.imageUrl
          ? [productInfo.imageUrl]
          : ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800'],
        inStock: productInfo.inStock,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`"${payload.name}" chartered to Jade Chamber!`);
        router.push('/store/manage-product');
      } else {
        toast.error(data.error || 'Failed to register product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error registering artifact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <Link
        href="/store/manage-product"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6 transition"
      >
        <ArrowLeft size={14} /> Back to Products Ledger
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              Commission New <span className="text-amber-600">Artifact</span>
            </h1>
            <p className="text-xs text-slate-500">
              Artifact specifications and imagery are stored directly in PostgreSQL database records.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
          {/* Artifact Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Artifact Title *
            </label>
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={productInfo.name}
              placeholder="e.g. Celestial Glaze Lily Brooch"
              className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none"
              required
            />
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="category"
                onChange={onChangeHandler}
                value={productInfo.category}
                className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none bg-white"
                required
              >
                {categoriesData.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-slate-200 rounded-xl hover:bg-slate-50">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={productInfo.inStock}
                  onChange={onChangeHandler}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-700">Immediate Stall Availability</span>
              </label>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Offer Price ({currency}) *
              </label>
              <input
                type="number"
                name="price"
                onChange={onChangeHandler}
                value={productInfo.price}
                placeholder="2400"
                className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Original Price ({currency})
              </label>
              <input
                type="number"
                name="mrp"
                onChange={onChangeHandler}
                value={productInfo.mrp}
                placeholder="3000"
                className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Description & Provenance
            </label>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={productInfo.description}
              rows={4}
              placeholder="Describe the artifact's background, artisan touch, and Adeptal properties..."
              className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none resize-none"
            />
          </div>

          {/* Product Image Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Product Image (Stored in DB)
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2.5 py-1 rounded-md font-mono transition ${
                    imageMode === 'url' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Hosted Web URL
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2.5 py-1 rounded-md font-mono transition ${
                    imageMode === 'upload' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  File Upload
                </button>
              </div>
            </div>

            {imageMode === 'url' ? (
              <input
                type="url"
                name="imageUrl"
                onChange={onChangeHandler}
                value={productInfo.imageUrl}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:border-amber-500 outline-none"
              />
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-6 cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100/60">
                <Upload size={24} className="text-slate-400 mb-1" />
                <span className="text-xs text-slate-600 font-medium">Select image file to encode into database</span>
                <span className="text-[10px] text-slate-400">PNG, JPG, WebP up to 2MB</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            )}

            {productInfo.imageUrl && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={productInfo.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800">Image Attached for Database Record</p>
                  <p className="text-[10px] text-slate-400 truncate">{productInfo.imageUrl}</p>
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-slate-950 font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 text-sm"
            >
              {loading ? 'Chartering to Ledger...' : 'Commission Artifact into Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}