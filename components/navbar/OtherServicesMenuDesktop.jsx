// components/navbar/OtherServicesMenuDesktop.jsx
import Link from 'next/link';
import { otherServicesData } from './otherServicesData';

export default function OtherServicesMenuDesktop({ show }) {
  return (
    <div
      className={`
        absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200
        transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
        {/* Column 1: Virtual Solutions */}
        <div>
          <h3 className="text-sm font-semibold text-medium-gray uppercase tracking-wider mb-4">Virtual Solutions</h3>
          <div className="flex flex-col gap-1">
            {otherServicesData.virtual.map((item) => (
              <Link key={item.name} href={item.href} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-primary-light transition-colors">
                <div className="text-brand-primary mt-1">{item.icon}</div>
                <div>
                  <p className="font-semibold text-primary-dark group-hover:text-brand-primary">{item.name}</p>
                  <p className="text-sm text-medium-gray">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Specialty & Logistics */}
        <div>
          <h3 className="text-sm font-semibold text-medium-gray uppercase tracking-wider mb-4">Specialty & Logistics</h3>
          <div className="flex flex-col gap-1">
            {otherServicesData.specialty.map((item) => (
              <Link key={item.name} href={item.href} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-primary-light transition-colors">
                <div className="text-brand-primary mt-1">{item.icon}</div>
                <div>
                  <p className="font-semibold text-primary-dark group-hover:text-brand-primary">{item.name}</p>
                  <p className="text-sm text-medium-gray">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}