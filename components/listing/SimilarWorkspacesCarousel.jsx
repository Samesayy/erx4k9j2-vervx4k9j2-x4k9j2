// components/listing/SimilarWorkspacesCarousel.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ListingCardGrid from './ListingCardGrid'; // Reusing our grid card

export default function SimilarWorkspacesCarousel({ similarListings }) {
  const scrollRef = useRef(null);

  if (!similarListings || similarListings.length === 0) {
    return null; // Don't render if there are no similar listings
  }

  const handleNav = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].clientWidth + 16; // card width + gap
      scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">
          Similar Workspaces Nearby
        </h2>
        <div className="hidden md:flex gap-2">
           <button onClick={() => handleNav(-1)} className="p-2 bg-white rounded-full shadow-md border hover:bg-gray-100">
               <ChevronLeft size={20} className="text-primary-dark" />
           </button>
           <button onClick={() => handleNav(1)} className="p-2 bg-white rounded-full shadow-md border hover:bg-gray-100">
               <ChevronRight size={20} className="text-primary-dark" />
           </button>
        </div>
      </div>
      
      <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-4 no-scrollbar"
      >
        {similarListings.map((listing) => (
          <div key={listing.id} className="w-80 flex-shrink-0">
            {/* We can pass a dummy onGetQuoteClick since it's just for display */}
            <ListingCardGrid listing={listing} onGetQuoteClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};
