// pages/commercial-spaces.js
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CommercialSpaceCard from '../components/CommercialSpaceCard';

export default function CommercialSpacesPage() {
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for filters
  const [cityFilter, setCityFilter] = useState('');
  const [minArea, setMinArea] = useState('');
  const [fitOutStatus, setFitOutStatus] = useState('');

  const fetchCommercialSpaces = useCallback(async () => {
    setLoading(true);
    
    let query = supabase
      .from('listings')
      .select(`
        *,
        city:cities ( name ),
        commercial_details (*)
      `)
      .eq('category', 'commercial');

    // Apply filters
    if (cityFilter) {
      query = query.eq('city.name', cityFilter);
    }
    if (minArea) {
      query = query.gte('commercial_details.total_area_sq_ft', minArea);
    }
    if (fitOutStatus) {
      query = query.eq('commercial_details.is_furnished', fitOutStatus === 'furnished');
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching commercial spaces:", error.message);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  }, [supabase, cityFilter, minArea, fitOutStatus]);

  useEffect(() => {
    fetchCommercialSpaces();
  }, [fetchCommercialSpaces]);

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>Commercial Properties for Lease | Verve99</title>
        <meta name="description" content="Explore long-term commercial office and retail spaces for lease across India." />
      </Head>
      <Navbar />

      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
              Commercial Properties for Lease
            </h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
              Find the perfect long-term space for your business's next chapter.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="text" 
              placeholder="Filter by City" 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary"
            />
            <input 
              type="number" 
              placeholder="Min. Area (sq. ft)" 
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary"
            />
            <select
                value={fitOutStatus}
                onChange={(e) => setFitOutStatus(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary"
            >
                <option value="">All Fit-Outs</option>
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished / Bare</option>
            </select>
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="text-center py-16">Loading properties...</div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <CommercialSpaceCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg border">
              <h3 className="text-lg font-medium text-primary-dark">No properties match your criteria.</h3>
              <p className="mt-1 text-sm text-medium-gray">
                Try adjusting your filters to see all available listings.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}