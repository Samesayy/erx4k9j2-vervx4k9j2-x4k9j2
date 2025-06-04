// components/Navbar.jsx

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-primary-dark shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Brand & Primary Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary-light">
              WorkspaceMarket
            </Link>
            <Link href="/search" className="text-primary-light hover:text-brand-primary">
              Explore
            </Link>
            <Link href="/enterprises" className="text-primary-light hover:text-brand-primary">
              Enterprises
            </Link>
            <Link href="/request" className="text-primary-light hover:text-brand-primary">
              Request
            </Link>
            <Link href="/add-office" className="text-primary-light hover:text-brand-primary">
              Add Office Space
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-primary-light hover:text-brand-primary focus:outline-none">
                Services
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-primary-light border border-medium-gray rounded shadow-lg z-10">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/services/coworking-spaces"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Co-working Spaces
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/serviced-offices"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Serviced Offices
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/private-offices"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Private Offices
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/virtual-offices"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Virtual Offices
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/meeting-rooms"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Meeting Rooms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/training-rooms"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Training Rooms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/customized-prop"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Customized Prop
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/bespoke-assistance"
                        className="block px-4 py-2 text-primary-dark hover:bg-accent hover:text-primary-dark"
                      >
                        Bespoke Assistance
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Auth Links */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-primary-light hover:text-brand-primary">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-brand-primary text-primary-light px-3 py-1 rounded hover:bg-accent transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
