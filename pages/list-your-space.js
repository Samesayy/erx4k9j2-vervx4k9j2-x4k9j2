import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Building, Warehouse, Tent, Mountain, Landmark, ArrowRight } from 'lucide-react';

const listingCategories = [
  {
    icon: <Building size={32} />,
    title: 'Flexible Workspace',
    description: 'List your coworking desks, private offices, meeting rooms, or virtual office services.',
    href: '/list-your-space-form',
  },
  {
    icon: <Warehouse size={32} />,
    title: 'Warehouse & Storage',
    description: 'Offer your warehouse or e-commerce storage facilities to businesses.',
    href: '/list-your-space/logistics',
  },
  {
    icon: <Tent size={32} />,
    title: 'Event Space',
    description: 'List your venue for corporate events, workshops, and gatherings.',
    href: '/list-your-space/event',
  },
  {
    icon: <Landmark size={32} />,
    title: 'Commercial Property',
    description: 'List a traditional office space for long-term lease.',
    href: '/list-your-space/commercial',
  },
  {
    icon: <Mountain size={32} />,
    title: 'Hill Station Workspace',
    description: 'List your unique workspace located in a scenic mountain or destination area.',
    href: '/list-your-space/hill-station',
  },
];

const CategoryCard = ({ icon, title, description, href }) => {
  return (
    <Link href={href} passHref>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 10px 20px -10px rgba(52, 152, 219, 0.4)' }}
        className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col cursor-pointer border border-transparent hover:border-brand-primary"
      >
        <div className="text-brand-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-primary-dark">{title}</h3>
        <p className="text-medium-gray mt-2 flex-grow">{description}</p>
        <div className="mt-6 font-semibold text-brand-primary flex items-center group-hover:underline">
          Get Started <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
        </div>
      </motion.div>
    </Link>
  );
};


export default function ListSpaceHubPage() {
  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>List Your Space | Verve99</title>
        <meta name="description" content="Choose the type of property you want to list on the Verve99 platform." />
      </Head>
      <Navbar />
      
      <main className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-primary-dark"
            >
              Partner with Verve99
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto"
            >
              Join our network of property partners and turn your space into a new revenue stream. Choose the category that best fits your property to begin.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listingCategories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
