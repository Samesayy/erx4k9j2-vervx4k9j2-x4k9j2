// pages/warehousing.js
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import WarehouseCard from '../components/WarehouseCard';

// Custom hook for debouncing input
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function WarehousingPage() {
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for immediate input values
  const [cityInput, setCityInput] = useState('');
  const [minSqFtInput, setMinSqFtInput] = useState('');

  // Debounced values that will trigger the API call
  const debouncedCityFilter = useDebounce(cityInput, 500);
  const debouncedMinSqFt = useDebounce(minSqFtInput, 500);

  const fetchWarehouses = useCallback(async () => {
    setLoading(true);
    
    let query = supabase
      .from('listings')
      .select(`
        id, title, images, price_per_sq_ft,
        city:cities ( name ),
        logistics_details (*)
      `)
      .eq('category', 'logistics');

    // CORRECTED: Filtering on related tables
    if (debouncedCityFilter) {
      // The filter should be on the actual table name, not the alias.
      query = query.ilike('cities.name', `%${debouncedCityFilter}%`);
    }
    if (debouncedMinSqFt) {
      // Same logic applies here for the one-to-one joined table.
      query = query.gte('logistics_details.total_sq_ft', debouncedMinSqFt);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching warehouses:", error.message);
      // It's helpful to provide feedback to the user on error
      setListings([]);
    } else {
      setListings(data || []);
    }
    setLoading(false);
  }, [supabase, debouncedCityFilter, debouncedMinSqFt]);

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>Warehouse & Storage Solutions | Verve99</title>
        <meta name="description" content="Find and book warehouses, storage units, and e-commerce fulfillment centers across India." />
      </Head>
      <Navbar />

      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">Warehouse & Storage Solutions</h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">Discover secure, scalable logistics spaces to power your business growth.</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="text" 
              placeholder="Filter by City (e.g., Mumbai)" 
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
            />
            <input 
              type="number" 
              placeholder="Min. Square Feet" 
              value={minSqFtInput}
              onChange={(e) => setMinSqFtInput(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
            />
          </div>

          {loading ? (
            <div className="text-center py-16">Loading facilities...</div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <WarehouseCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg border">
              <h3 className="text-lg font-medium text-primary-dark">No facilities match your criteria.</h3>
              <p className="mt-1 text-sm text-medium-gray">Try removing some filters to see all available listings.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
