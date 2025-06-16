// components/CommercialSpaceCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Landmark, Calendar, Ruler } from 'lucide-react';

export default function CommercialSpaceCard({ listing }) {
  const {
    id,
    title = 'Untitled Property',
    images,
    city,
    commercial_details,
  } = listing;

  const imageUrl = (images && images.length > 0) ? images[0] : `https://placehold.co/800x600/1A1A1A/FFFFFF?text=${encodeURIComponent(title)}`;

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
        {commercial_details?.is_furnished && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                Furnished
            </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-primary-dark truncate">{title}</h3>
        <p className="text-sm text-medium-gray">{city?.name || 'N/A'}</p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Ruler className="w-4 h-4 mr-2 text-brand-primary" />
            <span><span className="font-semibold">{commercial_details?.total_area_sq_ft || 'N/A'}</span> sq. ft.</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-brand-primary" />
            <span>Min. Lease: <span className="font-semibold">{commercial_details?.lease_term_years || '1'} Year(s)</span></span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex-grow flex items-end justify-between">
          <div>
            <p className="text-sm text-medium-gray">Price</p>
            <p className="text-xl font-bold text-primary-dark">
              ₹{commercial_details?.price_per_sq_ft?.toLocaleString() || 'N/A'}
              <span className="text-sm font-normal text-medium-gray"> /sq.ft/month</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}