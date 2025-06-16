// pages/dashboard/host/index.js
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import AuthGuard from '../../../components/AuthGuard';
import HostDashboardLayout from '../../../components/dashboard/HostDashboardLayout';
import Link from 'next/link';

export default function HostDashboardPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [stats, setStats] = useState({ listingCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        // Fetch total number of listings for the current host
        const { count, error } = await supabase
          .from('listings')
          .select('id', { count: 'exact', head: true })
          .eq('host_id', user.id);

        if (error) {
          console.error('Error fetching stats:', error);
        } else {
          setStats({ listingCount: count });
        }
      }
    };

    fetchStats();
  }, [user, supabase]);

  return (
    <AuthGuard allowedRoles={['host']}>
      <HostDashboardLayout>
        <h1 className="text-3xl font-bold text-primary-dark mb-6">Welcome back!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-medium-gray">Total Listings</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">{stats.listingCount}</p>
          </div>
          {/* Placeholder Stat Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-medium-gray">Total Bookings (30d)</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-medium-gray">New Messages</h3>
            <p className="text-4xl font-bold text-brand-primary mt-2">0</p>
          </div>
        </div>

        <div className="mt-10">
            <Link href="/list-your-space" className="px-6 py-3 bg-brand-primary text-white rounded-md font-semibold hover:bg-accent">
                + Add New Listing
            </Link>
        </div>
      </HostDashboardLayout>
    </AuthGuard>
  );
}