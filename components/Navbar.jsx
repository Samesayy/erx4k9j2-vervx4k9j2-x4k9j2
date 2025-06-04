// components/Navbar.jsx

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-primary-dark shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Brand & mobile toggle */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary-light">
              WorkspaceMarket
            </Link>
            <button
              className="md:hidden text-primary-light"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-6">
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
          </div>

          {/* Desktop auth links */}
          <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-primary-dark">
          <Link href="/search" className="block text-primary-light hover:text-brand-primary">
            Explore
          </Link>
          <Link href="/enterprises" className="block text-primary-light hover:text-brand-primary">
            Enterprises
          </Link>
          <Link href="/request" className="block text-primary-light hover:text-brand-primary">
            Request
          </Link>
          <Link href="/add-office" className="block text-primary-light hover:text-brand-primary">
            Add Office Space
          </Link>
          {/* Mobile services accordion */}
          <div className="pt-2">
            <button
              onClick={() => setServicesOpen((o) => !o)}
              className="flex w-full items-center justify-between text-primary-light hover:text-brand-primary"
            >
              <span>Services</span>
              <FiChevronDown
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {servicesOpen && (
              <div className="mt-2 space-y-1 pl-4">
                <Link href="/services/coworking-spaces" className="block text-primary-light hover:text-brand-primary">
                  Co-working Spaces
                </Link>
                <Link href="/services/serviced-offices" className="block text-primary-light hover:text-brand-primary">
                  Serviced Offices
                </Link>
                <Link href="/services/private-offices" className="block text-primary-light hover:text-brand-primary">
                  Private Offices
                </Link>
                <Link href="/services/virtual-offices" className="block text-primary-light hover:text-brand-primary">
                  Virtual Offices
                </Link>
                <Link href="/services/meeting-rooms" className="block text-primary-light hover:text-brand-primary">
                  Meeting Rooms
                </Link>
                <Link href="/services/training-rooms" className="block text-primary-light hover:text-brand-primary">
                  Training Rooms
                </Link>
                <Link href="/services/customized-prop" className="block text-primary-light hover:text-brand-primary">
                  Customized Prop
                </Link>
                <Link href="/services/bespoke-assistance" className="block text-primary-light hover:text-brand-primary">
                  Bespoke Assistance
                </Link>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-medium-gray flex flex-col space-y-2">
            <Link href="/login" className="text-primary-light hover:text-brand-primary">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-brand-primary text-primary-light px-3 py-1 rounded w-max hover:bg-accent transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
