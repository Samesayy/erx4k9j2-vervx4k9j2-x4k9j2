// components/hero/HeroContainer.jsx
import { useState } from 'react';
import Image from 'next/image';
import RotatingTaglines from './RotatingTaglines';
import OfficeTypeTabs from './OfficeTypeTabs';
import SearchModule from './SearchModule';

export default function HeroContainer() {
  const [selectedType, setSelectedType] = useState('Coworking Spaces');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
      {/* Left Column: Text + Rotating + Tabs + Search */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-dark">
          Metros And Non-Metros, We Got It All Covered
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
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Modern Co-working Space"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
