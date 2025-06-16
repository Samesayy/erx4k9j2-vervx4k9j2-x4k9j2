// components/ListingCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiMapPin, FiHeart } from 'react-icons/fi';
import { useState } from 'react';

export default function ListingCard({ listing, isFavorited, onToggleFavorite }) {
  const user = useUser();
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleFavoriteClick = async (e) => {
    e.preventDefault(); // Prevent navigating when clicking the heart
    e.stopPropagation();

    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }
    
    // Optimistically update the UI
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Call the parent function to update the database
    if(onToggleFavorite) {
        onToggleFavorite(listing.id, newFavoriteStatus);
    }
  };

  return (
    <Link
        href={`/listing/${listing.id}`}
        className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
    >
      <div className="relative w-full h-48">
        <Image
          src={listing.images && listing.images.length > 0 ? listing.images[0] : '/images/sample-workspace.jpg'}
          alt={`Image of ${listing.name || listing.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Favorite Button */}
        {user && (
            <button
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition hover:bg-white"
                aria-label="Save to favorites"
            >
                <FiHeart className={`w-5 h-5 transition-all ${isFavorite ? 'text-red-500 fill-current' : 'text-primary-dark'}`} />
            </button>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-primary-dark truncate">{listing.name || listing.title}</h3>
        <div className="flex items-center text-medium-gray text-sm mt-1">
          <FiMapPin className="mr-1 flex-shrink-0" />
          <span>{listing.location}, {listing.city?.name || listing.city}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex-grow flex items-end justify-between">
          <div>
            <p className="text-sm text-medium-gray">Starts from</p>
            <p className="text-xl font-bold text-primary-dark">
              ₹{listing.budgetPerSeat?.toLocaleString() || listing.price_per_month?.toLocaleString() }
              <span className="text-sm font-normal text-medium-gray"> /seat</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}