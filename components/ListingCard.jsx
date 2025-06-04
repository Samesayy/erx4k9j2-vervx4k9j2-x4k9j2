// components/ListingCard.jsx

import Link from 'next/link';

export default function ListingCard({ listing }) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="block border border-medium-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary-light"
    >
      <img
        src={listing.image_url}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
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
