// pages/explore.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import 'leaflet/dist/leaflet.css';

// Import the new FilterBar component
import FilterBar from '../components/FilterBar';

// Dynamically import the Map Component
const MapComponent = dynamic(() => import('../components/ExploreMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-300 animate-pulse" />,
});

// --- Sub-components for the Explore Page ---
const ListingCard = React.forwardRef(({ listing, onMouseEnter, onMouseLeave, isSelected }, ref) => (
  <motion.div
    ref={ref}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-brand-primary shadow-xl' : ''}`}
    whileHover={{ y: -5 }}
  >
    <div className="relative h-40 bg-gray-200">
        <img src={(listing.images && listing.images.length > 0) ? listing.images[0] : 'https://placehold.co/800x600/2C3E50/ECF0F1?text=Verve99'} alt={listing.title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-primary-dark truncate">{listing.title}</h3>
      <p className="text-brand-primary font-semibold mt-1">₹{listing.price_per_month?.toLocaleString() || 'N/A'} /month</p>
    </div>
  </motion.div>
));
ListingCard.displayName = 'ListingCard';


// --- Main Explore Page Component ---
export default function ExplorePage() {
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const listingRefs = useRef({});

  // State for all filters, managed here and passed to the FilterBar
  const [filters, setFilters] = useState({
    vertical: 'workspace',
    location: '',
    amenities: [],
    minSqFt: '',
    minCapacity: '',
  });

  const fetchListings = useCallback(async () => {
    setLoading(true);

    let query = supabase
        .from('listings')
        .select('*, city:cities(name), logistics_details(*), event_details(*)')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
    
    // Apply filters based on the state
    if (filters.location) {
        query = query.ilike('city.name', `%${filters.location}%`);
    }

    // Context-aware filtering based on the selected vertical
    switch (filters.vertical) {
        case 'workspace':
            query = query.eq('category', 'workspace');
            if (filters.amenities.length > 0) {
                query = query.contains('amenities', filters.amenities);
            }
            break;
        case 'warehousing':
            query = query.eq('category', 'logistics');
            if (filters.minSqFt) {
                query = query.gte('logistics_details.total_sq_ft', filters.minSqFt);
            }
            break;
        case 'event_space':
            query = query.eq('category', 'event');
             if (filters.minCapacity) {
                query = query.gte('event_details.max_capacity', filters.minCapacity);
            }
            break;
        default:
            break;
    }
    
    const { data, error } = await query;
    
    if(error) {
        console.error("Error fetching listings:", error);
        setListings([]);
    } else {
        setListings(data || []);
    }

    setLoading(false);
  }, [supabase, filters]);

  useEffect(() => {
    // Debounce the fetch call to avoid too many requests while typing
    const handler = setTimeout(() => {
        fetchListings();
    }, 500);
    
    return () => clearTimeout(handler);
  }, [fetchListings]);
  
  const handlePinClick = (listing) => {
    setSelectedListing(listing);
    listingRefs.current[listing.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex flex-col h-screen">
      <Head><title>Explore | Verve99</title></Head>
      <Navbar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-7 h-[40vh] lg:h-full">
            <MapComponent listings={listings} hoveredListingId={hoveredListingId} selectedListing={selectedListing} setSelectedListing={setSelectedListing} onPinClick={handlePinClick} />
        </div>
        <div className="lg:col-span-5 flex flex-col">
            {/* RENDER THE FILTER BAR and pass state to it */}
            <FilterBar filters={filters} setFilters={setFilters} />
            
            <div className="p-4 border-b bg-white">
                 <h2 className="font-bold text-lg">Search Results ({listings.length})</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-primary-light">
                {loading ? <p className="text-center text-medium-gray">Searching...</p> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {listings.length > 0 ? listings.map(listing => (
                            <ListingCard ref={el => (listingRefs.current[listing.id] = el)} key={listing.id} listing={listing} isSelected={selectedListing?.id === listing.id} onMouseEnter={() => setHoveredListingId(listing.id)} onMouseLeave={() => setHoveredListingId(null)} />
                        )) : <p className="col-span-full text-center text-medium-gray">No listings found matching your criteria.</p>}
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
