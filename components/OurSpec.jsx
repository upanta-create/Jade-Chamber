import React from 'react';
import Title from './Title';
import { ourSpecsData } from '@/assets/assets';

const OurSpecs = () => {
  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title
        visibleButton={false}
        title="Enterprise Platform Guarantees"
        description="Engineered with cloud-native reliability, distributed Redis caching, and automated GitOps continuous delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
        {ourSpecsData.map((spec, index) => {
          return (
            <div
              key={index}
              className="relative p-8 pt-10 flex flex-col items-center justify-center text-center bg-white border border-slate-200 hover:border-emerald-500/50 rounded-2xl group transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <div className="absolute -top-5 w-11 h-11 bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                <spec.icon size={20} />
              </div>
              <h3 className="text-slate-900 font-bold text-base mt-2 group-hover:text-emerald-700 transition-colors">
                {spec.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-normal">
                {spec.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurSpecs;