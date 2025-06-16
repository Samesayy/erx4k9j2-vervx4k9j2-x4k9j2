// pages/dashboard/host/bookings.js
import { useState, useEffect, useCallback } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import AuthGuard from '../../../components/AuthGuard';
import HostDashboardLayout from '../../../components/dashboard/HostDashboardLayout';
import { format } from 'date-fns';

const StatusBadge = ({ status }) => {
  const baseStyle = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  const styles = {
    pending_approval: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    declined_by_host: "bg-red-100 text-red-800",
    cancelled_by_guest: "bg-gray-100 text-gray-800",
  };
  return <span className={`${baseStyle} ${styles[status] || styles.cancelled_by_guest}`}>{status.replace(/_/g, ' ')}</span>;
};

export default function HostBookingsPage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (user) {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          start_date,
          number_of_seats,
          status,
          guest:profiles!bookings_guest_id_fkey ( full_name, email ),
          listing:listings ( title )
        `)
        .eq('host_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (error) {
      alert(`Error updating status: ${error.message}`);
    } else {
      // Refresh the list to show the new status
      fetchBookings();
    }
  };

  return (
    <AuthGuard allowedRoles={['host']}>
      <HostDashboardLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-dark">Booking Requests</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <p>Loading your booking requests...</p>
          ) : bookings.length === 0 ? (
            <p>You have no new booking requests at this time.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Start</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.guest?.full_name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.listing?.title || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.start_date ? format(new Date(booking.start_date), 'MMM dd, yyyy') : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.number_of_seats}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={booking.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {booking.status === 'pending_approval' && (
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="text-green-600 hover:text-green-900">Approve</button>
                            <button onClick={() => handleUpdateStatus(booking.id, 'declined_by_host')} className="text-red-600 hover:text-red-900">Decline</button>
                          </div>
                        )}
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
