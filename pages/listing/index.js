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

// --- ALL SUB-COMPONENTS ARE NOW FULLY DEFINED WITHIN THIS FILE ---

// --- 1. ADVANCED FILTER COMPONENT ---
const AdvancedFilterBar = ({ onApplyFilters, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => { setFilters(initialFilters); }, [initialFilters]);

    const handleApply = () => { onApplyFilters(filters); };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: (prev.brands || []).includes(brand) ? (prev.brands || []).filter(b => b !== brand) : [...(prev.brands || []), brand]
        }));
    };
    
    const FilterDropdown = ({ label, children, widthClass = "w-72" }) => {
        const [isOpen, setIsOpen] = useState(false);
        const ref = useRef(null);
        useEffect(() => {
            const handleClickOutside = (event) => { if (ref.current && !ref.current.contains(event.target)) setIsOpen(false); };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [ref]);
        return (
            <div className="relative" ref={ref}>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full h-10 px-4 text-left border border-gray-300 rounded-md text-sm flex justify-between items-center bg-white hover:border-gray-400">
                    <span className="truncate text-gray-500">{label}</span>
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className={`absolute top-full mt-2 ${widthClass} bg-white p-4 rounded-lg shadow-2xl border z-20`}>
                        {children}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm mb-6 border">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <select name="product" value={filters.product} onChange={handleChange} className="h-10 px-3 border border-gray-300 rounded-md text-sm">
                    <option>Coworking Space</option><option>Private Office</option><option>Meeting Room</option>
                </select>
                <select name="city" value={filters.city} onChange={handleChange} className="h-10 px-3 border border-gray-300 rounded-md text-sm">
                    <option value="">All Cities</option><option>Delhi</option><option>Gurgaon</option><option>Mumbai</option>
                </select>
                <input type="text" name="location" placeholder="Search Locality..." value={filters.location} onChange={handleChange} className="h-10 px-3 border border-gray-300 rounded-md text-sm"/>
                <div className="hidden lg:block">
                    <FilterDropdown label="Brands">
                        {['WeWork', 'Regus', 'CoWrks'].map(brand => (<label key={brand} className="flex items-center space-x-2 text-sm p-1"><input type="checkbox" name="brands" value={brand} checked={filters.brands.includes(brand)} onChange={() => handleCheckboxChange('brands', brand)} className="h-4 w-4 rounded text-brand-primary focus:ring-0"/><span>{brand}</span></label>))}
                    </FilterDropdown>
                </div>
                <button onClick={() => setShowMore(!showMore)} className="h-10 flex items-center justify-center gap-2 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200">
                    <SlidersHorizontal size={16} /> More Filters
                </button>
            </div>
            <AnimatePresence>
                {showMore && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-6 mt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div>
                                <label className="text-sm font-semibold mb-2 block">Parking</label>
                                <select name="parking" value={filters.parking} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm"><option value="">Any</option><option value="car">Car Parking</option><option value="bike">Bike Parking</option></select>
                           </div>
                           <div>
                                <label className="text-sm font-semibold mb-2 block">Metro Connectivity</label>
                                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"><Train size={16} className="text-gray-500" /><label htmlFor="metro" className="text-sm text-gray-700">Near Metro</label><input type="checkbox" id="metro" name="metro" checked={filters.metro} onChange={handleChange} className="h-4 w-4 rounded text-brand-primary ml-auto"/></div>
                           </div>
                           <div>
                                <label className="text-sm font-semibold mb-2 block">Price Range: ₹{filters.priceRange[1].toLocaleString()}</label>
                                <input type="range" min="0" max="50000" step="1000" value={filters.priceRange[1]} onChange={e => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})} className="w-full"/>
                           </div>
                           <div className="md:col-span-3 flex justify-end gap-4"><button onClick={() => setShowMore(false)} className="px-6 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">Cancel</button><button onClick={handleApply} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md">Apply Filters</button></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- 2. DETAILED LISTING CARD ---
const ListingCardList = ({ listing, onGetQuoteClick }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = listing?.images?.length > 0 ? listing.images : ['https://placehold.co/800x600/ECF0F1/2C3E50?text=Verve99'];
  const spaceTypes = listing?.listing_space_types?.map(st => st?.space_type?.name).filter(Boolean).join(' • ') || 'Flexible Workspace';
  const nextImage = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentImage(prev => (prev + 1) % images.length); };
  const prevImage = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentImage(prev => (prev - 1 + images.length) % images.length);};
  return (
    <motion.div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-6 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link href={`/listing/${listing.id}`} className="w-full md:w-1/3 h-56 md:h-auto relative group flex-shrink-0">
        <AnimatePresence mode="wait"><motion.div key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full"><Image src={images[currentImage]} alt={listing.title || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></motion.div></AnimatePresence>
        <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"><button onClick={prevImage} className="p-2 bg-black/40 text-white rounded-full ml-2 hover:bg-black/60"><ChevronLeft size={20}/></button><button onClick={nextImage} className="p-2 bg-black/40 text-white rounded-full mr-2 hover:bg-black/60"><ChevronRight size={20}/></button></div>
      </Link>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start"><h3 className="font-bold text-lg text-primary-dark pr-4">{listing.title}</h3><div className="text-right flex-shrink-0"><p className="text-xl font-bold text-brand-primary">₹{listing.price_per_month?.toLocaleString()}</p><p className="text-xs text-medium-gray">per seat/month</p></div></div>
          <p className="text-sm text-medium-gray flex items-center mt-1"><MapPin size={14} className="mr-1" /> {listing.address}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600"><div className="flex items-center"><Clock size={14} className="mr-2 text-brand-primary" />{listing.amenities?.includes('24/7 Access') ? '24/7 Access' : 'Standard Hours'}</div><div className="flex items-center"><Train size={14} className="mr-2 text-brand-primary" />{listing.metro_nearby ? 'Metro Connected' : 'Metro Connected'}</div></div>
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
        <motion.div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group h-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Link href={`/listing/${listing.id}`} className="relative h-40 block"><Image src={imageUrl} alt={listing?.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" /></Link>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div><h3 className="font-bold text-md text-primary-dark truncate">{listing?.title}</h3><p className="text-sm text-medium-gray">{listing?.city?.name}</p></div>
                <div className="flex justify-between items-end mt-3 pt-3 border-t"><p className="text-lg font-bold text-brand-primary">₹{listing?.price_per_month?.toLocaleString()}</p><button onClick={() => onGetQuoteClick(listing)} className="px-3 py-1 text-xs bg-brand-primary font-semibold text-white rounded-md hover:bg-accent hover:text-primary-dark transition-colors">Get Quote</button></div>
            </div>
        </motion.div>
    );
};

// --- RIGHT SIDEBAR WITH INTERACTIVE FORM ---
const RightSidebar = () => {
    const [showExpertForm, setShowExpertForm] = useState(false);
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
                <h3 className="font-bold text-lg">Get Best Price at Verve99</h3>
                <p className="text-sm text-gray-500 mt-2">No brokerage fee, priority services, and expert assistance.</p>
                {!showExpertForm && <button onClick={() => setShowExpertForm(true)} className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90"><MessageSquare size={16} /> Talk to an Expert</button>}
                <AnimatePresence>{showExpertForm && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4 text-left"><form className="space-y-3"><input type="text" placeholder="Name" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/><input type="tel" placeholder="Phone" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/><div className="flex gap-2 pt-2"><button type="button" onClick={() => setShowExpertForm(false)} className="w-1/3 text-xs text-gray-600 hover:underline">Cancel</button><button type="submit" className="w-2/3 bg-accent text-primary-dark font-semibold py-2 rounded-md text-sm">Submit</button></div></form></motion.div>)}</AnimatePresence>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                {whyVerve99.map(item => (<div key={item.title} className="flex items-start mb-4 last:mb-0"><div className="p-2 bg-brand-primary/10 rounded-full mr-4 text-brand-primary">{React.cloneElement(item.icon, {size: 20})}</div><div><h4 className="font-semibold text-primary-dark">{item.title}</h4><p className="text-xs text-gray-600">{item.text}</p></div></div>))}
            </div>
        </div>
    );
};

// --- PROMOTIONAL BANNER ---
const PromotionalBanner = ({ type = 'support' }) => {
    const banners = {
        support: { bg: 'bg-gradient-to-r from-primary-dark to-gray-800', text: 'text-white', title: 'Still Deciding? Let Us Help.', desc: 'Our workspace experts can provide personalized recommendations free of charge.', buttonClass: 'bg-accent text-primary-dark' },
        partner: { bg: 'bg-gradient-to-r from-accent to-yellow-400', text: 'text-primary-dark', title: 'Have a Property to List?', desc: 'Join our network and turn your space into a new revenue stream.', buttonClass: 'bg-primary-dark text-white' }
    };
    const current = banners[type];
    return (<div className={`my-8 p-8 rounded-xl text-center ${current.bg} ${current.text}`}><h3 className="text-2xl font-bold">{current.title}</h3><p className="mt-2 text-sm opacity-90 max-w-xl mx-auto">{current.desc}</p><button className={`mt-4 px-6 py-2 font-semibold rounded-md ${current.buttonClass}`}>Request a Callback</button></div>);
};

// --- SIMILAR PRODUCTS CAROUSEL ---
const SimilarProductsCarousel = ({ items, onGetQuoteClick }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">Similar Workspaces Nearby</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
                {items.map(listing => (
                    <div key={listing.id} className="w-80 flex-shrink-0 h-96">
                        <ListingCardGrid listing={listing} onGetQuoteClick={() => onGetQuoteClick(listing)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- RESULTS HEADER ---
const ResultsHeader = ({ count, viewMode, setViewMode, filters }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-primary-dark">{filters.product} in {filters.city} <span className="text-medium-gray font-normal">({count} results)</span></h2>
        <div className="flex items-center gap-2"><div className="flex items-center gap-1 bg-gray-200 p-1 rounded-md"><button title="List View" onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}><List size={20} /></button><button title="Grid View" onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}><LayoutGrid size={20} /></button></div></div>
    </div>
);


// --- MAIN PAGE ---
export default function MasterListingPage() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [viewMode, setViewMode] = useState('list');
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [filters, setFilters] = useState({ product: 'Coworking Space', city: 'Delhi', location: '', brands: [], parking: '', priceRange: [0, 50000], metro: false });

    const LISTINGS_PER_PAGE = 12;

    const fetchData = useCallback(async (currentFilters, pageToFetch, shouldAppend = false) => {
        setLoading(true);
        let query = supabase.from('listings').select('*, city:cities(name), listing_space_types(space_type:space_types(name))', { count: 'exact' });
        // Apply filters...
        if (currentFilters.city) query = query.eq('city.name', currentFilters.city);
        if (currentFilters.product) query = query.eq('listing_space_types.space_type.name', currentFilters.product);
        
        const from = pageToFetch * LISTINGS_PER_PAGE;
        const to = from + LISTINGS_PER_PAGE - 1;
        query = query.range(from, to);
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) {
            console.error("Error fetching listings:", error.message);
        } else {
            setListings(prev => shouldAppend ? [...prev, ...(data || [])] : (data || []));
            setHasMore((data || []).length === LISTINGS_PER_PAGE);
        }
        setLoading(false);
    }, [supabase]);
    
    useEffect(() => {
        if(router.isReady) {
            const initialFilters = { product: router.query.service || 'Coworking Space', city: router.query.city || 'Delhi', location: '', brands: [], parking: '', priceRange: [0, 50000], metro: false };
            setFilters(initialFilters);
            setPage(0);
            setListings([]);
            fetchData(initialFilters, 0);
        }
    }, [router.isReady, router.query.service, router.query.city, fetchData]);
  
    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
        setPage(0);
        setListings([]);
        fetchData(newFilters, 0);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(filters, nextPage, true);
    };

    const handleGetQuote = (listing) => { setSelectedListing(listing); setIsModalOpen(true); };

    return (
        <div className="bg-primary-light">
            <Head><title>Find {filters.product} in {filters.city} | Verve99</title></Head>
            <Navbar />
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <AdvancedFilterBar onApplyFilters={handleFilterApply} initialFilters={filters} />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                        <div className="lg:col-span-8">
                            <ResultsHeader count={listings.length} viewMode={viewMode} setViewMode={setViewMode} filters={filters} />
                            {loading && listings.length === 0 ? <p className="text-center py-10">Loading...</p> : (
                                listings.length > 0 ? (
                                    <AnimatePresence mode="wait">
                                        <motion.div key={viewMode}>
                                            {viewMode === 'list' ? (
                                                <div>{listings.map((listing, index) => (
                                                    <React.Fragment key={listing.id}>
                                                        <ListingCardList listing={listing} onGetQuoteClick={() => handleGetQuote(listing)}/>
                                                        {(index === 5) && <PromotionalBanner type="support" />}
                                                        {(index === 11) && <PromotionalBanner type="partner" />}
                                                    </React.Fragment>
                                                ))}</div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{listings.map((listing, index) => (
                                                    <React.Fragment key={listing.id}>
                                                        <ListingCardGrid listing={listing} onGetQuoteClick={() => handleGetQuote(listing)}/>
                                                        {(index === 5 || index === 11) && <div className="sm:col-span-2"><PromotionalBanner type={index === 5 ? 'support' : 'partner'}/></div>}
                                                     </React.Fragment>
                                                ))}</div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-lg">No spaces match your criteria.</div>
                                )
                            )}
                            {hasMore && !loading && (
                                <div className="text-center mt-8">
                                    <button onClick={loadMore} className="px-8 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-100">
                                        {loading ? 'Loading...' : 'Load More'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <aside className="hidden lg:block lg:col-span-4"><RightSidebar /></aside>
                    </div>
                </div>
                 {/* Full-width carousel section */}
                <section className="mt-20 py-16 bg-white border-t">
                    <div className="max-w-7xl mx-auto px-4">
                        <SimilarProductsCarousel items={listings.slice(0, 5)} onGetQuoteClick={handleGetQuote} />
                    </div>
                </section>
            </main>
            <Footer />
            {selectedListing && (<InstantQuoteModal isOpen={isModalOpen} onClose={() => setSelectedListing(null)} defaultOfficeType={selectedListing?.listing_space_types[0]?.space_type?.name} />)}
        </div>
    );
}
