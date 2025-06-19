// components/listing/details/AmenitiesGrid.jsx
import React, { useState } from 'react';
import { Wifi, Coffee, Zap, MapPin, Phone, Users, Plus } from 'lucide-react';

// Map amenity names to Lucide icons
const iconMap = {
  'Wi-Fi': Wifi,
  'Coffee': Coffee,
  'Parking': Zap,
  'Location': MapPin,
  'Phone Support': Phone,
  'Team Events': Users,
  // add more mappings here as needed
};

export default function AmenitiesGrid({ amenities }) {
  const [showAll, setShowAll] = useState(false);
  if (!amenities || amenities.length === 0) return null;

  const initialCount = 6;
  const displayed = showAll ? amenities : amenities.slice(0, initialCount);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-glass border mb-8">
      <h2 className="text-2xl font-bold text-primary-dark mb-6 border-l-4 border-accent pl-4">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {displayed.map((amenity, index) => {
          const Icon = iconMap[amenity.text] || Plus;
          return (
            <div key={index} className="flex items-center bg-primary-light p-2 rounded-lg">
              <Icon size={20} className="text-accent mr-3" />
              <span className="text-sm font-medium text-primary-dark">{amenity.text}</span>
            </div>
          );
        })}
      </div>
      {amenities.length > initialCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-accent font-medium hover:underline"
        >
          {showAll ? 'Show Less' : `+${amenities.length - initialCount} More`}
        </button>
      )}
    </section>
  );
}