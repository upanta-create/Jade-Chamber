'use client';

import { addToCart } from '@/lib/features/cart/cartSlice';
import { StarIcon, TagIcon, Sparkles, ShieldCheck, Truck, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Counter from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProductDetails = ({ product }) => {
  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mainImage, setMainImage] = useState(
    product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
  );

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
    toast.success(`"${product.name}" added to cart!`);
  };

  const averageRating =
    product.rating && product.rating.length > 0
      ? (product.rating.reduce((acc, item) => acc + (item.rating || 5), 0) / product.rating.length).toFixed(1)
      : '5.0';

  const storeName = product.store?.name || 'Verified Vendor';

  return (
    <div className="flex max-lg:flex-col gap-12 my-6">
      {/* Gallery Images */}
      <div className="flex max-sm:flex-col-reverse gap-4">
        <div className="flex sm:flex-col gap-3">
          {(product.images || []).map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(image)}
              className={`bg-white border ${
                mainImage === image ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200'
              } flex items-center justify-center size-20 sm:size-24 rounded-xl group cursor-pointer p-2 transition-all shadow-xs`}
            >
              <Image
                src={image}
                className="max-h-16 w-auto object-contain group-hover:scale-105 transition"
                alt=""
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-80 sm:size-104 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <Image
            src={mainImage}
            alt={product.name}
            width={340}
            height={340}
            className="max-h-72 w-auto object-contain"
          />
        </div>
      </div>

      {/* Details Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200">
              {product.category}
            </span>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Store size={12} className="text-emerald-600" /> Sold by {storeName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{product.name}</h1>

          <div className="flex items-center mt-3 gap-2">
            <div className="flex items-center">
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={15}
                    className="text-transparent"
                    fill={averageRating >= index + 1 ? '#F59E0B' : '#E2E8F0'}
                  />
                ))}
            </div>
            <p className="text-xs text-slate-700 font-semibold">{averageRating} / 5.0</p>
            <span className="text-xs text-slate-400">({product.rating?.length || 0} customer reviews)</span>
          </div>

          <div className="flex items-baseline my-6 gap-3">
            <p className="text-3xl font-extrabold text-slate-900 font-sans">
              {currency} {Number(product.price).toLocaleString()}
            </p>
            {product.mrp && product.mrp > product.price && (
              <p className="text-base text-slate-400 line-through font-sans">
                {currency} {Number(product.mrp).toLocaleString()}
              </p>
            )}
          </div>

          {product.mrp && product.mrp > product.price && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg w-fit font-medium">
              <TagIcon size={14} className="text-emerald-600" />
              <p>Special Offer: Save {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}% through direct vendor fulfillment</p>
            </div>
          )}

          <div className="flex items-end gap-5 mt-8">
            {cart[productId] && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-slate-500 font-medium">Quantity</p>
                <Counter productId={productId} />
              </div>
            )}
            <button
              onClick={() => (!cart[productId] ? addToCartHandler() : router.push('/cart'))}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-xs sm:text-sm font-semibold rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={16} />
              {!cart[productId] ? 'Add to Cart' : 'View in Cart'}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 mt-8 space-y-3 text-xs text-slate-500">
          <p className="flex items-center gap-2.5">
            <Truck size={16} className="text-emerald-600 shrink-0" />
            <span>Fast Express Dispatch: Standard free insured delivery across all pin codes</span>
          </p>
          <p className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-teal-600 shrink-0" />
            <span>Verified Vendor Guarantee: 100% genuine manufactured products with warranty</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;