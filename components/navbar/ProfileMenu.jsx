// components/navbar/ProfileMenu.jsx
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { FiChevronDown, FiGrid, FiList, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';

export default function ProfileMenu({ user, profile }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const initials = profile?.full_name?.split(' ').map(n => n[0]).join('') || user?.email?.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border-2 border-brand-primary/30">
          {profile?.avatar_url ? (
            <Image src={profile.avatar_url} alt="User avatar" width={40} height={40} className="rounded-full" />
          ) : (
            <span className="font-bold text-brand-primary">{initials}</span>
          )}
        </div>
        <FiChevronDown className={`transition-transform duration-200 text-primary-light ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 animate-fade-in-down">
          <div className="p-2">
            <div className="px-2 py-2">
              <p className="text-sm text-medium-gray">Signed in as</p>
              <p className="font-semibold text-primary-dark truncate">{profile?.full_name || user.email}</p>
            </div>
            <div className="h-px bg-gray-200 my-1" />
            
            <Link href="/dashboard/guest" onClick={() => setIsOpen(false)} className="group flex items-center w-full px-2 py-2 text-sm text-primary-dark rounded-md hover:bg-primary-light">
              <FiGrid className="mr-2 text-medium-gray group-hover:text-brand-primary" /> My Bookings
            </Link>

            {profile?.is_host && (
              <Link href="/dashboard/host" onClick={() => setIsOpen(false)} className="group flex items-center w-full px-2 py-2 text-sm text-primary-dark rounded-md hover:bg-primary-light">
                <FiList className="mr-2 text-medium-gray group-hover:text-brand-primary" /> Host Dashboard
              </Link>
            )}

            <div className="h-px bg-gray-200 my-1" />
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-2 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}