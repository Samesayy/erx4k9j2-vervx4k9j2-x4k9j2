import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import * as Tabs from '@radix-ui/react-tabs';
import {
  Building2, ShieldCheck, Users, Wifi, CalendarClock, Gem, Lock, GaugeCircle,
  ChevronLeft, ChevronRight, CheckCircle, Headset, Settings, Share2
} from 'lucide-react';

// --- CORRECTED: Using correct relative paths for component imports ---
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// --- Helper Components & Data ---

const Section = ({ children, className = '' }) => {
  return (
    <motion.section 
      className={`py-24 px-4 ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
};

const features = [
  { icon: <Building2 />, title: "Dedicated Team Suites", desc: "Private, branded office spaces designed for productivity and collaboration." },
  { icon: <Lock />, title: "Private Meeting Rooms", desc: "On-demand conference rooms with state-of-the-art video conferencing." },
  { icon: <ShieldCheck />, title: "Virtual Office & Address", desc: "A premium business address with mail handling and call answering services." },
  { icon: <Users />, title: "On-Demand Hot Desks", desc: "Flexible access to coworking spaces across our national network." },
  { icon: <GaugeCircle />, title: "24/7 Secure Access", desc: "Advanced security protocols, including CCTV and keycard access control." },
  { icon: <Wifi />, title: "High-Speed IT Infrastructure", desc: "Enterprise-grade internet with dedicated IT support and private VLAN options." },
  { icon: <CalendarClock />, title: "Community & Events", desc: "Access to curated networking events, workshops, and industry talks." },
  { icon: <Gem />, title: "Wellness & Ergonomics", desc: "Spaces designed with ergonomic furniture and wellness amenities to support your team." },
];
const techChartData = [ { name: 'Q1', speed: 950, uptime: 99.9 }, { name: 'Q2', speed: 980, uptime: 99.99 }, { name: 'Q3', speed: 990, uptime: 99.98 }, { name: 'Q4', speed: 1000, uptime: 99.99 }];
const processSteps = ["Consult", "Design", "Build", "Onboard"];
const testimonials = [ { logo: 'https://placehold.co/150x50/ffffff/95A5A6?text=InnovateTech', quote: "Verve99's enterprise solution allowed us to scale into three new cities seamlessly. Their attention to detail and dedicated support are second to none.", name: 'Priya Sharma', title: 'COO, InnovateTech' }, { logo: 'https://placehold.co/150x50/ffffff/95A5A6?text=Global+Corp', quote: "The custom-branded suite has been a huge boost for our company culture and talent acquisition. Verve99 delivered beyond our expectations.", name: 'Rohan Mehta', title: 'VP of Operations, Global Corp' }, { logo: 'https://placehold.co/150x50/ffffff/95A5A6?text=NextGen', quote: "The analytics dashboard is a game-changer. We can finally make data-driven decisions about our real estate footprint, saving us over 20% annually.", name: 'Anjali Desai', title: 'Head of People, NextGen Solutions' }];
const enterpriseSolutions = [ { title: 'Managed Headquarters', description: 'A fully outsourced, custom-branded office managed entirely by Verve99.' }, { title: 'Hub-and-Spoke Models', description: 'A central HQ supported by a network of smaller, flexible satellite offices.' }, { title: 'On-Demand Project Spaces', description: 'Dedicated, short-term spaces for specific projects, teams, or events.' }, { title: 'Multi-City Access Passes', description: 'A single, unified pass for your team to access our national network of workspaces.' }];
const formSchema = yup.object().shape({ companyName: yup.string().required('Company name is required'), contactPerson: yup.string().required('Contact name is required'), email: yup.string().email('Invalid email address').required('Email is required'), phone: yup.string().required('Phone number is required'), moveInDate: yup.date().required('Please select a move-in date').min(new Date(), 'Date must be in the future'), requirements: yup.string().required('Please describe your requirements')});

// --- Main Page Component ---
export default function EnterpriseSolutionsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  const onFormSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Thank you! Your custom quote request has been submitted.");
  };
  
  const nextTestimonial = () => setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-[#ECF0F1] font-sans text-[#2C3E50]">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white bg-gradient-to-br from-[#2C3E50] via-[#4A6E8A] to-[#3498DB]">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20"/>
         <div className="relative z-10 p-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold"
            >
              Enterprise Workspace Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-4 text-xl md:text-2xl text-[#ECF0F1] max-w-3xl mx-auto"
            >
              Flexible, Scalable & Secure Workspaces Tailored for Your Organization
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            >
              <a href="#quote-form" className="mt-8 inline-block bg-[#3498DB] text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Get Your Custom Quote
              </a>
            </motion.div>
         </div>
      </section>

      {/* 2. Key Features Grid */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Everything Your Enterprise Needs</h2>
          <p className="mt-2 text-lg text-gray-600">A complete suite of services to power your team's productivity.</p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center">
              <div className="p-4 bg-[#3498DB]/10 rounded-full text-[#3498DB]">{React.cloneElement(feature.icon, { size: 32 })}</div>
              <h3 className="mt-5 font-bold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 flex-grow">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 3. Workspace Customization */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Customize Your Space, Your Way</h2>
            <p className="mt-4 text-lg text-gray-600">Our design experts work with you to create a workspace that reflects your brand and culture. From custom floor plans and branding to specialized tech and furniture, we build an office that is truly yours.</p>
          </div>
          <motion.div className="h-96 w-full rounded-xl shadow-lg border p-4">
             <svg width="100%" height="100%" viewBox="0 0 500 500">
                <g>
                    <motion.rect x="50" y="50" width="400" height="400" fill="#ECF0F1" stroke="#3498DB" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1}} viewport={{once: true}} />
                    <motion.rect x="70" y="70" width="150" height="100" fill="white" stroke="gray" initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{delay: 0.5}} viewport={{once: true}}/>
                    <motion.text x="95" y="125" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.7}} viewport={{once: true}}>Office 1</motion.text>
                    <motion.rect x="250" y="70" width="180" height="100" fill="white" stroke="gray" initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{delay: 0.8}} viewport={{once: true}}/>
                    <motion.text x="300" y="125" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 1}} viewport={{once: true}}>Office 2</motion.text>
                    <motion.rect x="70" y="200" width="360" height="230" fill="white" stroke="gray" initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{delay: 1.1}} viewport={{once: true}}/>
                    <motion.text x="220" y="315" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 1.3}} viewport={{once: true}}>Open Area</motion.text>
                </g>
            </svg>
          </motion.div>
        </div>
      </Section>
      
      {/* 4. Technology & Analytics */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powered by Enterprise-Grade Tech</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.ul variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true}} className="space-y-4">
             {['Secure Private VLANs', 'Redundant High-Speed Internet', '24/7 Monitored Access Control', 'Uninterrupted Power Backup'].map(item => (
                <motion.li key={item} variants={itemVariants} className="flex items-center text-lg font-medium"><CheckCircle className="text-[#3498DB] mr-3" size={24}/>{item}</motion.li>
             ))}
          </motion.ul>
           <div className="h-80 w-full">
             <ResponsiveContainer>
              <LineChart data={techChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[99, 100]}/>
                <Tooltip />
                <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{once: true}}>
                  <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#3498DB" strokeWidth={3} dot={{r: 5}} activeDot={{r: 8}}/>
                </motion.g>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* 5. How It Works */}
      <Section className="bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">A Simplified Process</h2>
        <div className="flex items-start justify-between relative max-w-4xl mx-auto">
          <motion.div className="absolute top-5 left-0 w-full h-1 bg-gray-200" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.2 }} viewport={{once: true}}/>
          {processSteps.map((step, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 }}} transition={{delay: 0.5 + index * 0.2}} className="relative z-10 flex flex-col items-center text-center w-1/4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-colors duration-300 ${index <= currentStep ? 'bg-[#3498DB] text-white' : 'bg-gray-200 text-gray-500'}`}>{index + 1}</div>
              <p className="mt-3 text-sm font-semibold">{step}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* 6. Client Success Stories */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Partner Success Stories</h2>
        <div className="max-w-4xl mx-auto relative p-8 bg-white rounded-xl shadow-lg">
           <AnimatePresence mode="wait">
             <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="text-center">
               <img src={testimonials[currentTestimonial].logo} alt="Client Logo" className="h-12 mx-auto mb-6" onError={(e) => e.target.style.display = 'none'} />
               <p className="text-lg italic text-gray-700">"{testimonials[currentTestimonial].quote}"</p>
               <p className="mt-6 font-bold">{testimonials[currentTestimonial].name}</p>
               <p className="text-sm text-gray-500">{testimonials[currentTestimonial].title}</p>
             </motion.div>
           </AnimatePresence>
           <button onClick={prevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-light-gray hover:bg-gray-200 transition"><ChevronLeft/></button>
           <button onClick={nextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-light-gray hover:bg-gray-200 transition"><ChevronRight/></button>
        </div>
      </Section>
      
      {/* 7. Tailored Solutions Section */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold">Tailored Solutions for Your Enterprise</h2>
             <p className="text-lg text-gray-600">We don't believe in one-size-fits-all. Our solutions are designed to match your company's specific goals, from single-team suites to global real estate strategies.</p>
             <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true}} className="space-y-4">
                {enterpriseSolutions.map(solution => (
                   <motion.div key={solution.title} variants={itemVariants} className="p-4 bg-light-gray rounded-lg border border-gray-200">
                      <h4 className="font-bold text-lg text-[#3498DB]">{solution.title}</h4>
                      <p className="text-sm text-gray-500">{solution.description}</p>
                   </motion.div>
                ))}
             </motion.div>
          </div>
          <motion.div className="h-96 w-full rounded-xl overflow-hidden shadow-lg" whileHover={{ scale: 1.02 }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team collaborating" className="w-full h-full object-cover"/>
          </motion.div>
        </div>
      </Section>

      {/* 8. Support & Integrations */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Seamless Integration & Dedicated Support</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            {[ {icon: <Headset/>, title: "Dedicated Account Manager"}, {icon: <Share2/>, title: "API & HRIS Integrations"}, {icon: <Settings/>, title: "Custom Onboarding & Training"} ].map(item => (
                <motion.div key={item.title} whileHover={{ y: -5, scale: 1.05 }} className="p-6">
                    <motion.div whileHover={{rotate: [0, 10, -10, 0]}} className="p-5 inline-block bg-[#3498DB]/10 text-[#3498DB] rounded-full">{React.cloneElement(item.icon, {size: 32})}</motion.div>
                    <h3 className="mt-4 font-bold text-lg">{item.title}</h3>
                </motion.div>
            ))}
        </div>
      </Section>

      {/* 9. Contact Form */}
      <Section className="bg-white">
        <div id="quote-form" className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl shadow-2xl border">
            <h2 className="text-3xl font-bold text-center mb-8">Let's Design Your Enterprise Solution</h2>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                 <div>
                    <input {...register("companyName")} placeholder="Company Name" className="w-full p-4 border rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                 </div>
                 <div>
                    <input {...register("contactPerson")} placeholder="Contact Person" className="w-full p-4 border rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
                 </div>
                 <div>
                    <input {...register("email")} placeholder="Email Address" className="w-full p-4 border rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                 </div>
                 <div>
                    <input {...register("phone")} placeholder="Phone Number" className="w-full p-4 border rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                 </div>
                 <div>
                    <input type="date" {...register("moveInDate")} className="w-full p-4 border rounded-md text-gray-500 focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.moveInDate && <p className="text-red-500 text-sm mt-1">{errors.moveInDate.message}</p>}
                 </div>
                 <div>
                    <textarea {...register("requirements")} placeholder="Describe your space requirements..." rows="4" className="w-full p-4 border rounded-md focus:ring-2 focus:ring-[#3498DB] focus:border-transparent outline-none"/>
                    {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>}
                 </div>
                 <motion.button 
                    whileHover={{scale: 1.05, y: -2, boxShadow: '0 10px 20px -10px rgba(52, 152, 219, 0.7)'}}
                    whileTap={{scale: 0.95}}
                    type="submit" 
                    className="w-full bg-[#3498DB] text-white font-bold py-4 rounded-lg text-lg"
                  >
                   Submit Inquiry
                 </motion.button>
            </form>
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}
