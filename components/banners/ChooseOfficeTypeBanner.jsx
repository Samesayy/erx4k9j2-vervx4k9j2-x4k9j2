// components/banners/ChooseOfficeTypeBanner.jsx
import React from 'react';
import { Briefcase, Shield, Users, Globe } from 'lucide-react';

export default function ChooseOfficeTypeBanner() {
  const options = [
    {
      icon: <Briefcase size={36} className="text-accent mb-2" />,
      title: 'Flexible Coworking',
      desc: 'Collaborative desks in vibrant communities.'
    },
    {
      icon: <Shield size={36} className="text-accent mb-2" />,
      title: 'Secure Private Offices',
      desc: 'Dedicated spaces for focused productivity.'
    },
    {
      icon: <Users size={36} className="text-accent mb-2" />,
      title: 'Professional Meeting Rooms',
      desc: 'Equip with AV & boardroom essentials.'
    },
    {
      icon: <Globe size={36} className="text-accent mb-2" />,
      title: 'Virtual Offices',
      desc: 'Prestigious address & mail handling services.'
    }
  ];

  return (
    <div className="w-full py-12 bg-primary-light text-primary-dark rounded-lg my-8 shadow-glass">
      <h2 className="text-3xl font-bold text-center mb-6 animate-fade-in-down">
        Not sure what office you need?
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            {opt.icon}
            <h3 className="text-xl font-semibold mt-2">{opt.title}</h3>
            <p className="mt-1 text-sm text-medium-gray">{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
