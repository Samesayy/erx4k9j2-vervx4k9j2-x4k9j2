// components/Navbar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import MegaMenuDesktop from './navbar/MegaMenuDesktop';
import MegaMenuMobile from './navbar/MegaMenuMobile';
import ProfileMenu from './navbar/ProfileMenu';
import OtherServicesMenuDesktop from './navbar/OtherServicesMenuDesktop';

export default function Navbar() {
  const user = useUser();
  const supabase = useSupabaseClient();
  
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false);
  const [platformServicesMenuOpen, setPlatformServicesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user, supabase]);
  
  const handleMouseLeave = () => {
      setSolutionsMenuOpen(false);
      setPlatformServicesMenuOpen(false);
  };

  return (
    <header className="bg-primary-dark shadow-md sticky top-0 z-40">
      <nav onMouseLeave={handleMouseLeave}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="text-3xl font-bold text-white hover:text-accent transition-colors">
              Verve99
            </Link>

            {/* Center: Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div onMouseEnter={() => { setSolutionsMenuOpen(true); setPlatformServicesMenuOpen(false); }}>
                <button className="flex items-center gap-1 text-primary-light font-medium hover:text-brand-primary transition-colors">
                  Solutions
                  <FiChevronDown className={`transition-transform duration-300 ${solutionsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div onMouseEnter={() => { setPlatformServicesMenuOpen(true); setSolutionsMenuOpen(false); }}>
                <button className="flex items-center gap-1 text-primary-light font-medium hover:text-brand-primary transition-colors">
                  Platform Services {/* <-- RENAMED */}
                  <FiChevronDown className={`transition-transform duration-300 ${platformServicesMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* --- RESTORED LINKS --- */}
              <Link href="/what-we-think" className="text-primary-light font-medium hover:text-brand-primary transition-colors">
                What We Think
              </Link>
              <Link href="/where-we-stand" className="text-primary-light font-medium hover:text-brand-primary transition-colors">
                Where We Stand
              </Link>
              <Link href="/list-your-space" className="text-primary-light font-medium hover:text-brand-primary transition-colors">
                List Your Space
              </Link>
            </div>

            {/* Right Side: Auth & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {user ? (
                <ProfileMenu user={user} profile={profile} />
              ) : (
                <div className="hidden sm:flex items-center gap-4">
                  <Link href="/login" className="text-primary-light font-medium hover:text-brand-primary">Login</Link>
                  <Link href="/register" className="bg-brand-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-accent">Register</Link>
                </div>
              )}
              
              <button className="lg:hidden text-primary-light" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
                <FiMenu size={28} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Render Desktop Mega Menus */}
        <MegaMenuDesktop show={solutionsMenuOpen} />
        <OtherServicesMenuDesktop show={platformServicesMenuOpen} />
      </nav>
      
      <MegaMenuMobile show={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} user={user} profile={profile} />
    </header>
  );
}