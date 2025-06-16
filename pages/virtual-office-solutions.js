// pages/virtual-office-solutions.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, PhoneCall, Building, UserCheck, ShieldCheck, ChevronDown
} from 'lucide-react';

// --- Reusable Section Component ---
const Section = ({ children, className = '' }) => (
  <motion.section
    className={`py-20 px-4 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-6xl mx-auto">{children}</div>
  </motion.section>
);

// --- Page-Specific Components ---
const ServiceCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 p-8 rounded-lg border border-white/10 text-center h-full">
    <div className="inline-block p-4 text-brand-primary bg-brand-primary/10 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-white text-xl">{title}</h3>
    <p className="text-sm text-medium-gray mt-2 leading-relaxed">{desc}</p>
  </div>
);

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-5 text-left text-lg font-semibold text-white"
            >
                <span>{question}</span>
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-5 text-medium-gray">{answer}</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};


// --- Main Page Component ---
export default function VirtualOfficePage() {
    const services = [
        { icon: <Building size={32} />, title: 'Prestigious Business Address', desc: 'Establish instant credibility with a prime mailing address in any major city for your company registration, mail, and packages.' },
        { icon: <Mail size={32} />, title: 'Mail Handling & Forwarding', desc: 'Our professional team receives, sorts, and forwards your mail to any location worldwide, with optional scanning services.' },
        { icon: <PhoneCall size={32} />, title: 'Dedicated Local Phone Number', desc: 'Secure a local phone number for your business, complete with professional call answering and forwarding services to your mobile.' },
        { icon: <UserCheck size={32} />, title: 'On-Demand Receptionist', desc: 'Create a lasting impression with our trained receptionists who answer calls in your company’s name and handle basic inquiries.' },
    ];
    const faqs = [
        { question: "What is a virtual office?", answer: "A virtual office provides a business with a physical address and office-related services without the overhead of a long lease and administrative staff. You can use it for business registration, mail handling, and call answering." },
        { question: "Is a virtual office legally compliant for company registration?", answer: "Yes, our virtual office addresses are on commercial properties and are fully compliant with all legal requirements for company and GST registration in India." },
        { question: "How is my mail handled?", answer: "All mail and packages are received by our on-site team and securely stored. You will be notified of any deliveries. We offer weekly, bi-weekly, or on-demand mail forwarding to your chosen address, as well as scan-to-email services." },
        { question: "Can I use the office space physically?", answer: "While a standard virtual office plan does not include physical access, many of our virtual office packages can be bundled with on-demand access to meeting rooms or coworking day passes at a discounted rate." },
    ];

  return (
    <div className="bg-[#1A1A1A] text-white">
      <Head>
        <title>Virtual Office Solutions | Verve99</title>
        <meta name="description" content="Establish your business presence anywhere with Verve99's premium virtual office solutions, including mail handling, call answering, and a professional business address." />
      </Head>
      <Navbar />

      {/* Hero Section */}
      <header className="text-center py-24 md:py-32 bg-black/10 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[url('/images/partner-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-5 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
            Power Your Presence, Anywhere
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-xl text-medium-gray max-w-3xl mx-auto">
            Get a premium business address, mail handling, and call answering services without the cost of a physical office.
          </motion.p>
        </div>
      </header>

      <main>
        {/* Core Services Section */}
        <Section>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">Our Virtual Office Services</h2>
                <p className="mt-3 text-lg text-medium-gray">A complete suite of tools to build your professional presence.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                        <ServiceCard {...service} />
                    </motion.div>
                ))}
            </div>
        </Section>
        
        {/* How It Works Section */}
        <Section>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">Get Started in 3 Simple Steps</h2>
            </div>
            <div className="relative max-w-4xl mx-auto">
                <motion.div initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="absolute top-8 left-0 w-full h-0.5 bg-brand-primary/30" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {[
                        { num: '1', title: 'Choose Your Plan & Location', desc: 'Select from our flexible plans and pick a prime business address from our network of cities.' },
                        { num: '2', title: 'Complete Your KYC', desc: 'Submit your business documents online for quick and secure verification by our team.' },
                        { num: '3', title: 'Activate Your Services', desc: 'Your virtual office is ready. Start using your new address and phone number immediately.' }
                    ].map((step, index) => (
                         <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center font-bold text-2xl text-white shadow-[0_0_15px_rgba(52,152,219,0.7)]">{step.num}</div>
                                <h3 className="ml-4 text-xl font-bold text-white">{step.title}</h3>
                            </div>
                            <p className="text-medium-gray ml-20">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
        
        {/* FAQ Section */}
        <Section>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-lg p-2">
                {faqs.map(faq => (
                    <FaqItem key={faq.question} {...faq} />
                ))}
            </div>
        </Section>

      </main>

      <Footer />
    </div>
  );
}