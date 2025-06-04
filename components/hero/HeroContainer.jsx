// components/hero/HeroContainer.jsx
import { useState } from 'react';
import Image from 'next/image';
import RotatingTaglines from './RotatingTaglines';
import OfficeTypeTabs from './OfficeTypeTabs';
import SearchModule from './SearchModule';

export default function HeroContainer() {
  const [selectedType, setSelectedType] = useState('Coworking Spaces');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
      {/* Left Column: Text + Rotating + Tabs + Search */}
      <div className="md:w-1/2 space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark">
          Metros &amp; Non-Metros,
          <span className="block text-brand-primary">We Got It All Covered</span>
        </h1>
        <p className="text-lg text-medium-gray">
          Whatever your requirements, find your perfect match
        </p>

        {/* Rotating Taglines */}
        <RotatingTaglines />

        {/* Office Type Tabs */}
        <OfficeTypeTabs onSelect={setSelectedType} />

        {/* Search Module */}
        <SearchModule initialType={selectedType} />
      </div>

      {/* Right Column: Image / Placeholder */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/hero.jpg"
            alt="Modern Co-working Space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-accent/40 to-primary-dark/50 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
