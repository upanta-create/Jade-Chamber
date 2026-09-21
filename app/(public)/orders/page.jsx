'use client';

import { useEffect, useState } from 'react';
import OrderItem from '@/components/OrderItem';
import { dummyOrders } from '@/assets/assets';
import Link from 'next/link';
import { Sparkles, PackageCheck } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setOrders(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to query orders API:', err);
      }
      setOrders(dummyOrders);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-[75vh] mx-6">
      <div className="max-w-7xl mx-auto py-8">
        <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              My Orders
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Showing {orders.length} active or fulfilled multi-vendor dispatch orders.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold"
          >
            <Sparkles size={14} /> Back to Home
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-slate-700 text-xs table-auto border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-500 font-mono text-[11px] uppercase">
                  <th className="text-left pb-2 pl-4">Product Item</th>
                  <th className="text-center pb-2 max-md:hidden">Total Amount</th>
                  <th className="text-left pb-2 max-md:hidden">Delivery Destination</th>
                  <th className="text-center pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderItem order={order} key={order.id} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
            <PackageCheck size={32} className="text-emerald-600 mb-3" />
            <h2 className="text-xl font-bold text-slate-900">No Active Orders</h2>
            <p className="text-xs text-slate-500 mt-1">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/shop"
              className="mt-5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition shadow-xs"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}