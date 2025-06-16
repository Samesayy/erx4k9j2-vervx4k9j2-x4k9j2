import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Train, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ListingCardList({ listing, onGetQuoteClick }) {
    const [currentImage, setCurrentImage] = useState(0);

    // This part is fine and will work with your `images` array
    const images = listing?.images?.length > 0 ? listing.images : ['https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99'];

    // --- Mismatch FIXES ---
    // Use `name` instead of `title`
    const title = listing?.name || 'Workspace Title';
    // Use `location` and `city` instead of `address`
    const address = `${listing?.location}, ${listing?.city}` || 'Address not available';
    // Use `budgetPerSeat` instead of `price_per_month`
    const price = listing?.budgetPerSeat?.toLocaleString() || 'N/A';
    // Use `service` instead of the complex `listing_space_types`
    const spaceTypes = listing?.service || 'Flexible Workspace';
    
    const nextImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImage(prev => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImage(prev => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Image Section */}
            <Link href={`/listing/${listing.id}`} className="w-full md:w-1/3 h-56 md:h-auto relative group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={images[currentImage]}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <button onClick={prevImage} className="p-2 bg-black/40 text-white rounded-full ml-2 hover:bg-black/60"><ChevronLeft size={20}/></button>
                    <button onClick={nextImage} className="p-2 bg-black/40 text-white rounded-full mr-2 hover:bg-black/60"><ChevronRight size={20}/></button>
                </div>
            </Link>

            {/* Details Section */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-primary-dark pr-4">{title}</h3>
                        <div className="text-right flex-shrink-0">
                            <p className="text-xl font-bold text-brand-primary">₹{price}</p>
                            <p className="text-xs text-medium-gray">per seat/month</p>
                        </div>
                    </div>
                    <p className="text-sm text-medium-gray flex items-center mt-1">
                        <MapPin size={14} className="mr-1 flex-shrink-0" /> {address}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                         <div className="flex items-center"><Clock size={14} className="mr-2 text-brand-primary" />24/7 Access Available</div>
                         <div className="flex items-center"><Train size={14} className="mr-2 text-brand-primary" />{listing.metro_nearby ? 'Metro Connected' : 'Well Connected'}</div>
                    </div>
                    
                    <div className="mt-3 py-2 border-y border-gray-100">
                       <p className="text-xs font-semibold text-accent">{spaceTypes}</p>
                    </div>
                </div>

                <div className="flex justify-end items-center mt-4">
                    <button onClick={() => onGetQuoteClick(listing)} className="px-5 py-2 text-sm bg-brand-primary font-semibold text-white rounded-md hover:bg-accent hover:text-primary-dark transition-colors">
                        Get Quote
                    </button>
                </div>
            </div>
        </motion.div>
    );
};