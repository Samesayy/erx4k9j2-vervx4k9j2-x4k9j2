// pages/what-we-think.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import PillarSection from '../components/philosophy/PillarSection';
// 1. ADDING THE NEW ICONS TO THE IMPORT
import { FiMove, FiBarChart2, FiLayers, FiUsers, FiZap, FiCpu, FiLock } from 'react-icons/fi';

// The full list of 7 pillars
const ourPillars = [
  {
    icon: <FiMove size={48} />,
    title: 'Agility is the New Asset',
    desc: 'The era of the rigid, long-term lease as the only option is over. We believe the modern enterprise thrives on adaptability. A workspace portfolio should be as dynamic as the business itself—able to scale, shift, and deploy into new markets at the speed of opportunity.',
    features: ['On-Demand Access to Global Inventory', 'Hybrid & Remote Work Enablement', 'Scalable Real Estate Footprints'],
  },
  {
    icon: <FiBarChart2 size={48} />,
    title: 'Intelligence Over Intuition',
    desc: 'Real estate decisions should be driven by data, not guesswork. We leverage market analytics, utilization data, and pricing intelligence to ensure our partners and clients make the most informed, cost-effective decisions, eliminating waste and maximizing value.',
    features: ['Comprehensive Market Analytics', 'Workspace Utilization Insights', 'Transparent, Data-Backed Pricing'],
  },
  {
    icon: <FiLayers size={48} />,
    title: 'Experience as a Service (XaaS)',
    desc: 'A workspace is no longer just four walls; it\'s a holistic service layer that powers productivity. From enterprise-grade technology and operational support to curated community events, we see the workspace as an integrated experience designed to attract and retain top talent.',
    features: ['Fully Managed Operations', 'Integrated Technology Stack', 'Professional Community Management'],
  },
  {
    icon: <FiUsers size={48} />,
    title: 'Partnership is the New Paradigm',
    desc: 'We are building an ecosystem, not just a marketplace. Our success is intrinsically linked to the success of our property partners and our enterprise clients. We foster long-term, symbiotic relationships built on trust, transparency, and shared growth.',
    features: ['Host Success & Onboarding Programs', 'Dedicated Client Growth Strategies', 'Ecosystem-Led Collaboration'],
  },
  // --- 2. THE THREE NEW SECTIONS ---
  {
    icon: <FiZap size={48} />,
    title: 'Sustainability as a Standard',
    desc: 'The future of work is not just flexible, but responsible. We champion workspaces that meet high environmental standards and promote employee well-being, helping you achieve ESG goals while providing healthy, inspiring environments.',
    features: ['Access to Eco-Certified Buildings', 'Wellness-Oriented Design Principles', 'Reduced Carbon Footprint via Distributed Hubs'],
  },
  {
    icon: <FiCpu size={48} />,
    title: 'The Autonomous Workspace',
    desc: 'Leveraging AI and automation is key to optimizing the workspace experience. We envision a future of smart buildings, predictive booking engines, and automated analytics that make managing a global workspace portfolio effortless and efficient.',
    features: ['AI-Powered Space Recommendations', 'Smart Building & IoT Integration', 'Automated Usage Reporting'],
  },
  {
    icon: <FiLock size={48} />,
    title: 'Security Without Borders',
    desc: 'In a distributed world, maintaining security and compliance is paramount. Our platform provides a framework for standardized security protocols, ensuring that your data, people, and assets are protected across our entire vetted network.',
    features: ['Unified Security & Access Protocols', 'GDPR & Compliance-Ready Spaces', 'Secure, Private Network Options'],
  }
];

export default function WhatWeThinkPage() {
  return (
    <>
      <Head>
        <title>What We Think | Verve99</title>
        <meta name="description" content="Our perspective on the evolving landscape of commercial real estate, technology, and the modern workforce." />
      </Head>
      <div className="bg-[#1A1A1A] text-white">
        <Navbar />
        
        {/* Hero Section */}
        <header className="text-center py-24 md:py-32 bg-black/10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
                    Shaping the Future of Work
                </h1>
                <p className="mt-6 text-xl text-medium-gray max-w-3xl mx-auto">
                    Our perspective on the evolving landscape of commercial real estate, technology, and the modern workforce.
                </p>
            </div>
        </header>

        {/* Main Content - The Pillars */}
        <main className="max-w-5xl mx-auto px-4 divide-y divide-white/10">
          {ourPillars.map((pillar, index) => (
            <PillarSection 
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              desc={pillar.desc}
              features={pillar.features}
              isLeftAligned={index % 2 === 0}
            />
          ))}
        </main>
        
        <Footer />
      </div>
    </>
  );
}