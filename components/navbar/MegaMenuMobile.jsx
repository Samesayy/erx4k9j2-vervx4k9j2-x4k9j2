// components/navbar/MegaMenuMobile.jsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { solutionsData } from './menuData';
import { otherServicesData } from './otherServicesData'; // Import data for the new menu

export default function MegaMenuMobile({ show, onClose, user }) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [platformServicesOpen, setPlatformServicesOpen] = useState(false); // State for the new accordion
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
    router.push('/');
  };

  return (
    <div
      className={`
        fixed inset-0 bg-primary-dark z-50 p-6
        transition-transform duration-500 ease-in-out
        ${show ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
        <div className="flex justify-between items-center mb-8">
          <Link href="/" onClick={onClose} className="text-2xl font-bold text-primary-light">Verve99</Link>
          <button onClick={onClose} className="text-primary-light"><FiX size={28} /></button>
        </div>

        {/* Main Links */}
        <nav className="flex flex-col gap-1">
          {/* Solutions Accordion */}
          <div>
            <button onClick={() => setSolutionsOpen(!solutionsOpen)} className="w-full flex justify-between items-center text-left text-2xl text-primary-light py-3">
              <span>Solutions</span>
              <FiChevronDown className={`transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {solutionsOpen && (
              <div className="pl-4 border-l-2 border-brand-primary flex flex-col gap-4 mt-2 py-2">
                {solutionsData.byType.map((item) => (<Link key={item.name} href={item.href} onClick={onClose} className="text-lg text-medium-gray hover:text-primary-light">{item.name}</Link>))}
              </div>
            )}
          </div>
          
           {/* Platform Services Accordion */}
          <div>
            <button onClick={() => setPlatformServicesOpen(!platformServicesOpen)} className="w-full flex justify-between items-center text-left text-2xl text-primary-light py-3">
              <span>Platform Services</span>
              <FiChevronDown className={`transition-transform duration-300 ${platformServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {platformServicesOpen && (
              <div className="pl-4 border-l-2 border-brand-primary flex flex-col gap-4 mt-2 py-2">
                {otherServicesData.virtual.map((item) => (<Link key={item.name} href={item.href} onClick={onClose} className="text-lg text-medium-gray hover:text-primary-light">{item.name}</Link>))}
                {otherServicesData.specialty.map((item) => (<Link key={item.name} href={item.href} onClick={onClose} className="text-lg text-medium-gray hover:text-primary-light">{item.name}</Link>))}
              </div>
            )}
          </div>

          {/* --- RESTORED LINKS FOR MOBILE --- */}
          <Link href="/what-we-think" onClick={onClose} className="text-2xl text-primary-light py-3">What We Think</Link>
          <Link href="/where-we-stand" onClick={onClose} className="text-2xl text-primary-light py-3">Where We Stand</Link>
          <Link href="/list-your-space" onClick={onClose} className="text-2xl text-primary-light py-3">List Your Space</Link>
        </nav>
        
        {/* Auth links at the bottom */}
        <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4 border-t border-medium-gray pt-6">
          {user ? (
            <button onClick={handleLogout} className="text-xl text-red-400 text-center py-3 bg-red-500/10 rounded-lg">Logout</button>
          ) : (
            <>
              <Link href="/login" onClick={onClose} className="text-xl text-primary-light text-center py-3 bg-medium-gray/20 rounded-lg">Login</Link>
              <Link href="/register" onClick={onClose} className="text-xl text-white text-center py-3 bg-brand-primary rounded-lg">Register</Link>
            </>
          )}
        </div>
    </div>
  );
}