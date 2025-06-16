import React from 'react';
import Image from 'next/image';

export default function ImageGallery({ title, images }) {
    const fallbackImage = 'https://placehold.co/1200x800/ECF0F1/2C3E50?text=Verve99';
    // Use listing images if available, otherwise use fallbacks for the grid.
    const displayImages = (images?.length ? images.map(img => img.url || img) : [fallbackImage])
        .concat(Array(5).fill(fallbackImage))
        .slice(0, 5);

    return (
        <div className="grid grid-cols-12 grid-rows-2 gap-2 h-[450px] rounded-xl overflow-hidden shadow-lg">
            {/* Main Image */}
            <div className="col-span-12 md:col-span-6 row-span-2 relative cursor-pointer group">
                <Image src={displayImages[0]} alt={`${title} main view`} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
            </div>
            {/* Four smaller images */}
            {displayImages.slice(1, 5).map((src, index) => (
                 <div key={index} className="col-span-6 md:col-span-3 row-span-1 relative cursor-pointer group hidden md:block">
                    <Image src={src} alt={`${title} view ${index + 2}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
                </div>
            ))}
        </div>
    );
}