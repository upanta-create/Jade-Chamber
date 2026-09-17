import React from 'react';
import Title from './Title';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center mx-4 my-20">
      <Title
        title="Stay Connected to the Marketplace"
        description="Receive curated weekly digests of newly verified vendor arrivals, workstation hardware drops, and promotional coupons."
        visibleButton={false}
      />
      <div className="flex items-center bg-white border border-slate-200 focus-within:border-emerald-500 text-sm p-1.5 rounded-full w-full max-w-xl mt-8 shadow-xs">
        <input
          className="flex-1 pl-5 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-xs sm:text-sm"
          type="email"
          placeholder="Enter your email address..."
        />
        <button className="font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full hover:shadow transition flex items-center gap-1.5 cursor-pointer">
          <Send size={14} />
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;