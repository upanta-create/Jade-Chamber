'use client';

import Counter from '@/components/Counter';
import OrderSummary from '@/components/OrderSummary';
import { deleteItemFromCart } from '@/lib/features/cart/cartSlice';
import { Trash2Icon, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  const { cartItems } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.list);
  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDeleteItemFromCart = (productId) => {
    dispatch(deleteItemFromCart({ productId }));
  };

  useEffect(() => {
    let count = 0;
    let price = 0;
    const cartArr = [];

    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const product = products.find((p) => p.id === key);
        if (product) {
          cartArr.push({
            ...product,
            quantity: cartItems[key],
          });
          count += cartItems[key];
          price += product.price * cartItems[key];
        }
      }
    }

    setCartArray(cartArr);
    setTotalPrice(price);
  }, [cartItems, products]);

  return cartArray.length > 0 ? (
    <div className="min-h-[75vh] mx-6">
      <div className="max-w-7xl mx-auto py-8">
        <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              Shopping Cart
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Review your multi-vendor items before proceeding to secure order dispatch.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold"
          >
            <Sparkles size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="flex items-start justify-between gap-8 max-lg:flex-col">
          {/* Items Table */}
          <div className="w-full max-w-4xl overflow-x-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <table className="w-full text-slate-700 text-xs table-auto">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase">
                  <th className="text-left pb-3 font-semibold">Product</th>
                  <th className="text-center pb-3 font-semibold">Quantity</th>
                  <th className="text-center pb-3 font-semibold">Total</th>
                  <th className="text-center pb-3 font-semibold max-md:hidden">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cartArray.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 border border-slate-200 p-1.5 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                          <Image
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
                            className="max-h-12 w-auto object-cover rounded-lg"
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{item.name}</p>
                          <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-0.5">
                            {item.category}
                          </span>
                          <p className="text-xs text-slate-500 font-sans mt-1">
                            {currency} {Number(item.price).toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4">
                      <Counter productId={item.id} />
                    </td>
                    <td className="text-center py-4 font-bold text-slate-900 text-sm">
                      {currency} {(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="text-center py-4 max-md:hidden">
                      <button
                        onClick={() => handleDeleteItemFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2Icon size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <OrderSummary totalPrice={totalPrice} items={cartArray} />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[70vh] mx-6 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
        <ShoppingBag size={28} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h2>
      <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed font-normal">
        You haven&apos;t added any products to your cart yet. Explore our verified multi-vendor marketplace to discover computing, audio, and apparel gear.
      </p>
      <Link
        href="/shop"
        className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition"
      >
        Explore Product Catalog
      </Link>
    </div>
  );
}