// components/listing/PromotionalBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function PromotionalBanner() {
  return (
    <motion.div 
      className="my-8 p-6 bg-gradient-to-r from-primary-dark to-gray-800 text-white rounded-xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold">Still Deciding? Let Us Help.</h3>
      <p className="mt-2 text-sm text-gray-200">Our workspace experts will find the perfect match for you.</p>
      <button className="mt-4 px-6 py-2 bg-accent text-primary-dark rounded-md font-semibold hover:bg-opacity-90 transition-transform hover:scale-105">
        Request a Callback
      </button>
    </motion.div>
  );
}
