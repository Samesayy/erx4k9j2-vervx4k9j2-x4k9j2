// components/hero/HeroContainer.jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import OfficeTypeTabs from './OfficeTypeTabs';
import SearchModule from './SearchModule';
import { motion, AnimatePresence } from 'framer-motion'; // 1. IMPORT FRAMER MOTION

// The content for our animation
const animatedMessages = [
  {
    line1: 'Your Enterprise’s Next Productive Hub, Simplified.',
    line2: 'From bespoke offices to multi-city hubs, find enterprise-grade spaces with ease.',
  },
  {
    line1: 'Seamlessly Connecting You to Premium Workspaces.',
    line2: 'Our platform offers verified listings and direct access to providers, with zero brokerage fees.',
  },
  {
    line1: 'Discover Flexible Solutions for Modern Teams.',
    line2: 'Whether you\'re a startup or a freelancer, find the perfect desk, office, or meeting room.',
  },
];

// 2. DEFINE THE ANIMATION VARIANTS
const headlineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // This will make each word appear one after the other
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function HeroContainer() {
  const [selectedType, setSelectedType] = useState('Coworking Space');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = animatedMessages[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12">
      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-8 text-center md:text-left">
        
        <div className="h-48"> {/* Container to prevent layout shifts */}
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex}> {/* The key prop triggers the exit/enter animation */}
              
              {/* 3. THE NEW ANIMATED HEADLINE */}
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold text-primary-dark"
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
              >
                {currentMessage.line1.split(' ').map((word, index) => (
                  <motion.span key={index} className="inline-block mr-2" variants={wordVariants}>
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* The sub-headline also animates */}
              <motion.p 
                className="text-lg text-medium-gray mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {currentMessage.line2}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <OfficeTypeTabs onSelect={setSelectedType} />
        <SearchModule officeType={selectedType} />
      </div>

      {/* Right Column */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/images/hero.jpg" alt="Modern Co-working Space" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}