// components/dashboard/HostDashboardLayout.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiGrid, FiList, FiMessageSquare, FiSettings, FiLogOut, FiInbox } from 'react-icons/fi'; // <-- Add FiInbox

const navLinks = [
  { name: 'Dashboard', href: '/dashboard/host', icon: FiGrid },
  { name: 'My Listings', href: '/dashboard/host/listings', icon: FiList },
  { name: 'Booking Requests', href: '/dashboard/host/bookings', icon: FiInbox }, // <-- ADD THIS NEW LINK
  { name: 'Messages', href: '/dashboard/host/messages', icon: FiMessageSquare },
  { name: 'Settings', href: '/dashboard/host/settings', icon: FiSettings },
];

export default function HostDashboardLayout({ children }) {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-6">
            <Link href="/" className="text-2xl font-bold text-brand-primary">
              Verve99 Host
            </Link>
          </div>
          <nav className="mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  flex items-center px-6 py-3 text-medium-gray hover:bg-primary-light hover:text-primary-dark
                  ${router.pathname === link.href ? 'bg-primary-light text-primary-dark font-semibold' : ''}
                `}
              >
                <link.icon className="mr-3" />
                {link.name}
              </Link>
            ))}
             <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-medium-gray hover:bg-primary-light hover:text-primary-dark mt-4 border-t"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white shadow-sm p-4">
            <h1 className="text-xl font-semibold text-primary-dark">Host Dashboard</h1>
          </header>
          <main className="p-6 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
