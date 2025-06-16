// pages/where-we-stand.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { 
    FiTrendingUp, FiCopy, FiMap, FiStar, FiCpu, 
    FiShield, FiAward, FiRefreshCw, FiCheckCircle, 
    FiUsers, FiDatabase, FiArrowRight
} from 'react-icons/fi';

// --- 1. Reusable Helper Hook & Component ---
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

function AnimatedCounter({ to, suffix = '', label }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (inView) {
            const controls = animate(0, to, {
                duration: 2,
                onUpdate(value) {
                    if (ref.current) {
                        const isInt = value % 1 === 0;
                        ref.current.textContent = (isInt ? value.toFixed(0) : value.toFixed(1)) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, to, suffix, label]);
    return <span ref={ref} />;
}

// --- 2. All 8 Visual Components ---

const MarketShiftVisual = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    return(
        <div ref={ref} className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.path d="M 5 120 C 30 110, 40 40, 65 30 S 85 20, 95 10" fill="none" stroke="url(#market-gradient)" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2, ease: "circOut" }}/>
                <defs><linearGradient id="market-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3498DB" /><stop offset="100%" stopColor="#FF00FF" /></linearGradient></defs>
            </svg>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.5, duration: 0.8 }} className="absolute top-2 right-4 text-right">
                <p className="font-bold text-4xl text-white"><AnimatedCounter to={200} suffix="%+" /></p>
                <p className="text-sm text-medium-gray">Projected Growth</p>
            </motion.div>
        </div>
    );
};

const AdvantageVisual = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const variants = { visible: { transition: { staggerChildren: 0.4 } }, hidden: {} };
    const itemVariants = { visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -20 } };
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} className="space-y-4">
            <motion.div variants={itemVariants} className="bg-white/5 p-4 rounded-lg border border-red-500/20 text-red-400 line-through">Traditional Brokers & Long Leases</motion.div>
            <motion.div variants={itemVariants} className="flex justify-center"><FiArrowRight className="text-4xl text-medium-gray" /></motion.div>
            <motion.div variants={itemVariants} className="p-4 rounded-lg bg-brand-primary/10 border border-brand-primary/50 text-brand-primary font-bold">A Unified Technology Platform</motion.div>
        </motion.div>
    );
};

const TechStackVisual = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const items = [ { icon: <FiUsers />, name: "Client Apps" }, { icon: <FiDatabase />, name: "Host Portals" }, { icon: <FiCpu />, name: "Data Engine" }];
    return (
        <div ref={ref} className="w-full flex justify-around items-center h-64 bg-white/5 border border-white/10 rounded-lg p-4 relative">
            <svg className="absolute w-full h-full top-0 left-0 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none"><motion.path initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.5, duration: 1 }} d="M 50 15 V 85" stroke="rgba(52, 152, 219, 0.2)" strokeWidth="1" strokeDasharray="2 2" /></svg>
            {items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, scale: 0.5 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.3 }} className="text-center">
                    <div className="p-5 bg-white/10 rounded-full text-brand-primary text-3xl">{item.icon}</div>
                    <p className="text-xs font-bold mt-2">{item.name}</p>
                </motion.div>
            ))}
        </div>
    );
};

const AnimatedIndiaMap = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const cities = [{ name: 'Delhi', x: '50%', y: '30%' }, { name: 'Mumbai', x: '35%', y: '55%' }, { name: 'Bangalore', x: '50%', y: '75%' }, { name: 'Chennai', x: '58%', y: '78%' }, { name: 'Hyderabad', x: '55%', y: '65%' }, { name: 'Pune', x: '40%', y: '60%' }, { name: 'Kolkata', x: '80%', y: '45%' }];
    return (
        <motion.div ref={ref} className="relative w-full aspect-[4/5] max-w-sm mx-auto" initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ staggerChildren: 0.1 }}>
            <motion.svg viewBox="0 0 793.12 905.99" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <motion.path d="M653.13,242.33l-13.4-12.71-3.35-7.43-11.42-3.35-1.34-6.04-10.07-2.68-4.02-4.02-22.13-10.07-2.68-12.08-14.75-10.74-2.68-10.74-18.1-16.09-12.08-2.68-15.42-16.77-16.77-14.75-2.68-14.09-2.01-14.75-16.77-6.71-12.74-10.74-12.08-11.4-6.71-11.4-12.74-14.09-31.52-2.01-16.77-2.68-18.78-9.39-12.74L350.5,0l-16.77,2.68-16.1,2.68-14.09,10.07-10.74,10.74-2.68,14.09L272,60.38l-10.07,14.75-12.08,12.08L236.43,101l-10.74,14.75-16.77,10.74-12.74,12.74-12.08,16.77-15.42,12.74-12.74,12.08-16.77,10.74-14.09-2.01-14.75,2.01-12.08,10.07-16.77,14.75-10.07,13.4-12.08,16.77-2.68,10.74-2.01,13.4-2.68,14.09-10.74,12.08-10.07,12.74-14.09,16.77-11.4,12.74-12.74,12.08-16.77,10.74-14.09,2.68-12.74,10.74-2.01,16.1-2.01,14.75,2.01,14.09-2.68,12.74-2.01,16.77,2.01,15.42,10.07,13.4,12.74,10.74-2.01,12.08,2.01,14.75,10.74,16.1,12.74,15.42,16.77,14.09,10.74,12.08,14.75,10.07,16.1-2.01,12.74-2.68,14.09,10.07,13.4,14.09,16.1,12.08,15.42,16.1,14.75,10.74-2.01,12.08-2.68,13.4,2.01,14.09-2.01,12.74-2.68,14.75,10.74,16.1,12.08,15.42,16.77,14.09,10.74,12.74,14.75,10.07,16.1-2.01,12.74-2.68,14.09-10.07,13.4-14.09,16.1-12.08,15.42-16.77-14.09-10.74-12.74-14.75-10.07-16.1,2.01-12.74,2.68-14.09L653.13,242.33Z" fill="rgba(52, 152, 219, 0.1)" stroke="rgba(52, 152, 219, 0.3)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}/>
            </motion.svg>
            {cities.map((city, index) => (<motion.div key={city.name} className="absolute" style={{ top: city.y, left: city.x }} initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}><div className="w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(255,0,255,1)]" /></motion.div>))}
        </motion.div>
    );
};

const AnimatedCounterVisual = ({ to, suffix, label }) => (<div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center"><p className="text-5xl font-extrabold text-brand-accent"><AnimatedCounter to={to} suffix={suffix} label={label}/></p><p className="text-medium-gray mt-2">{label}</p></div>);
const BusinessModelVisual = () => (<div className="w-full flex flex-col items-center gap-4"><div className="w-full p-4 text-center bg-white/5 border border-white/10 rounded-lg"><p className="font-bold text-brand-primary">Enterprise SaaS Fees</p></div><div className="w-full p-4 text-center bg-white/5 border border-white/10 rounded-lg"><p className="font-bold text-brand-primary">Host Partnership Revenue Share</p></div></div>);
const TeamExpertiseVisual = () => (<div className="flex justify-around w-full">{["Real Estate", "Technology", "Hospitality"].map((pillar) => (<div key={pillar} className="text-center"><div className="w-20 h-20 mx-auto rounded-full bg-brand-primary/10 flex items-center justify-center border-2 border-brand-primary/20 text-brand-primary text-3xl font-bold">{pillar.charAt(0)}</div><p className="mt-3 font-semibold">{pillar}</p></div>))}</div>);
const NetworkEffectVisual = () => (<div className="w-full h-64 flex items-center justify-center"><motion.div className="relative w-56 h-56"><motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full border-2 border-dashed border-brand-primary/30 rounded-full" /><motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-brand-accent/30 rounded-full" /><div className="absolute inset-0 flex items-center justify-center text-brand-primary font-bold">Verve99</div></motion.div></div>);

// --- 4. Main Page Component ---
export default function WhereWeStandPage() {
    const sections = [
        { icon: <FiTrendingUp size={48} />, title: "An Unprecedented Market Shift", content: "The global move towards flexible work is a fundamental restructuring of commercial real estate. The Indian market is at the forefront of this evolution, projected to grow over 200% by 2028 as businesses abandon rigid leases for agile portfolios.", visual: <MarketShiftVisual /> },
        { icon: <FiCopy size={48} />, title: "The Verve99 Advantage", content: "We were built for this new era. Unlike traditional brokerage models, Verve99 operates as a technology-first platform providing a unified, data-driven ecosystem for the nation's best workspaces.", visual: <AdvantageVisual /> },
        { icon: <FiCpu size={48} />, title: "A Proprietary Technology Stack", content: "Our platform is more than a website; it's a full-stack solution. With dedicated portals for hosts, powerful search for clients, and a robust data engine, we provide a seamless, end-to-end digital experience.", visual: <TechStackVisual /> },
        { icon: <FiMap size={48} />, title: "A Truly National Footprint", content: "Our competitive edge lies in our scale and quality. With over 3,100 partner hubs across 190+ cities, we offer unparalleled access to both Tier-1 metros and emerging markets.", visual: <AnimatedIndiaMap /> },
        { icon: <FiStar size={48} />, title: "Unwavering Commitment to Quality", content: "Our growth reflects our clients' success. We focus on metrics that matter: reducing costs, increasing efficiency, and providing workspaces that employees love.", visual: <div className="grid grid-cols-2 gap-6 w-full"><AnimatedCounterVisual to={4.8} label="Average Rating" /><AnimatedCounterVisual to={95} suffix="%" label="Client Retention" /></div> },
        { icon: <FiShield size={48} />, title: "A Sustainable Business Model", content: "Our asset-light, partnership-focused model ensures long-term stability and growth. By aligning our success with our partners, we've built a resilient business prepared for market cycles.", visual: <BusinessModelVisual /> },
        { icon: <FiAward size={48} />, title: "Backed by Industry Veterans", content: "Our leadership team brings decades of combined experience from the pinnacles of real estate, technology, and hospitality. This expertise allows us to navigate complex challenges and build innovative solutions.", visual: <TeamExpertiseVisual /> },
        { icon: <FiRefreshCw size={48} />, title: "The Network Effect", content: "Our platform creates a virtuous cycle. More high-quality hosts attract more enterprise clients, which generates more data, allowing us to improve our platform and drive more value back to our entire ecosystem.", visual: <NetworkEffectVisual /> },
    ];

  return (
    <div className="bg-[#1A1A1A] text-white">
        <Head>
            <title>Where We Stand | Verve99</title>
            <meta name="description" content="A data-driven look at our market position, performance, and the paradigm shift in commercial real estate." />
        </Head>
        <Navbar />
        <header className="text-center py-24 md:py-32 bg-black/10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
                    Where We Stand
                </h1>
                <p className="mt-6 text-xl text-medium-gray max-w-3xl mx-auto">
                    A data-driven look at our position, performance, and the paradigm shift in commercial real estate.
                </p>
            </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 divide-y divide-white/10">
          {sections.map((section, index) => (
            <motion.div key={section.title} className="flex items-center w-full py-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
              <div className={`flex items-center gap-12 w-full flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1">
                  <div className="inline-block p-5 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary mb-6">{section.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-lg text-medium-gray leading-relaxed">{section.content}</p>
                </div>
                <div className="flex-1 w-full min-h-[18rem] flex items-center justify-center">{section.visual}</div>
              </div>
            </motion.div>
          ))}
        </main>
        <Footer />
      </div>
  );
}