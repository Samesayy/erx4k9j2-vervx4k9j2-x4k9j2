// components/common/Breadcrumbs.jsx
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

// This component takes an array of items to display as breadcrumbs.
// Example: [{ label: 'Home', href: '/' }, { label: 'Delhi' }]
export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-2">
      <Link href="/" className="flex items-center hover:text-brand-primary transition-colors">
          <Home size={14} className="mr-1.5" />
          Home
      </Link>
      
      {items.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="mx-1" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-700">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}