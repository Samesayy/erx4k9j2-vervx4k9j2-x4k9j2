// components/WarehouseCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Truck, Box, Ruler } from 'lucide-react';

export default function WarehouseCard({ listing }) {
  // Use optional chaining and provide fallbacks for safety
  const {
    id,
    title = 'Untitled Warehouse',
    images,
    city,
    logistics_details,
    price_per_sq_ft
  } = listing;

  const imageUrl = (images && images.length > 0) ? images[0] : `https://placehold.co/800x600/3498DB/FFFFFF?text=${encodeURIComponent(title)}`;

  return (
    <Link
      href={`/listing/${id}`} // This will link to a generic detail page for now
      className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Image of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-primary-dark truncate">{title}</h3>
        <p className="text-sm text-medium-gray">{city?.name || 'N/A'}</p>

        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Ruler className="w-4 h-4 mr-2 text-brand-primary" />
            <span><span className="font-semibold">{logistics_details?.total_sq_ft || 'N/A'}</span> sq. ft.</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Truck className="w-4 h-4 mr-2 text-brand-primary" />
            <span>Loading Docks: <span className="font-semibold">{logistics_details?.has_loading_dock ? 'Yes' : 'No'}</span></span>
          </div>
          <div className="flex items-center text-gray-700">
            <Box className="w-4 h-4 mr-2 text-brand-primary" />
            <span>E-commerce Ready: <span className="font-semibold">{logistics_details?.is_ecommerce_ready ? 'Yes' : 'No'}</span></span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex-grow flex items-end justify-between">
          <div>
            <p className="text-sm text-medium-gray">Starting from</p>
            <p className="text-xl font-bold text-primary-dark">
              ₹{price_per_sq_ft?.toLocaleString() || 'N/A'}
              <span className="text-sm font-normal text-medium-gray"> /sq.ft/month</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}