// components/WorkspacesForEveryone.jsx

import { useState } from 'react';
import Image from 'next/image';

/**
 * WorkspacesForEveryone
 *
 * A responsive tabbed section with six category buttons.
 * When you click a category, three relevant cards appear below.
 * 
 * Color palette (Strategic Horizon):
 * - Primary Dark (#2C3E50)
 * - Primary Light (#ECF0F1)
 * - Medium Gray (#95A5A6)
 * - Brand Primary (#3498DB)
 * - Accent (#E6B980)
 */
export default function WorkspacesForEveryone() {
  // Define tab categories and their corresponding card data:
  const tabs = [
    {
      id: 'enterprise',
      label: 'Enterprise & Large Scale Companies',
      cards: [
        {
          image: '/images/workspaces/enterprise1.jpg',
          title: 'Full‐Floor Serviced Office',
          desc: 'Custom‐branded, fully managed office solutions for 100+ employees.',
          link: '/enterprise/full-floor',
        },
        {
          image: '/images/workspaces/enterprise2.jpg',
          title: 'Satellite Hub Solutions',
          desc: 'Establish satellite hubs across multiple cities with centralized billing.',
          link: '/enterprise/satellite-hub',
        },
        {
          image: '/images/workspaces/enterprise3.jpg',
          title: 'Dedicated Enterprise Packages',
          desc: 'Aggregate multiple locations under a single SLA and reporting dashboard.',
          link: '/enterprise/packages',
        },
      ],
    },
    {
      id: 'growing',
      label: 'Growing Companies & Small Businesses',
      cards: [
        {
          image: '/images/workspaces/growing1.jpg',
          title: 'Plug‐and‐Play Team Rooms',
          desc: 'Scalable team rooms for 10–50 people, move in tomorrow, no capex.',
          link: '/growing/team-rooms',
        },
        {
          image: '/images/workspaces/growing2.jpg',
          title: 'Flexible Lease Terms',
          desc: 'Month‐to‐month flexibility to adapt as your headcount grows or shrinks.',
          link: '/growing/flexible-lease',
        },
        {
          image: '/images/workspaces/growing3.jpg',
          title: 'Co‐working Memberships',
          desc: 'Access multiple locations on a single membership—perfect for multi‐city teams.',
          link: '/growing/memberships',
        },
      ],
    },
    {
      id: 'freelancers',
      label: 'Freelancers & Business Travellers',
      cards: [
        {
          image: '/images/workspaces/freelancer1.jpg',
          title: 'Day‐Pass & Hot‐Desk Access',
          desc: 'Pay‐as‐you‐go access to high‐energy co‐working spaces—no permanent desk required.',
          link: '/freelancers/day-pass',
        },
        {
          image: '/images/workspaces/freelancer2.jpg',
          title: 'Virtual Office Address',
          desc: 'Get a prestigious business address & mail handling, anywhere in India.',
          link: '/freelancers/virtual-office',
        },
        {
          image: '/images/workspaces/freelancer3.jpg',
          title: 'Meeting Room Bookings',
          desc: 'Hourly or half‐day meeting rooms equipped with video‐conferencing tech.',
          link: '/freelancers/meeting-rooms',
        },
      ],
    },
    {
      id: 'startups',
      label: 'Early Stage Startups & Non-Profits',
      cards: [
        {
          image: '/images/workspaces/startup1.jpg',
          title: 'Incubator & Accelerator Spaces',
          desc: 'Specially curated co‐working clusters with mentorship programs.',
          link: '/startups/incubator',
        },
        {
          image: '/images/workspaces/startup2.jpg',
          title: 'Grant‐Enabled Work Hubs',
          desc: 'Discounted seats and shared offices for registered non-profits.',
          link: '/startups/grants',
        },
        {
          image: '/images/workspaces/startup3.jpg',
          title: 'Start‐Up Booster Programs',
          desc: 'Credit‐back incentives on yearly plans when you hit growth milestones.',
          link: '/startups/booster',
        },
      ],
    },
    {
      id: 'remote',
      label: 'Remote & Mobile Teams',
      cards: [
        {
          image: '/images/workspaces/remote1.jpg',
          title: 'Multi-City Hot Desks',
          desc: 'One membership, unlimited drop-in across 50+ cities—ideal for agile teams.',
          link: '/remote/hot-desks',
        },
        {
          image: '/images/workspaces/remote2.jpg',
          title: 'Regional Satellite Pods',
          desc: 'Reserve mini‐offices in Tier 2/3 cities for remote team meetups.',
          link: '/remote/satellite-pods',
        },
        {
          image: '/images/workspaces/remote3.jpg',
          title: 'Roaming Access Plans',
          desc: 'Work seamlessly across partner locations with a single roaming pass.',
          link: '/remote/roaming',
        },
      ],
    },
    {
      id: 'expanding',
      label: 'New & Expanding Businesses',
      cards: [
        {
          image: '/images/workspaces/expand1.jpg',
          title: 'Market Entry Bundles',
          desc: 'All‐inclusive packages (legal address, desk, meeting room) for new cities.',
          link: '/expanding/market-entry',
        },
        {
          image: '/images/workspaces/expand2.jpg',
          title: 'Office Fit-Out Services',
          desc: 'Design + furniture + move‐in support tailored to your brand’s DNA.',
          link: '/expanding/fit-out',
        },
        {
          image: '/images/workspaces/expand3.jpg',
          title: 'Anchor Tenant Solutions',
          desc: 'Secured long‐term leases with build‐out credits for growing footprints.',
          link: '/expanding/anchor-tenant',
        },
      ],
    },
  ];

  // Track which tab is active:
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Find the currently active tab object
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* 1) Heading + Subheading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-primary-dark text-center">
          Workspaces for Everyone
        </h2>
        <p className="text-medium-gray text-center mt-2 mb-8">
          Whether you’re a freelancer, early-stage startup, or an enterprise—find the workspace that’s right for you.
        </p>

        {/* 2) Tabs row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 
                text-sm md:text-base 
                font-medium 
                rounded-lg 
                border-2 
                focus:outline-none 
                transition 
                ${
                  activeTab === tab.id
                    ? 'bg-brand-primary text-primary-light border-brand-primary'
                    : 'bg-white text-primary-dark border-medium-gray hover:bg-brand-primary hover:text-primary-light hover:border-brand-primary'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3) Cards for the active tab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTab.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image at top */}
              <div className="relative w-full h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                  {card.title}
                </h3>
                <p className="text-medium-gray mb-4">{card.desc}</p>
                <a
                  href={card.link}
                  className="text-brand-primary font-medium hover:underline"
                >
                  Explore&nbsp;
                  <span className="inline-block transform translate-x-0 hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4) Carousel Dots (optional) */}
        <div className="flex justify-center space-x-2 mt-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-3 h-3 rounded-full transition-colors duration-300
                ${
                  activeTab === tab.id
                    ? 'bg-brand-primary'
                    : 'bg-medium-gray'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
