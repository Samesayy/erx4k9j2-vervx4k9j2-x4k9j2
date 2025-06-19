// components/listing/ListingCardList.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Train, Zap, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ListingCardList({ listing, onGetQuoteClick }) {
  const [currentImage, setCurrentImage] = useState(0);

  const {
    id,
    name,
    location,
    city,
    address,
    timing,
    metro_nearby,
    parking,
    amenities = [],
    budgetPerSeat,
    service,
    images = []
  } = listing;

  const title = name || 'Workspace Title';
  const subtitle = city ? `${location}, ${city}` : location || 'Location';
  const price = budgetPerSeat ? budgetPerSeat.toLocaleString() : 'N/A';

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-glass border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-6 overflow-hidden"
    >
      {/* Link overlay */}
      <Link href={`/listing/${id}`} className="absolute inset-0 z-10 md:relative md:hidden" />

      {/* Image Section */}
      <Link href={`/listing/${id}`} className="w-full md:w-1/3 h-56 md:h-auto relative group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={images.length ? images[currentImage] : 'https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99'}
              alt={`${title} image ${currentImage + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
          <button onClick={prevImage} className="p-2 bg-black/40 text-white rounded-full ml-2 hover:bg-black/60">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextImage} className="p-2 bg-black/40 text-white rounded-full mr-2 hover:bg-black/60">
            <ChevronRight size={20} />
          </button>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-0">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-primary-dark pr-4 line-clamp-2">{title}</h3>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-bold text-brand-primary">₹{price}</p>
              <p className="text-xs text-medium-gray">per seat/month</p>
            </div>
          </div>
          <div className="mt-1 text-sm text-medium-gray flex items-center">
            <MapPin size={14} className="mr-1" /> {address || subtitle}
          </div>

          {/* Additional Info */}
          <div className="mt-4 space-y-1 text-xs text-medium-gray">
            {timing && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1" /> {timing}
              </div>
            )}
            {metro_nearby && (
              <div className="flex items-center">
                <Train size={14} className="mr-1" /> Metro Nearby
              </div>
            )}
            {parking?.length > 0 && (
              <div className="flex items-center">
                <Zap size={14} className="mr-1" /> Parking: {parking.join(', ')}
              </div>
            )}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((a, i) => (
                  <span key={i} className="flex items-center bg-primary-light px-2 py-1 rounded-full text-xs">
                    <Plus size={12} className="mr-1 text-accent" /> {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => onGetQuoteClick(listing)}
            className="px-5 py-2 text-sm bg-accent text-primary-dark font-semibold rounded-md hover:bg-accent/90 transition-colors"
          >
            Get Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}
