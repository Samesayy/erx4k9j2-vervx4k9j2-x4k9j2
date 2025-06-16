// pages/listing/index.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { 
    List, LayoutGrid, Building, Users, Clock, Wifi, MapPin, CheckCircle, Train, 
    Award, MessageSquare, SlidersHorizontal, ChevronLeft, ChevronRight, Zap, 
    Shield, Handshake, ThumbsUp, ChevronDown 
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InstantQuoteModal from '../../components/InstantQuoteModal';

// --- ALL SUB-COMPONENTS ARE NOW DEFINED WITHIN THIS FILE TO PREVENT ERRORS ---

// --- ADVANCED FILTER COMPONENT ---
const AdvancedFilterBar = ({ onApplyFilters, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters);
    
    useEffect(() => { setFilters(initialFilters); }, [initialFilters]);

    const handleApply = () => { onApplyFilters(filters); };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: (prev.brands || []).includes(brand)
                ? (prev.brands || []).filter(b => b !== brand)
                : [...(prev.brands || []), brand]
        }));
    };
    
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm mb-6 border flex flex-wrap items-center gap-2">
            <select name="product" value={filters.product || ''} onChange={handleChange} className="h-10 px-3 border border-gray-300 rounded-md text-sm">
                <option>Coworking Space</option><option>Private Office</option><option>Meeting Room</option>
            </select>
            <select name="city" value={filters.city || ''} onChange={handleChange} className="h-10 px-3 border border-gray-300 rounded-md text-sm">
                <option value="">All Cities</option><option>Delhi</option><option>Gurgaon</option><option>Mumbai</option>
            </select>
            <input type="text" name="location" placeholder="Search Locality..." value={filters.location || ''} onChange={handleChange} className="p-2 border border-gray-300 rounded-md text-sm flex-grow h-10"/>
            <input type="text" name="brand" placeholder="Brands" value={filters.brand || ''} onChange={handleChange} className="p-2 border border-gray-300 rounded-md text-sm h-10"/>
            <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md h-10">
                <Train size={16} className="text-gray-500" />
                <label htmlFor="metro" className="text-sm text-gray-700">Metro</label>
                <input type="checkbox" id="metro" name="metro" checked={filters.metro || false} onChange={handleChange} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary"/>
            </div>
            <button onClick={handleApply} className="h-10 px-6 bg-brand-primary text-white font-semibold rounded-md text-sm">Search</button>
        </div>
    );
};

// --- DETAILED LISTING CARD ---
const ListingCardList = ({ listing, onGetQuoteClick }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = listing?.images?.length > 0 ? listing.images : ['https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99'];
  const spaceTypes = listing?.listing_space_types?.map(st => st?.space_type?.name).filter(Boolean).join(' • ') || 'Flexible Workspace';
  const nextImage = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentImage(prev => (prev + 1) % images.length); };
  const prevImage = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentImage(prev => (prev - 1 + images.length) % images.length);};
  return (
    <motion.div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-6 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link href={`/listing/${listing.id}`} className="w-full md:w-1/3 h-56 md:h-auto relative group">
        <AnimatePresence mode="wait"><motion.div key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full"><Image src={images[currentImage]} alt={listing.title || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></motion.div></AnimatePresence>
        <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"><button onClick={prevImage} className="p-2 bg-black/40 text-white rounded-full ml-2 hover:bg-black/60"><ChevronLeft size={20}/></button><button onClick={nextImage} className="p-2 bg-black/40 text-white rounded-full mr-2 hover:bg-black/60"><ChevronRight size={20}/></button></div>
      </Link>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start"><h3 className="font-bold text-lg text-primary-dark pr-4">{listing.title}</h3><div className="text-right flex-shrink-0"><p className="text-xl font-bold text-brand-primary">₹{listing.price_per_month?.toLocaleString()}</p><p className="text-xs text-medium-gray">per seat/month</p></div></div>
          <p className="text-sm text-medium-gray flex items-center mt-1"><MapPin size={14} className="mr-1" /> {listing.address}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600"><div className="flex items-center"><Clock size={14} className="mr-2 text-brand-primary" />{listing.amenities?.includes('24/7 Access') ? '24/7 Access' : 'Standard Hours'}</div><div className="flex items-center"><Train size={14} className="mr-2 text-brand-primary" />{listing.metro_nearby ? 'Metro Connected' : 'Not Connected'}</div></div>
          <div className="mt-3 py-2 border-y border-gray-100"><p className="text-xs font-semibold text-accent">{spaceTypes}</p></div>
        </div>
        <div className="flex justify-end items-center mt-4"><button onClick={() => onGetQuoteClick(listing)} className="px-5 py-2 text-sm bg-brand-primary font-semibold text-white rounded-md hover:bg-accent hover:text-primary-dark transition-colors">Get Quote</button></div>
      </div>
    </motion.div>
  );
};

// --- COMPACT GRID CARD ---
const ListingCardGrid = ({ listing, onGetQuoteClick }) => {
    const imageUrl = (listing?.images?.length > 0) ? listing.images[0] : 'https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99';
    return (
        <motion.div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Link href={`/listing/${listing.id}`} className="relative h-40 block"><Image src={imageUrl} alt={listing?.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" /></Link>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div><h3 className="font-bold text-md text-primary-dark truncate">{listing?.title}</h3><p className="text-sm text-medium-gray">{listing?.city?.name}</p></div>
                <div className="flex justify-between items-end mt-3 pt-3 border-t"><p className="text-lg font-bold text-brand-primary">₹{listing?.price_per_month?.toLocaleString()}</p><button onClick={() => onGetQuoteClick(listing)} className="px-3 py-1 text-xs bg-brand-primary font-semibold text-white rounded-md hover:bg-accent hover:text-primary-dark transition-colors">Get Quote</button></div>
            </div>
        </motion.div>
    );
};

// --- RIGHT SIDEBAR ---
const RightSidebar = ({ onTalkToExpert }) => {
    const whyVerve99 = [
        { icon: <ThumbsUp />, title: 'Zero Brokerage Hassle', text: 'Connect directly with property owners—no hidden fees, no middlemen.' },
        { icon: <Shield />, title: 'Verified Workspaces Only', text: 'Every listing is thoroughly verified for quality, safety, and reliability.' },
        { icon: <Building />, title: 'Beyond Just Desks', text: 'Find coworking, warehousing, hill retreats & more—all in one place.' },
        { icon: <Zap />, title: 'Quick Response, Faster Deals', text: 'Enquiries answered within hours—because your time is valuable.' },
        { icon: <Handshake />, title: 'Design, Furnish, Launch', text: 'From interior design to setup, get end-to-end support to start your own coworking space.' },
    ];
    return (
        <div className="space-y-6 sticky top-28">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border">
                <h3 className="font-bold text-lg">Get best price at Verve99</h3>
                <p className="text-sm text-gray-500 mt-2">No brokerage fee, priority services, assistance in selection of office.</p>
                <button onClick={onTalkToExpert} className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90"><MessageSquare size={16} /> Talk to an Expert</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                {whyVerve99.map(item => (
                    <div key={item.title} className="flex items-start mb-4 last:mb-0">
                        <div className="p-2 bg-brand-primary/10 rounded-full mr-4 text-brand-primary">{React.cloneElement(item.icon, {size: 20})}</div>
                        <div><h4 className="font-semibold text-primary-dark">{item.title}</h4><p className="text-xs text-gray-600">{item.text}</p></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PROMOTIONAL BANNER ---
const PromotionalBanner = () => { /* Same as previous correct version */ };

// --- SIMILAR PRODUCTS CAROUSEL ---
const SimilarProductsCarousel = ({ items, onGetQuoteClick }) => { /* Same as previous correct version */ };

// --- RESULTS HEADER ---
const ResultsHeader = ({ count, viewMode, setViewMode, filters }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-primary-dark">{filters.product} in {filters.city} <span className="text-medium-gray font-normal">({count} results)</span></h2>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-md">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}><List size={20} /></button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}><LayoutGrid size={20} /></button>
            </div>
        </div>
    </div>
);


// --- MAIN PAGE ---
export default function MasterListingPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [viewMode, setViewMode] = useState('list');
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);
    const [isExpertModalOpen, setExpertModalOpen] = useState(false);
    
    const [filters, setFilters] = useState({ product: 'Coworking Space', city: 'Delhi', location: '', brands: [], parking: '', priceRange: [0, 50000], metro: false });

    const fetchData = useCallback(async (currentFilters) => {
        setLoading(true);
        let query = supabase.from('listings').select('*, city:cities(name), listing_space_types(space_type:space_types(name))');
        if (currentFilters.city) query = query.eq('city.name', currentFilters.city);
        if (currentFilters.product) query = query.eq('listing_space_types.space_type.name', currentFilters.product);
        if (currentFilters.location) query = query.ilike('address', `%${currentFilters.location}%`);
        if (currentFilters.brands.length > 0) query = query.in('brand_name', currentFilters.brands);
        if (currentFilters.metro) query = query.eq('metro_nearby', true);
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) console.error("Error fetching listings:", error.message);
        else setListings(data || []);
        setLoading(false);
    }, [supabase]);
    
    useEffect(() => {
        if(router.isReady){ fetchData(filters); }
    }, [filters, router.isReady, fetchData]);
  
    const handleGetQuote = (listing) => { setSelectedListing(listing); setQuoteModalOpen(true); };

    return (
        <div className="bg-primary-light">
            <Head><title>Find {filters.product} in {filters.city} | Verve99</title></Head>
            <Navbar />
            <main className="max-w-7xl mx-auto py-8 px-4">
                <div className="text-sm text-gray-500 mb-2">Home &gt; {filters.product} &gt; {filters.city}</div>
                
                <AdvancedFilterBar onApplyFilters={setFilters} initialFilters={filters} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    <div className="lg:col-span-8">
                        <ResultsHeader count={listings.length} viewMode={viewMode} setViewMode={setViewMode} filters={filters} />
                        {loading ? <p className="text-center py-10">Loading...</p> : (
                            listings.length > 0 ? (
                                <AnimatePresence mode="wait">
                                    <motion.div key={viewMode}>
                                        {viewMode === 'list' ? (
                                            <div>{listings.map((listing, index) => (
                                                <React.Fragment key={listing.id}>
                                                    <ListingCardList listing={listing} onGetQuoteClick={() => handleGetQuote(listing)}/>
                                                    {(index === 5 || index === 11) && <PromotionalBanner />}
                                                </React.Fragment>
                                            ))}</div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{listings.map((listing, index) => (
                                                <React.Fragment key={listing.id}>
                                                    <ListingCardGrid listing={listing} onGetQuoteClick={() => handleGetQuote(listing)}/>
                                                    {(index === 5 || index === 11) && <div className="sm:col-span-2"><PromotionalBanner /></div>}
                                                 </React.Fragment>
                                            ))}</div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div className="text-center py-10 bg-white rounded-lg">No spaces match your criteria.</div>
                            )
                        )}
                        <SimilarProductsCarousel items={listings.slice(0, 5)} onGetQuoteClick={handleGetQuote} />
                    </div>
                    <aside className="hidden lg:block lg:col-span-4">
                        <RightSidebar onTalkToExpert={() => setExpertModalOpen(true)} />
                    </aside>
                </div>
            </main>
            <Footer />
            {selectedListing && (<InstantQuoteModal isOpen={isQuoteModalOpen} onClose={() => setQuoteModalOpen(false)} listing={selectedListing} />)}
            {/* A placeholder for the Expert Modal */}
            {isExpertModalOpen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white p-8 rounded-lg">Expert Form Here <button onClick={() => setExpertModalOpen(false)}>Close</button></div></div>)}
        </div>
    );
}
