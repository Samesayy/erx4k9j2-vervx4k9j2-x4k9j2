import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MapPin, Wifi, Coffee, Clock, Users, Building, Zap } from 'lucide-react';

// Import all necessary components
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SimilarWorkspaces from '../../components/SimilarWorkspaces';
import PromotionalBanner from '../../components/listing/PromotionalBanner';
import RightSidebar from '../../components/listing/RightSidebar'; // <-- Use the new container
import ImageGallery from '../../components/listing/details/ImageGallery';
import AmenitiesGrid from '../../components/listing/details/AmenitiesGrid';
import LocationMap from '../../components/listing/details/LocationMap';

// Page component now receives 'listing' and 'similarListings' as props
export default function ListingDetailPage({ listing, similarListings, error }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error || !listing) {
        return <div className="min-h-screen flex items-center justify-center">Listing not found.</div>;
    }
        
    const amenities = [
        { icon: <Wifi />, text: 'High-speed Wi-Fi' },
        { icon: <Coffee />, text: 'Free Tea/Coffee' },
        { icon: <Clock />, text: '24/7 Access' },
        { icon: <Users />, text: 'Community Events' },
        { icon: <Building />, text: 'Meeting Rooms' },
        { icon: <Zap />, text: 'Power Backup' },
    ];

    const pageTitle = `${listing.title} in ${listing.city?.name || ''} | Verve99`;

    return (
        <div className="bg-gray-50">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={listing.description || `Explore ${listing.title}, a premium workspace at ${listing.address}.`} />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-primary-dark tracking-tight">{listing.title}</h1>
                            <p className="flex items-center mt-2 text-md text-gray-600">
                                <MapPin size={16} className="mr-2 flex-shrink-0" /> {listing.address}, {listing.city?.name}
                            </p>
                        </div>
                        <ImageGallery title={listing.title} images={listing.images} />
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-2xl font-bold text-primary-dark mb-4">About This Workspace</h2>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                <p>{listing.description || 'A modern workspace designed for productivity.'}</p>
                            </div>
                        </div>
                        <AmenitiesGrid amenities={amenities} />
                        <LocationMap address={listing.address} />
                    </div>

                    <div className="lg:col-span-4">
                         <div className="lg:sticky top-28 self-start">
                            <RightSidebar listingId={listing.id} hostId={listing.host_id} />
                        </div>
                    </div>
                </div>

                {/* --- BANNERS AND CAROUSELS ADDED HERE --- */}
                <PromotionalBanner />
            </main>
            
            <SimilarWorkspaces similarListings={similarListings} />
            <Footer />
        </div>
    );
}

// --- UPDATED DATA FETCHING LOGIC ---
export async function getStaticProps(context) {
    const { id } = context.params;
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    try {
        // Fetch 1: The main listing
        const { data: listing, error: listingError } = await supabase
            .from('listings')
            .select(`*, images(*), city:cities(id, name)`)
            .eq('id', id)
            .single();

        if (listingError || !listing) {
            console.error(`Error fetching listing with ID ${id}:`, listingError);
            return { notFound: true };
        }

        // Fetch 2: Similar listings
        const { data: similarListings, error: similarError } = await supabase
            .from('listings')
            .select(`id, title, address, images(*), listing_space_types(space_type:space_types(name)), price_per_month`)
            .eq('city_id', listing.city.id) // Match by city ID
            .neq('id', id)                   // Exclude the current listing
            .limit(6);                       // Get up to 6 similar items

        if (similarError) {
            console.error('Error fetching similar listings:', similarError);
            // We don't fail the page if similar listings fail, just return an empty array
        }

        return {
            props: {
                listing,
                similarListings: similarListings || [], // Pass both to the page
            },
            revalidate: 3600,
        };
    } catch (error) {
        return { props: { error: 'Failed to load data.' } };
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: 'blocking' };
}