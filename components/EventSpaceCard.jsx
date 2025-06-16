// components/EventSpaceCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Users, Zap, Clapperboard } from 'lucide-react';

export default function EventSpaceCard({ listing }) {
  const {
    id,
    title = 'Untitled Event Space',
    images,
    city,
    event_details,
    price_per_day
  } = listing;

  const imageUrl = (images && images.length > 0) ? images[0] : `https://placehold.co/800x600/FF00FF/FFFFFF?text=${encodeURIComponent(title)}`;

  return (
    <Link
      href={`/listing/${id}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Image of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-primary-dark truncate">{title}</h3>
        <p className="text-sm text-medium-gray">{city?.name || 'N/A'}</p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-2 text-brand-accent" />
            <span>Up to <span className="font-semibold">{event_details?.max_capacity || 'N/A'}</span> Guests</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clapperboard className="w-4 h-4 mr-2 text-brand-accent" />
            <span>A/V Equipped: <span className="font-semibold">{event_details?.has_av_equipment ? 'Yes' : 'No'}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <Zap className="w-4 h-4 mr-2 text-brand-accent" />
            <span>Catering: <span className="font-semibold">{event_details?.catering_available ? 'Available' : 'Not Available'}</span></span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex-grow flex items-end justify-between">
          <div>
            <p className="text-sm text-medium-gray">Starts from</p>
            <p className="text-xl font-bold text-primary-dark">
              ₹{price_per_day?.toLocaleString() || 'N/A'}
              <span className="text-sm font-normal text-medium-gray"> /day</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}