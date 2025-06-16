// components/FeaturedWorkspaces.jsx
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

// 1. IMPORT THE CENTRAL DATA SOURCE
import { ALL_LISTINGS } from '../lib/dummyData.js';

const categories = [
  'Coworking Space',
  'Serviced Office',
  'Virtual Office',
  'Meeting Room',
  'Training Room',
  'Day Office',
];

export default function FeaturedWorkspaces() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  // 2. USE A REACT REF FOR THE SLIDER
  const sliderRef = useRef(null);

  // 3. FILTER THE REAL LISTINGS BASED ON THE SELECTED CATEGORY
  // We'll take up to 15 matching items.
  const filteredWorkspaces = ALL_LISTINGS.filter(
    (listing) => listing.service === selectedCategory
  ).slice(0, 15);

  const scroll = (scrollOffset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary-dark">
            Featured Workspaces
          </h2>
          {/* 4. "VIEW ALL" LINK THAT CHANGES DYNAMICALLY */}
          <Link
            href={`/listing?service=${selectedCategory}`}
            className="mt-2 sm:mt-0 text-brand-primary font-semibold hover:text-accent transition-colors"
          >
            View All {selectedCategory}s →
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === selectedCategory
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-primary-light text-primary-dark hover:bg-accent/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel */}
        <div className="relative">
          <div
            id="workspace-slider"
            ref={sliderRef} // Attach the ref here
            className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar"
          >
            {filteredWorkspaces.map((ws) => (
              // 5. EACH CARD IS NOW A CLICKABLE LINK
              <Link
                href={`/listing/${ws.id}`}
                key={ws.id}
                className="group flex-shrink-0 w-80 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
                  <Image
                    src={ws.images[0]}
                    alt={ws.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary-dark truncate">
                    {ws.name}
                  </h3>
                  <p className="text-medium-gray text-sm mb-2">{ws.location}, {ws.city}</p>
                  <p className="text-brand-primary text-lg font-bold">
                    ₹{ws.budgetPerSeat.toLocaleString()}
                    <span className="text-sm font-normal text-medium-gray"> /seat</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="hidden md:block">
             <button
              onClick={() => scroll(-350)}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-300 rounded-full shadow-md hover:bg-primary-light transition"
              aria-label="Scroll Left"
            >
              <FiArrowLeft className="text-primary-dark"/>
            </button>
            <button
              onClick={() => scroll(350)}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-gray-300 rounded-full shadow-md hover:bg-primary-light transition"
              aria-label="Scroll Right"
            >
              <FiArrowRight className="text-primary-dark" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}