'use client';

import React from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const BestSelling = () => {
  const displayQuantity = 8;
  const products = useSelector((state) => state.product.list);

  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title
        title="Featured Multi-Vendor Essentials"
        description="Top-selling developer workstations, high-fidelity wireless audio, and minimalist lifestyle gear."
        href="/shop"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {products
          .slice()
          .sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
          .slice(0, displayQuantity)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSelling;