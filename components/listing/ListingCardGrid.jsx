import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image for optimization
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MapPin, Wallet, Train, Zap } from 'lucide-react';

export default function ListingCardGrid({ listing, onGetQuoteClick }) {

    // --- Data Mapping ---
    const title = listing?.name || 'Workspace Title';
    const location = listing?.location || 'Location';
    const city = listing?.city || 'City';
    const price = listing?.budgetPerSeat?.toLocaleString() || 'N/A';
    const service = listing?.service || 'Flexible Workspace';
    const images = listing?.images?.length > 0 ? listing.images : ['https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99'];

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col h-full">
            {/* Image Carousel */}
            <Link href={`/listing/${listing.id}`}>
                <div className="relative cursor-pointer">
                    <Carousel showThumbs={false} showStatus={false} showArrows={true} infiniteLoop autoPlay={false}>
                        {images.map((imgUrl, index) => (
                            <div key={index} className="h-48">
                                <Image
                                    src={imgUrl}
                                    alt={title}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className="absolute top-2 right-2 bg-white/90 text-brand-primary font-bold text-sm px-3 py-1 rounded-full shadow">
                        ₹{price} <span className="font-normal text-xs">/seat</span>
                    </div>
                </div>
            </Link>

            {/* Details Section */}
            <div className="p-4 flex flex-col flex-grow">
                <div>
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">{service}</span>
                    <h3 className="text-md font-bold text-primary-dark truncate mt-2">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600 truncate flex items-center">
                        <MapPin size={14} className="mr-1.5 flex-shrink-0" />
                        {location}, {city}
                    </p>
                </div>

                {/* Icons for key features */}
                <div className="my-3 py-3 border-y flex items-center gap-4 text-xs text-gray-500">
                    {listing.metro_nearby && (
                         <div className="flex items-center gap-1.5"><Train size={14} className="text-gray-500"/> Metro Nearby</div>
                    )}
                    {listing.parking?.includes('car') && (
                         <div className="flex items-center gap-1.5"><Zap size={14} className="text-gray-500"/> Parking</div>
                    )}
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => onGetQuoteClick(listing)}
                        className="w-full px-4 py-2 bg-brand-primary text-white font-semibold rounded hover:bg-opacity-90 transition-colors text-sm"
                    >
                        Get a Quote
                    </button>
                </div>
            </div>
        </div>
    );
}