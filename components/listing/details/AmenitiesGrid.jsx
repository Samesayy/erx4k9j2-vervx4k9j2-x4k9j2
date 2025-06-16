import React from 'react';

export default function AmenitiesGrid({ amenities }) {
    if (!amenities || amenities.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-primary-dark mb-5">What this place offers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-800">
                        <div className="text-brand-primary mr-3">
                            {React.cloneElement(amenity.icon, { size: 24 })}
                        </div>
                        <span className="text-sm font-medium">{amenity.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}