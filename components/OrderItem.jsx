'use client';

import Image from 'next/image';
import { DotIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import { useState } from 'react';
import RatingModal from './RatingModal';
import { productDummyData } from '@/assets/assets';

const OrderItem = ({ order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';
  const [ratingModal, setRatingModal] = useState(null);

  const { ratings } = useSelector((state) => state.rating);

  const statusColors = {
    DELIVERED: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    SHIPPED: 'text-blue-700 bg-blue-50 border-blue-200',
    PROCESSING: 'text-amber-700 bg-amber-50 border-amber-200',
    ORDER_PLACED: 'text-slate-700 bg-slate-100 border-slate-200',
  };

  const statusKey = order.status ? order.status.toUpperCase() : 'ORDER_PLACED';
  const badgeClass = statusColors[statusKey] || statusColors.ORDER_PLACED;

  return (
    <>
      <tr className="bg-white border border-slate-200 text-xs rounded-xl hover:border-slate-300 transition shadow-xs">
        {/* Items */}
        <td className="p-4 rounded-l-xl">
          <div className="flex flex-col gap-4">
            {(order.orderItems || []).map((item, index) => {
              const product = item.product || productDummyData.find((p) => p.id === item.productId) || productDummyData[0];
              const imageSrc = product?.images?.[0] || productDummyData[0].images[0];
              const userRating = ratings?.find(
                (r) => order.id === r.orderId && item.productId === r.productId
              );

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 p-1">
                    <Image
                      className="max-h-12 w-auto object-contain"
                      src={imageSrc}
                      alt="product_img"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{product?.name || 'Verified Product'}</p>
                    <p className="text-slate-600 font-sans mt-0.5">
                      {currency} {Number(item.price || product?.price || 0).toLocaleString()} × {item.quantity}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Ordered on {new Date(order.createdAt).toDateString()}
                    </p>
                    <div className="mt-1">
                      {userRating ? (
                        <Rating value={userRating.rating} />
                      ) : (
                        statusKey === 'DELIVERED' && (
                          <button
                            onClick={() => setRatingModal({ orderId: order.id, productId: item.productId })}
                            className="text-emerald-600 hover:text-emerald-700 transition text-[11px] font-semibold cursor-pointer"
                          >
                            Leave Product Review
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </td>

        {/* Total Price */}
        <td className="text-center p-4 font-sans font-bold text-slate-900 text-sm max-md:hidden">
          {currency} {Number(order.total).toLocaleString()}
        </td>

        {/* Delivery Location */}
        <td className="text-left p-4 text-slate-600 max-md:hidden">
          {order.address ? (
            <div>
              <p className="font-semibold text-slate-900">{order.address.name}</p>
              <p className="text-[11px] text-slate-500">
                {order.address.street}, {order.address.city}
              </p>
              <p className="text-[10px] font-mono text-slate-400">{order.address.phone}</p>
            </div>
          ) : (
            <span className="text-slate-400 font-mono">Standard Delivery</span>
          )}
        </td>

        {/* Status Badge */}
        <td className="text-center p-4 rounded-r-xl">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${badgeClass}`}
          >
            <DotIcon size={16} className="-ml-1" />
            {statusKey.replace('_', ' ')}
          </span>
        </td>
      </tr>

      {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
    </>
  );
};

export default OrderItem;