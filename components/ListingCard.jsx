// components/ListingCard.jsx

import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { useContext } from 'react';
import { FavoritesContext } from '../lib/favoritesContext';

export default function ListingCard({ listing }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="relative block border border-medium-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary-light"
    >
      <img
        src={listing.image_url}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(listing.id);
        }}
        className={`absolute top-2 right-2 p-1 rounded-full bg-white text-primary-dark shadow ${isFavorite(listing.id) ? 'text-brand-primary' : ''}`}
        aria-label="Toggle favorite"
      >
        <FiHeart fill={isFavorite(listing.id) ? 'currentColor' : 'none'} />
      </button>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-primary-dark">{listing.title}</h2>
        <p className="text-medium-gray">{listing.city}</p>
        <p className="mt-2 font-bold text-brand-primary">
          ${listing.price_per_day}/day
        </p>
      </div>
    </Link>
  );
}
