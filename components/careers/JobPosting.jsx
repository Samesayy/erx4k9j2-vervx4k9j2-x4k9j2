// components/careers/JobPosting.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

export default function JobPosting({ title, location, type, description, responsibilities, qualifications }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left"
      >
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-brand-primary">{title}</h3>
          <p className="text-sm text-medium-gray mt-1">{location} &middot; {type}</p>
        </div>
        <FiChevronDown className={`text-2xl text-medium-gray transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-8 text-gray-300 space-y-4">
              <p>{description}</p>
              <div>
                <h4 className="font-semibold text-white mb-2">Key Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Qualifications:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {qualifications.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <a href="#apply-form" className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-accent pt-2">
                Apply Now <FiArrowRight />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}