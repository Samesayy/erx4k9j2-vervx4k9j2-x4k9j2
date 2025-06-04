// components/Footer.jsx

import Link from 'next/link';
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* ─────────── Main Footer Content ─────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* ─── Column 1: Company Info & Social Media ─── */}
        <div>
          <img
            src="/path/to/your/logo.png"
            alt="Verve99 Logo"
            className="h-10 mb-4"
          />
          <p className="text-gray-600 mb-4">
            Verve99 is your strategic partner for tailored, elegant workspace
            solutions. Discover minimalism, flexibility, and trust—united in one
            platform.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <FaFacebookSquare size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-primary transition-colors"
            >
              <FaTwitterSquare size={20} />
            </a>
          </div>
        </div>

        {/* ─── Column 2: Verve99 Quick Links ─── */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/about" className="hover:text-brand-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/get-quote" className="hover:text-brand-primary transition-colors">
                Get a Quote
              </Link>
            </li>
            <li>
              <Link href="/add-workspace" className="hover:text-brand-primary transition-colors">
                Add Your Workspace
              </Link>
            </li>
            <li>
              <Link href="/partner-login" className="hover:text-brand-primary transition-colors">
                Partner Login
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-brand-primary transition-colors">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/refer-earn" className="hover:text-brand-primary transition-colors">
                Refer &amp; Earn
              </Link>
            </li>
            <li>
              <Link href="/enterprise-solution" className="hover:text-brand-primary transition-colors">
                Enterprise Solution
              </Link>
            </li>
            <li>
              <Link href="/industry-reports" className="hover:text-brand-primary transition-colors">
                Industry Reports
              </Link>
            </li>
            <li>
              <Link href="/top-cities" className="hover:text-brand-primary transition-colors">
                Top Cities
              </Link>
            </li>
          </ul>
        </div>

        {/* ─── Column 3: Top Cities ─── */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Top Cities</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/search?city=Gurgaon" className="hover:text-brand-primary transition-colors">
                Gurgaon
              </Link>
            </li>
            <li>
              <Link href="/search?city=Delhi" className="hover:text-brand-primary transition-colors">
                Delhi
              </Link>
            </li>
            <li>
              <Link href="/search?city=Noida" className="hover:text-brand-primary transition-colors">
                Noida
              </Link>
            </li>
            <li>
              <Link href="/search?city=Mumbai" className="hover:text-brand-primary transition-colors">
                Mumbai
              </Link>
            </li>
            <li>
              <Link href="/search?city=Bangalore" className="hover:text-brand-primary transition-colors">
                Bangalore
              </Link>
            </li>
            <li>
              <Link href="/search?city=Chennai" className="hover:text-brand-primary transition-colors">
                Chennai
              </Link>
            </li>
            <li>
              <Link href="/search?city=Hyderabad" className="hover:text-brand-primary transition-colors">
                Hyderabad
              </Link>
            </li>
          </ul>
        </div>

        {/* ─── Column 4: Workspace Categories & Legal Links ─── */}
        <div className="space-y-6">
          {/* Workspace Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Workspace Categories</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/search?category=coworking" className="hover:text-brand-primary transition-colors">
                  Co-working Spaces
                </Link>
              </li>
              <li>
                <Link href="/search?category=serviced" className="hover:text-brand-primary transition-colors">
                  Serviced Office Space
                </Link>
              </li>
              <li>
                <Link href="/search?category=private" className="hover:text-brand-primary transition-colors">
                  Private Offices
                </Link>
              </li>
              <li>
                <Link href="/search?category=virtual" className="hover:text-brand-primary transition-colors">
                  Virtual Offices
                </Link>
              </li>
              <li>
                <Link href="/search?category=meeting" className="hover:text-brand-primary transition-colors">
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link href="/search?category=training" className="hover:text-brand-primary transition-colors">
                  Training Rooms
                </Link>
              </li>
              <li>
                <Link href="/search?category=warehouses" className="hover:text-brand-primary transition-colors">
                  Warehouses (Coming Soon)
                </Link>
              </li>
              <li>
                <Link href="/search?category=factory" className="hover:text-brand-primary transition-colors">
                  Factory on Lease (Coming Soon)
                </Link>
              </li>
              <li>
                <Link href="/search?category=ecommerce" className="hover:text-brand-primary transition-colors">
                  Ecommerce Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal &amp; Policies</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/terms-conditions" className="hover:text-brand-primary transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement" className="hover:text-brand-primary transition-colors">
                  Use of Site &amp; Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="hover:text-brand-primary transition-colors">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────── Bottom Bar: Attribution & Copyright ───────── */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between text-gray-500 text-sm">
          <p>
            Site Managed by{' '}
            <a
              href="https://esparcidor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition-colors"
            >
              Esparcidor Limited (Seychelles)
            </a>
          </p>
          <p>© {new Date().getFullYear()} Verve99. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
