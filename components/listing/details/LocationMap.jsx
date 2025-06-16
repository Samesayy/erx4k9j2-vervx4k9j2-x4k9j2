import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationMap({ address }) {
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">Location</h2>
            <div className="w-full h-80 rounded-lg overflow-hidden border">
                <iframe
                    title="Workspace Location"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}