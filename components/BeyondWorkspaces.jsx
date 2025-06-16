// components/BeyondWorkspaces.jsx
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Data for the carousel section
const products = [
  {
    title: 'Event Spaces',
    description: 'Find unique venues for your next corporate event, workshop, or launch party.',
    ctaLink: '/event-spaces',
    ctaText: 'Explore Venues',
    image: '/images/showcase/events.jpg',
  },
  {
    title: 'Warehousing & Storage',
    description: 'Secure, scalable logistics solutions to power your supply chain.',
    ctaLink: '/warehousing',
    ctaText: 'View Facilities',
    image: '/images/showcase/warehouse.jpg',
  },
  {
    title: 'E-commerce Storage',
    description: 'Dedicated fulfillment centers with pick-and-pack services to scale your online business.',
    ctaLink: '/warehousing?type=ecommerce',
    ctaText: 'See Options',
    image: '/images/showcase/ecommerce-storage.jpg',
  },
  {
    title: 'Hill Station Workspaces',
    description: 'Inspiring retreats for focused work, team off-sites, and creative thinking.',
    ctaLink: '/hill-station-workspaces',
    ctaText: 'Discover Retreats',
    image: '/images/showcase/hill-station.jpg',
  },
];

// ProductCard sub-component with the restored blur stripe
const ProductCard = ({ product }) => {
    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg group">
             <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* This is a static gradient overlay to ensure text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>{product.title}</h3>
                
                {/* This container with the blur effect slides up on hover */}
                <div 
                    className="
                        absolute bottom-0 left-0 w-full p-6
                        bg-white/10 backdrop-blur-md 
                        transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                        transition-all duration-300 ease-in-out
                    "
                >
                    <p className="text-sm text-gray-200">{product.description}</p>
                    <Link 
                      href={product.ctaLink} 
                      className="mt-4 inline-block bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-accent hover:text-primary-dark transition-colors"
                    >
                      {product.ctaText}
                    </Link>
                </div>
            </div>
        </div>
    );
};


// Main Component - A more robust carousel implementation
export default function BeyondWorkspaces() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleNav = (direction) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const cardWidth = scrollRef.current.children[0].clientWidth;
    const newIndex = (index + direction + products.length) % products.length;
    
    scrollRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth'
    });
    setIndex(newIndex);
  };

  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Beyond the Traditional Office</h2>
        <p className="mt-3 text-lg text-medium-gray max-w-2xl mx-auto">
          Explore our diverse range of specialty spaces designed to meet every unique business need.
        </p>
      </div>
      
      <div className="relative">
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4"
        >
          {products.map((product, i) => (
            <div key={i} className="flex-shrink-0 w-full md:w-1/3 snap-center px-2" style={{ height: '26rem' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows for Desktop */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-0 pointer-events-none">
            <button onClick={() => handleNav(-1)} className="pointer-events-auto p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition -ml-6">
                <ChevronLeft size={28} className="text-primary-dark" />
            </button>
            <button onClick={() => handleNav(1)} className="pointer-events-auto p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition -mr-6">
                <ChevronRight size={28} className="text-primary-dark" />
            </button>
        </div>
      </div>
    </Section>
  );
}

// A simple Section wrapper to avoid repeating animation code
const Section = ({ children }) => (
  <motion.section 
    className="py-20 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-w-7xl mx-auto">
        {children}
    </div>
  </motion.section>
);
