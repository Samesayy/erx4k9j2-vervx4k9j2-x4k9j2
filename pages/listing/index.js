// pages/listing/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';

// Corrected Import paths for pages/listing/index.js
import Breadcrumbs from '../../components/common/Breadcrumbs';
import AdvancedFilterBar from '../../components/listing/AdvancedFilterBar';
import FilterSidebar from '../../components/filters/FilterSidebar';
import SortDropdown from '../../components/filters/SortDropdown';
import ListingCardGrid from '../../components/listing/ListingCardGrid';
import ListingCardList from '../../components/listing/ListingCardList';
import PromotionalBanner from '../../components/listing/PromotionalBanner';
import RightSidebar from '../../components/listing/RightSidebar';
import ChooseOfficeTypeBanner from '../../components/banners/ChooseOfficeTypeBanner';
import GetBestPricesBanner from '../../components/banners/GetBestPricesBanner';
import InGridPromoBanner from '../../components/banners/InGridPromoBanner';
import SimilarWorkspacesCarousel from '../../components/listing/SimilarWorkspacesCarousel';

// Initialize Supabase (replace with your actual Supabase URL and public key)
// Ensure these are correctly configured in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ListingDiscoveryPage() { // Renamed the component to be more specific
    const router = useRouter();
    const [listings, setListings] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        product: '',
        city: '',
        location: '',
        priceMax: 100000,
        parking: [],
        brands: [],
        date: '',
        metro: false,
        verified: false,
    });
    const [sortBy, setSortBy] = useState({ field: 'created_at', asc: false });

    // Populate filters from URL query parameters on initial load
    useEffect(() => {
        if (router.isReady) {
            const { service, city, location, priceMax } = router.query;
            setFilters(prevFilters => ({
                ...prevFilters,
                product: service || prevFilters.product,
                city: city || prevFilters.city,
                location: location || prevFilters.location,
                priceMax: priceMax ? Number(priceMax) : prevFilters.priceMax,
            }));
        }
    }, [router.isReady, router.query]);


    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            setError(null);
            let query = supabase.from('listings').select('*');

            // Apply filters
            if (filters.product) {
                query = query.ilike('service', `%${filters.product}%`);
            }
            if (filters.city) {
                query = query.ilike('city', `%${filters.city}%`);
            }
            if (filters.location) {
                query = query.ilike('location', `%${filters.location}%`);
            }
            if (filters.priceMax) {
                query = query.lte('budgetPerSeat', filters.priceMax);
            }
            if (filters.parking.length > 0) {
                query = query.contains('parking', filters.parking);
            }
            if (filters.brands.length > 0) {
                query = query.in('brand', filters.brands);
            }
            if (filters.metro) {
                query = query.eq('metro_nearby', true);
            }
            if (filters.verified) {
                query = query.eq('verified', true);
            }
            if (filters.date) {
                query = query.gte('available_from', filters.date);
            }

            // Apply sorting
            query = query.order(sortBy.field, { ascending: sortBy.asc });

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching listings:', error);
                setError('Failed to fetch listings. Please try again.');
            } else {
                setListings(data);
            }
            setLoading(false);
        };

        // Only fetch when filters change or sort order changes, and router is ready
        if (router.isReady) {
            fetchListings();
        }
    }, [filters, sortBy, router.isReady]);


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Update URL query parameters to reflect filters
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                service: newFilters.product,
                city: newFilters.city,
                location: newFilters.location,
                priceMax: newFilters.priceMax,
                // Add other filters if you want them in the URL
            },
        }, undefined, { shallow: true });
    };

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    };

    const handleGetQuoteClick = (listing) => {
        console.log('Get a quote for:', listing.name);
        alert(`Requesting a quote for ${listing.name}. Experts will contact you!`);
    };

    const handleExpertTalk = () => {
        alert('Connecting you with an expert!');
    };

    const handleCallbackRequest = () => {
        alert('Callback requested! Our team will reach out soon.');
    };

    const handleEnquirySubmit = (formData) => {
        console.log('Enquiry submitted:', formData);
        alert('Thank you for your enquiry! We will contact you shortly.');
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Listings', href: '/listing' },
        { label: filters.city || 'All Cities', href: `/listing?city=${filters.city}` },
        { label: filters.product || 'Workspaces' }
    ];

    const dummySimilarListings = [
        {
            id: 'similar-1', name: 'Innovate Hub Sector 18', location: 'Sector 18', city: 'Gurgaon',
            budgetPerSeat: 15000, service: 'Coworking Space', images: ['https://source.unsplash.com/random/800x600?office,modern', 'https://source.unsplash.com/random/800x600?coworking,space'],
            metro_nearby: true, parking: ['Car Parking']
        },
        {
            id: 'similar-2', name: 'Creative Zone Cyber City', location: 'Cyber City', city: 'Gurgaon',
            budgetPerSeat: 18000, service: 'Private Office', images: ['https://source.unsplash.com/random/800x600?workspace,design', 'https://source.unsplash.com/random/800x600?office,minimalist'],
            metro_nearby: false, parking: []
        },
        {
            id: 'similar-3', name: 'Tech Park Flexi Desks', location: 'DLF Phase 3', city: 'Gurgaon',
            budgetPerSeat: 12000, service: 'Day Pass', images: ['https://source.unsplash.com/random/800x600?desk,light', 'https://source.unsplash.com/random/800x600?work,area'],
            metro_nearby: true, parking: ['Motorcycle Parking']
        },
    ];

    return (
        <div className="min-h-screen bg-primary-light">
            <Head>
                <title>Workspace Listings - Verve99</title>
                <meta name="description" content="Find your perfect coworking space, private office, or meeting room with Verve99." />
            </Head>

            <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-primary-dark">Verve99 Workspaces</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={breadcrumbItems} />

                {/* Advanced Filter Bar (sticky) */}
                <AdvancedFilterBar filters={filters} onFiltersChange={handleFilterChange} />

                <div className="lg:flex lg:space-x-8">
                    {/* Left Sidebar for Filters */}
                    <aside className="lg:w-1/4 sticky top-[220px] h-fit hidden lg:block bg-white p-6 rounded-2xl shadow-glass border">
                        <h2 className="text-xl font-bold text-primary-dark mb-4">Refine Your Search</h2>
                        <FilterSidebar filters={filters} onChange={handleFilterChange} />
                    </aside>

                    {/* Main Content Area */}
                    <section className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-primary-dark">
                                {filters.city || 'All'} {filters.product || 'Workspaces'}
                            </h2>
                            <div className="flex items-center space-x-4">
                                <SortDropdown sortBy={sortBy} onChange={handleSortChange} />
                                <div className="flex bg-white rounded-md shadow-sm border">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-l-md ${viewMode === 'grid' ? 'bg-brand-primary text-white' : 'text-primary-dark hover:bg-gray-100'}`}
                                        aria-label="Grid View"
                                    >
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-r-md ${viewMode === 'list' ? 'bg-brand-primary text-white' : 'text-primary-dark hover:bg-gray-100'}`}
                                        aria-label="List View"
                                    >
                                        List
                                    </button>
                                </div>
                            </div>
                        </div>

                        {loading && <p className="text-center text-medium-gray text-lg">Loading amazing workspaces...</p>}
                        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

                        {!loading && listings.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-xl text-medium-gray mb-4">No workspaces found matching your criteria.</p>
                                <p className="text-md text-medium-gray">Try adjusting your filters or search terms.</p>
                            </div>
                        )}

                        {/* Listing Cards */}
                        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
                            {listings.map((listing, index) => (
                                <React.Fragment key={listing.id}>
                                    {viewMode === 'grid' ? (
                                        <ListingCardGrid listing={listing} onGetQuoteClick={handleGetQuoteClick} />
                                    ) : (
                                        <ListingCardList listing={listing} onGetQuoteClick={handleGetQuoteClick} />
                                    )}
                                    {/* Insert InGridPromoBanner after every 6th listing in grid view or 3rd in list view */}
                                    {viewMode === 'grid' && (index + 1) % 6 === 0 && (
                                        <div className="col-span-full md:col-span-2 lg:col-span-3">
                                            <InGridPromoBanner onExpertClick={handleExpertTalk} />
                                        </div>
                                    )}
                                    {viewMode === 'list' && (index + 1) % 3 === 0 && (
                                        <InGridPromoBanner onExpertClick={handleExpertTalk} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Promotional Banners */}
                        <PromotionalBanner onCallbackRequest={handleCallbackRequest} />
                        <ChooseOfficeTypeBanner />
                        <GetBestPricesBanner />

                        {/* Similar Workspaces Carousel */}
                        <SimilarWorkspacesCarousel similarListings={dummySimilarListings} />

                    </section>

                    {/* Right Sidebar */}
                    <aside className="lg:w-1/4 hidden lg:block">
                        <RightSidebar onEnquirySubmit={handleEnquirySubmit} />
                    </aside>
                </div>
            </main>
        </div>
    );
}