// pages/hill-station-workspaces.js
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import HillStationCard from '../components/HillStationCard';

export default function HillStationPage() {
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHillStationSpaces = useCallback(async () => {
    setLoading(true);
    
    // Fetch only listings marked as scenic locations
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        city:cities ( name )
      `)
      .eq('is_scenic_location', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching hill station spaces:", error.message);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchHillStationSpaces();
  }, [fetchHillStationSpaces]);

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>Hill Station Workspaces | Verve99</title>
        <meta name="description" content="Find inspiring workspaces in serene mountain and scenic destinations across India." />
      </Head>
      <Navbar />

      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
              Work From the Mountains
            </h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
              Discover unique and inspiring workspaces in India's most serene and scenic destinations.
            </p>
          </div>

          {/* Listings Grid - More spacious layout */}
          {loading ? (
            <div className="text-center py-16">Loading inspiring spaces...</div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {listings.map((listing) => (
                <HillStationCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg border">
              <h3 className="text-lg font-medium text-primary-dark">No scenic workspaces listed yet.</h3>
              <p className="mt-1 text-sm text-medium-gray">
                Check back soon as we expand our network to more inspiring locations.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}