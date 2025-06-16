// components/Footer.jsx
import Link from 'next/link';
import {
  FaLinkedin,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

// The complete and organized list of all footer links
const footerColumns = [
    {
        title: 'Company',
        links: [
            { name: 'About Us', href: '/about-us' },
            { name: 'What We Think', href: '/what-we-think' },
            { name: 'Where We Stand', href: '/where-we-stand' },
            { name: 'Careers', href: '/careers' },
            { name: 'Blogs', href: '/blogs' },
            { name: 'Contact Us', href: '/contact' },
        ]
    },
    {
        title: 'Explore',
        links: [
            { name: 'Coworking Spaces', href: '/listing?service=Coworking+Space' },
            { name: 'Serviced Offices', href: '/listing?service=Serviced+Office' },
            { name: 'Meeting Rooms', href: '/listing?service=Meeting+Room' },
            { name: 'Virtual Offices', href: '/virtual-office-solutions' },
            { name: 'Hill Station Workspaces', href: '/hill-station-workspaces' },
            { name: 'Top Cities', href: '/listing' },
        ]
    },
    {
        title: 'Platform Services',
        links: [
            { name: 'Enterprise Solutions', href: '/enterprise-solutions' },
            { name: 'Warehousing', href: '/warehousing' },
            { name: 'Event Spaces', href: '/event-spaces' },
            { name: 'Commercial Properties', href: '/commercial-spaces' },
            { name: 'Partner With Us', href: '/partner-with-us' },
        ]
    },
    {
        title: 'For Partners',
        links: [
            { name: 'List Your Space', href: '/list-your-space' },
            { name: 'Host Dashboard', href: '/dashboard/host' },
            { name: 'Refer & Earn', href: '/refer-earn' },
        ]
    },
    {
        title: 'Legal',
        links: [
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Terms of Service', href: '/terms-of-service' },
            { name: 'Access Request', href: '/access-request' },
            { name: 'Right to be Forgotten', href: '/right-to-be-forgotten' },
        ]
    }
];


export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-light">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Column 1: Company Info & Newsletter */}
            <div className="lg:col-span-3">
                <Link href="/" className="text-3xl font-bold text-white hover:text-accent transition-colors">
                    Verve99
                </Link>
                <p className="text-medium-gray mt-4">
                    Your premier partner for refined workspace solutions.
                </p>
                <div className="mt-6">
                    <h4 className="font-semibold text-white">Get Industry Insights</h4>
                    <form className="mt-2 flex">
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 text-primary-dark rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                        <button type="submit" className="bg-brand-primary p-3 rounded-r-md hover:bg-accent transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {footerColumns.map((column) => (
                  <div key={column.title}>
                      <h4 className="font-semibold text-white uppercase tracking-wider text-sm">{column.title}</h4>
                      <ul className="mt-4 space-y-3">
                          {column.links.map((link) => (
                              <li key={link.name}>
                                  <Link href={link.href} className="text-medium-gray hover:text-white transition-colors hover:underline">
                                      {link.name}
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
            </div>
        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="mt-20 pt-8 border-t border-medium-gray/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-medium-gray text-sm">&copy; {new Date().getFullYear()} Verve99. All rights reserved.</p>
          <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaTwitterSquare size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
