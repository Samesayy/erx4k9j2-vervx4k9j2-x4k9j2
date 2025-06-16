// components/navbar/MegaMenuDesktop.jsx
import Link from 'next/link';
import { solutionsData } from './menuData';

export default function MegaMenuDesktop({ show }) {
  return (
    <div
      className={`
        absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200
        transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 py-8">
        {/* Column 1: By Type */}
        <div className="col-span-4">
          <h3 className="text-sm font-semibold text-medium-gray uppercase tracking-wider mb-4">By Workspace Type</h3>
          <div className="flex flex-col gap-1">
            {solutionsData.byType.map((item) => (
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

        {/* Column 2: By Need */}
        <div className="col-span-4">
          <h3 className="text-sm font-semibold text-medium-gray uppercase tracking-wider mb-4">By Your Need</h3>
          <div className="flex flex-col gap-1">
            {solutionsData.byNeed.map((item) => (
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

        {/* Column 3: Featured */}
        <div className="col-span-4">
           <div className="bg-primary-light h-full rounded-lg p-6 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-primary-dark">Enterprise Solutions</h4>
              <p className="text-medium-gray mt-2 mb-4">Custom-built offices for teams of 50 to 500+. Let us build your dream headquarters.</p>
              <Link href="/enterprise-solutions" className="font-semibold text-brand-primary hover:text-accent">
                Learn More →
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}