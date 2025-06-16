// pages/dashboard/host/listings.js
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import AuthGuard from '../../../components/AuthGuard';
import HostDashboardLayout from '../../../components/dashboard/HostDashboardLayout';
import Link from 'next/link';

export default function MyListingsPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from('listings')
          .select('id, title, city_id, is_verified, cities(name)') // Join with cities table to get name
          .eq('host_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching listings:', error);
        } else {
          setListings(data);
        }
        setLoading(false);
      }
    };
    fetchListings();
  }, [user, supabase]);

  return (
    <AuthGuard allowedRoles={['host']}>
      <HostDashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-dark">My Listings</h1>
          <Link href="/list-your-space" className="px-4 py-2 bg-brand-primary text-white text-sm rounded-md font-semibold hover:bg-accent">
            + Add New
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          {loading ? (
            <p>Loading your listings...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.cities?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {listing.is_verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/listing/${listing.id}`} className="text-brand-primary hover:text-accent mr-4">View</Link>
                        <Link href={`/dashboard/host/edit/${listing.id}`} className="text-brand-primary hover:text-accent">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </HostDashboardLayout>
    </AuthGuard>
  );
}