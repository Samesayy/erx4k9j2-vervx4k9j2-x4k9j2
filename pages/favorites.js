import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { FavoritesContext } from '../lib/favoritesContext';
import { supabase } from '../lib/supabaseClient';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) {
      setListings([]);
      return;
    }
    const fetchFavs = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .in('id', favorites);
      if (!error) setListings(data);
    };
    fetchFavs();
  }, [favorites]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-6">My Favorites</h1>
        {listings.length === 0 ? (
          <p className="text-medium-gray">No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
