// components/listing/PromotionalBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, CheckCircle } from 'lucide-react';

export default function PromotionalBanner({ onCallbackRequest }) {
  const benefits = [
    { icon: <Users size={24} className="text-accent" />, label: 'Personalized Consultation' },
    { icon: <CheckCircle size={24} className="text-accent" />, label: 'Verified Listings' },
    { icon: <MessageCircle size={24} className="text-accent" />, label: 'Quick Responses' },
  ];

  return (
    <motion.section
      className="w-full py-12 bg-gradient-to-br from-primary-dark to-brand-primary text-white rounded-2xl shadow-glass overflow-hidden my-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 animate-fade-in-down">
          Still Deciding? We’ve Got You Covered.
        </h3>
        <p className="text-lg md:text-xl text-primary-light mb-8">
          Our workspace experts ensure you find the perfect match—hassle-free.
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center space-x-3">
              {b.icon}
              <span className="font-medium text-base md:text-lg">{b.label}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onCallbackRequest}
          className="mt-2 px-8 py-3 bg-accent text-primary-dark font-semibold rounded-md hover:bg-accent/90 transition-transform hover:scale-105"
        >
          Request a Callback
        </button>
      </div>
    </motion.section>
  );
}
