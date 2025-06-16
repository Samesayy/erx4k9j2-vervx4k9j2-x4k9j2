// pages/dashboard/guest/index.js
import { useState, useEffect, useCallback } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import AuthGuard from '../../../components/AuthGuard';
import Link from 'next/link';
import ListingCard from '../../../components/ListingCard';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function GuestDashboardPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [favoriteListings, setFavoriteListings] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Function to fetch the user's favorite listings
  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    setLoadingFavorites(true);
    
    const { data: favoriteRelations } = await supabase.from('favorites').select('listing_id').eq('user_id', user.id);
    if (favoriteRelations && favoriteRelations.length > 0) {
      const listingIds = favoriteRelations.map(f => f.listing_id);
      const { data: listings } = await supabase.from('listings').select('*, city:cities(name)').in('id', listingIds);
      setFavoriteListings(listings || []);
    } else {
      setFavoriteListings([]);
    }
    setLoadingFavorites(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = async (listingId, newStatus) => {
    if (!user) return;
    if (newStatus) {
      await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId });
    } else {
      await supabase.from('favorites').delete().match({ user_id: user.id, listing_id: listingId });
    }
    // Refresh the list after a change
    fetchFavorites();
  };
  
  // --- NEW: Function to handle becoming a host ---
  const handleBecomeHost = async () => {
    if(!confirm("Are you sure you want to become a host? You'll be able to list your own properties.")) {
        return;
    }

    setIsUpgrading(true);
    try {
        const { error } = await supabase
            .from('profiles')
            .update({ is_host: true })
            .eq('id', user.id);
            
        if (error) throw error;

        alert("Congratulations! You are now a host.");
        // Redirect to the form so they can create their first listing right away
        router.push('/list-your-space');

    } catch(error) {
        alert("Error: " + error.message);
    } finally {
        setIsUpgrading(false);
    }
  };


  return (
    <AuthGuard>
      <div className="min-h-screen bg-primary-light">
          <Navbar />
          <main>
            <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                <div className="px-4 space-y-12">
                
                    {/* --- NEW: Become a Host Section --- */}
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-primary-dark">Ready to list your own space?</h2>
                        <p className="mt-2 text-medium-gray max-w-xl mx-auto">Join our community of hosts and turn your extra space into your next opportunity. It's free to list and you're in full control.</p>
                        <button
                            onClick={handleBecomeHost}
                            disabled={isUpgrading}
                            className="mt-6 px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-accent transition-transform hover:scale-105 disabled:bg-gray-400"
                        >
                            {isUpgrading ? 'Upgrading...' : 'Become a Host'}
                        </button>
                    </div>

                    {/* My Favorite Workspaces Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-primary-dark">My Favorite Workspaces</h2>
                        {loadingFavorites ? (
                            <p className="mt-4 text-medium-gray">Loading your favorites...</p>
                        ) : favoriteListings.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {favoriteListings.map(listing => (
                                    <ListingCard
                                        key={listing.id}
                                        listing={listing}
                                        isFavorited={true}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-6 text-center py-12 px-6 bg-white rounded-lg border">
                                <h3 className="text-lg font-medium text-primary-dark">You haven't saved any spaces yet.</h3>
                                <p className="mt-1 text-sm text-medium-gray">Click the heart icon on any listing to save it here for later.</p>
                                <div className="mt-6">
                                    <Link href="/listing" className="px-5 py-2.5 bg-brand-primary text-white rounded-lg font-semibold hover:bg-accent">
                                        Explore Spaces
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </main>
          <Footer />
      </div>
    </AuthGuard>
  );
}