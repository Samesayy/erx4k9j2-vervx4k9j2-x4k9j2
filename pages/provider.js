// pages/provider.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Provider() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      if (data.session?.user) {
        fetchListings(data.session.user.id);
      }
    });
  }, []);

  const fetchListings = async (userId) => {
    let { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('owner_id', userId);
    if (!error) setListings(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Provider Dashboard
        </h1>
        {!user ? (
          <p className="text-medium-gray">Loading...</p>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-primary-dark mb-2">
              Your Listings
            </h2>
            <ul className="space-y-2">
              {listings.map((listing) => (
                <li
                  key={listing.id}
                  className="border border-medium-gray rounded p-4 bg-primary-light hover:shadow-lg transition-shadow"
                >
                  <p className="text-primary-dark">{listing.title}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
