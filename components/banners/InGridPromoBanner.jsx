// components/banners/InGridPromoBanner.jsx
import React from 'react';
import { MessageSquare, Users, Briefcase, Zap, Gift } from 'lucide-react';

const features = [
  { icon: <Users size={28} className="text-accent" />, text: 'Expert Recommendations' },
  { icon: <Briefcase size={28} className="text-accent" />, text: 'Tailored Workspace Plans' },
  { icon: <Zap size={28} className="text-accent" />, text: 'Quick, Hassle-Free Setup' },
  { icon: <Gift size={28} className="text-accent" />, text: 'Exclusive Member Perks' },
];

export default function InGridPromoBanner({ onExpertClick }) {
  return (
    <div className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-primary-dark to-brand-primary text-white rounded-xl shadow-glass overflow-hidden">
      <div className="text-center animate-fade-in-down">
        <MessageSquare size={40} className="mx-auto mb-3 text-accent" />
        <h3 className="text-2xl font-bold mb-2">Still Looking?</h3>
        <p className="text-sm text-primary-light mb-4">
          Let us match you with the perfect workspace, free of charge.
        </p>
      </div>

      <ul className="space-y-2 mb-4">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-center text-sm">
            {feat.icon}
            <span className="ml-2">{feat.text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onExpertClick}
        className="w-full py-2 bg-accent text-primary-dark font-semibold rounded-md hover:bg-opacity-90 transition-transform hover:scale-105"
      >
        Talk to an Expert
      </button>
    </div>
  );
}
