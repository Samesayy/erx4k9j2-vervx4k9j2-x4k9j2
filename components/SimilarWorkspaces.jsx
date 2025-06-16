// components/SimilarWorkspaces.jsx
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ListingCard from './ListingCard'; // We reuse the same card

export default function SimilarWorkspaces({ currentListingId, cityId }) {
  const supabase = useSupabaseClient();
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!cityId || !currentListingId) return;

      setLoading(true);
      
      // Fetch up to 6 other listings from the same city, excluding the current one
      const { data, error } = await supabase
        .from('listings')
        .select('*, city:cities(name)')
        .eq('city_id', cityId)
        .neq('id', currentListingId) // Exclude the current listing
        .limit(6);

      if (error) {
        console.error("Error fetching similar workspaces:", error);
      } else {
        setSimilarListings(data);
      }
      setLoading(false);
    };

    fetchSimilar();
  }, [cityId, currentListingId, supabase]);

  if (loading || similarListings.length === 0) {
    // Don't render the section if there's nothing to show or it's loading
    return null;
  }

  return (
    <div className="bg-primary-light py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-dark mb-8">
          Similar Workspaces
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarListings.map((listing) => (
            // THIS IS THE CORRECTED PART
            <ListingCard
              key={listing.id}
              listing={listing}
              // Favorites are not needed here, so we don't pass those props
            />
          ))}
        </div>
      </div>
    </div>
  );
}