// pages/about-us.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiTarget, FiAward, FiHeart, FiTrendingUp, FiShield, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';

// --- Reusable Helper Hook & Component ---
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { threshold: 0.2 });
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
  return isIntersecting;
}

function AnimatedCounter({ to, suffix = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (inView) {
            const controls = animate(0, to, {
                duration: 2.5,
                ease: 'easeOut',
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = value.toFixed(0) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, to, suffix]);
    return <span ref={ref} />;
}

// --- Page-Specific Components ---

const MilestoneItem = ({ scrollYProgress, index, total, year, title, desc }) => {
    const isLeft = index % 2 === 0;
    const start = 0.1 + (index / total) * 0.8;
    const end = 0.1 + ((index + 1) / total) * 0.8;
    
    const opacity = useTransform(scrollYProgress, [start, (start + end) / 2], [0, 1]);
    const x = useTransform(scrollYProgress, [start, (start + end) / 2], [isLeft ? -100 : 100, 0]);

    return (
        <div className={`flex items-center w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className="w-full md:w-5/12"></div>
            <div className="hidden md:block w-2/12 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-dark border-2 border-brand-primary" />
            </div>
            <motion.div style={{ opacity, x }} className="w-full md:w-5/12">
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-2xl font-bold text-brand-primary mb-2">{year}</p>
                    <h4 className="font-bold text-xl text-white">{title}</h4>
                    <p className="text-sm text-medium-gray mt-1">{desc}</p>
                </div>
            </motion.div>
        </div>
    );
};

const OurJourneySection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const pathHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const milestones = [
        { year: '2021', title: 'The Idea', desc: 'Verve99 is founded to tackle inefficiencies in commercial real estate.' },
        { year: '2022', title: 'Platform Launch', desc: 'Our initial marketplace goes live in 5 major Indian metros.' },
        { year: '2023', title: 'Enterprise Suite', desc: 'Launched dedicated solutions for large-scale corporate clients.' },
        { year: '2024', title: 'National Expansion', desc: 'Expanded our network to over 100 cities nationwide.' },
        { year: '2025', title: 'Verve99 Analytics', desc: 'Launched our proprietary data analytics suite for hosts and enterprises.' },
  ];

  return (
    <section ref={targetRef} className="py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-20">Our Journey</h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-brand-primary/20">
          <motion.div className="w-full bg-brand-primary shadow-[0_0_15px_rgba(52,152,219,0.7)]" style={{ height: pathHeight }} />
        </div>
        <div className="space-y-24">
          {milestones.map((item, index) => (
            <MilestoneItem key={item.year} scrollYProgress={scrollYProgress} index={index} total={milestones.length} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- THE MISSING VALUECARD COMPONENT, NOW RESTORED ---
const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white/5 p-8 rounded-lg border border-white/10 text-center h-full">
        <div className="inline-block p-4 text-brand-accent bg-brand-accent/10 rounded-full mb-4">{icon}</div>
        <h4 className="font-bold text-white text-xl">{title}</h4>
        <p className="text-sm text-medium-gray mt-2 leading-relaxed">{desc}</p>
    </div>
);


// --- Main Page Component ---
export default function AboutUsPage() {
    const values = [
        { icon: <FiHeart size={24}/>, title: 'Customer Obsession', desc: 'Our clients are at the absolute core of every decision we make. We strive to understand their deepest needs and build solutions that create tangible, lasting value.' },
        { icon: <FiTrendingUp size={24}/>, title: 'Pioneering Innovation', desc: 'We refuse to accept the status quo. We constantly push the boundaries of technology in real estate, turning complex problems into elegant, simple solutions.' },
        { icon: <FiShield size={24}/>, title: 'Unwavering Integrity', desc: 'Our business is built on a foundation of trust. We operate with radical transparency, direct communication, and the highest ethical standards in every partnership.' },
    ];

  return (
    <>
      <Head>
        <title>About Us | Verve99</title>
        <meta name="description" content="Learn about the mission, team, and values that drive Verve99 forward in revolutionizing the workspace industry." />
      </Head>
      <div className="bg-[#1A1A1A] text-white">
        <Navbar />
        
        {/* Hero Section */}
        <header className="text-center py-24 md:py-32 bg-black/10 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-[url('/images/partner-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-5 z-0" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
                  Connecting Ambition with Opportunity
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-xl text-medium-gray max-w-3xl mx-auto">
                  We're on a mission to build the world's most efficient and user-centric platform for flexible workspaces.
              </motion.p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4">
            {/* Section 1: Our Mission */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-20 text-center">
                <FiTarget size={48} className="text-brand-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-lg text-medium-gray max-w-3xl mx-auto leading-relaxed">
                    Our mission is to democratize access to professional workspaces. We empower businesses of all sizes—from individual freelancers to global enterprises—by providing frictionless access to a world of flexible, high-quality environments. We believe the right workspace is a powerful catalyst for innovation, culture, and growth, and we are building the definitive technology platform to make finding that space effortless.
                </p>
            </motion.section>

            <hr className="border-white/10" />

            {/* Section 2: Our Journey */}
            <OurJourneySection />

            <hr className="border-white/10" />

            {/* Section 3: Our Impact */}
            <section className="py-20 text-center">
                <FiGlobe size={48} className="text-brand-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
                <p className="text-lg text-medium-gray max-w-3xl mx-auto mb-12">
                    Beyond just brokering space, we are building an ecosystem that supports local economies, empowers entrepreneurs, and enables a more sustainable and balanced way of working.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-lg border border-white/10"><p className="text-5xl font-extrabold text-brand-accent"><AnimatedCounter to={500} suffix="+" /></p><p className="text-medium-gray mt-2">Startups & SMEs Empowered</p></div>
                    <div className="bg-white/5 p-8 rounded-lg border border-white/10"><p className="text-5xl font-extrabold text-brand-accent"><AnimatedCounter to={1.2} suffix="M+" /></p><p className="text-medium-gray mt-2">Flexible Hours Booked</p></div>
                    <div className="bg-white/5 p-8 rounded-lg border border-white/10"><p className="text-5xl font-extrabold text-brand-accent"><AnimatedCounter to={190} suffix="+" /></p><p className="text-medium-gray mt-2">Local Economies Supported</p></div>
                </div>
            </section>

            <hr className="border-white/10" />
            
            {/* Section 4: Our Core Values */}
            <section className="py-20 text-center">
                <FiAward size={48} className="text-brand-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value) => ( <ValueCard key={value.title} {...value} /> ))}
                </div>
            </section>
        </main>
      
        <Footer />
      </div>
    </>
  );
}