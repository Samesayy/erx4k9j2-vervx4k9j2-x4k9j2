// components/HillStationCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, MapPin } from 'lucide-react';

export default function HillStationCard({ listing }) {
  const {
    id,
    title = 'Scenic Workspace',
    images,
    city,
    short_tagline, // Assuming we'll add this field to the form/db
  } = listing;

  const imageUrl = (images && images.length > 0) ? images[0] : `https://placehold.co/800x600/95A5A6/FFFFFF?text=Retreat`;

  return (
    <Link
      href={`/listing/${id}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
    >
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={`Image of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
            <h3 className="text-2xl font-bold text-white leading-tight shadow-text">{title}</h3>
            <p className="text-sm text-gray-200 shadow-text">{short_tagline || `in ${city?.name}`}</p>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-medium-gray text-sm">
            <MapPin className="w-4 h-4 mr-2 text-brand-primary" />
            <span>{city?.name || 'N/A'}</span>
        </div>
        <div className="mt-auto pt-4">
             <span className="inline-block w-full text-center bg-brand-primary text-white font-semibold py-2 rounded-lg group-hover:bg-accent transition-colors">
                View Details
             </span>
        </div>
      </div>
    </Link>
  );
}

// Add this to your globals.css for the text shadow effect:
// .shadow-text {
//   text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
// }