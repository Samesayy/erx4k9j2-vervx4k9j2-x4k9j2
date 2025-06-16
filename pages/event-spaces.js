// pages/event-spaces.js
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import EventSpaceCard from '../components/EventSpaceCard';

export default function EventSpacesPage() {
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for filters
  const [cityFilter, setCityFilter] = useState('');
  const [minCapacity, setMinCapacity] = useState('');

  const fetchEventSpaces = useCallback(async () => {
    setLoading(true);
    
    let query = supabase
      .from('listings')
      .select(`
        *,
        city:cities ( name ),
        event_details (*)
      `)
      .eq('category', 'event'); // Fetch only event spaces

    // Apply filters
    if (cityFilter) {
      query = query.eq('city.name', cityFilter);
    }
    if (minCapacity) {
      query = query.gte('event_details.max_capacity', minCapacity);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching event spaces:", error.message);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  }, [supabase, cityFilter, minCapacity]);

  useEffect(() => {
    fetchEventSpaces();
  }, [fetchEventSpaces]);

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>Event Spaces for Every Occasion | Verve99</title>
        <meta name="description" content="Discover and book unique event spaces for your next corporate meeting, workshop, or conference." />
      </Head>
      <Navbar />

      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
              Spaces for Every Occasion
            </h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
              From corporate conferences to creative workshops, find the perfect venue for your next event.
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
              placeholder="Minimum Guest Capacity" 
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary"
            />
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="text-center py-16">Loading event spaces...</div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <EventSpaceCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg border">
              <h3 className="text-lg font-medium text-primary-dark">No event spaces match your criteria.</h3>
              <p className="mt-1 text-sm text-medium-gray">
                Try removing your filters to see all available venues.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}