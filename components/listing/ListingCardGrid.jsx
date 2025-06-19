// components/listing/ListingCardGrid.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MapPin, Wallet, Train, Zap } from 'lucide-react';

export default function ListingCardGrid({ listing, onGetQuoteClick }) {
  const {
    id,
    name,
    location,
    city,
    budgetPerSeat,
    service,
    images = []
  } = listing;

  const title = name || 'Workspace Title';
  const subtitle = `${location || 'Location'}, ${city || 'City'}`;
  const price = budgetPerSeat ? budgetPerSeat.toLocaleString() : 'N/A';

  return (
    <Link href={`/listing/${id}`} className="block">
      <div className="group relative bg-white rounded-2xl shadow-glass overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image Carousel */}
        <div className="relative h-48 w-full cursor-pointer">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            infiniteLoop
            autoPlay
            interval={4000}
            className="h-full"
          >
            {(images.length ? images : ['https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99']).map((src, idx) => (
              <div key={idx} className="relative h-48">
                <Image
                  src={src}
                  alt={`${title} image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </Carousel>
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            ₹{price} <span className="font-normal text-xs">/seat</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs font-semibold text-accent bg-accent/20 px-2 py-1 rounded-full uppercase tracking-wide">
            {service || 'Workspace'}
          </span>
          <h3 className="mt-2 text-lg font-bold text-primary-dark line-clamp-2">
            {title}
          </h3>
          <div className="mt-1 text-sm text-medium-gray flex items-center">
            <MapPin size={14} className="mr-1" />
            {subtitle}
          </div>

          {/* Key Features */}
          <div className="mt-3 flex items-center space-x-4 text-xs text-medium-gray">
            {listing.metro_nearby && (
              <div className="flex items-center gap-1">
                <Train size={14} /> Metro
              </div>
            )}
            {listing.parking?.includes('car') && (
              <div className="flex items-center gap-1">
                <Zap size={14} /> Parking
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={(e) => { e.preventDefault(); onGetQuoteClick(listing); }}
            className="mt-auto w-full py-2 bg-accent text-primary-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </Link>
  );
}
