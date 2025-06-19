// components/banners/GetBestPricesBanner.jsx
import React from 'react';
import { TrendingUp, Zap, ShieldCheck, Gift } from 'lucide-react';

export default function GetBestPricesBanner() {
  const features = [
    {
      icon: <TrendingUp size={40} className="text-accent mb-2" />, 
      title: 'Market Insights', 
      desc: 'Data-driven comparisons for smarter choices.'
    },
    {
      icon: <Zap size={40} className="text-accent mb-2" />, 
      title: 'Lightning Fast Quotes', 
      desc: 'Instant, accurate rates at your fingertips.'
    },
    {
      icon: <ShieldCheck size={40} className="text-accent mb-2" />, 
      title: '100% Transparency', 
      desc: 'No surprises—every cost clearly outlined.'
    },
    {
      icon: <Gift size={40} className="text-accent mb-2" />, 
      title: 'Customizable Packages', 
      desc: 'Tailor workspace bundles to your needs.'
    }
  ];

  return (
    <div className="w-full py-12 bg-gradient-to-r from-primary-dark to-brand-primary text-white rounded-xl my-8 shadow-glass overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center mb-8 shadow-text animate-fade-in-down">
        Get the Best Prices
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center text-center p-6 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm animate-fade-slide-up"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
            <p className="mt-1 text-sm text-primary-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
