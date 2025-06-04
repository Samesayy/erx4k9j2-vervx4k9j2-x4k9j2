// pages/search.js

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';

export default function Search({ query }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      let { data, error } = await supabase
        .from('listings')
        .select('*')
        .ilike('title', `%${query}%`);
      if (!error) setListings(data);
    };
    fetchListings();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-primary-light py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">
            Search Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return { props: { query: query.query || '' } };
}
