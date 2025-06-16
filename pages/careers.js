// pages/careers.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import JobPosting from '../components/careers/JobPosting';
import ApplicationForm from '../components/careers/ApplicationForm';

// --- Page-Specific Data ---
const values = [
    { icon: <FiTrendingUp size={24}/>, title: 'Drive Innovation', desc: 'We are pioneers, constantly seeking better ways to solve problems for our clients and partners.' },
    { icon: <FiUsers size={24}/>, title: 'Empower People', desc: 'Our success is collective. We empower our team members to take ownership and make an impact.' },
    { icon: <FiAward size={24}/>, title: 'Commit to Excellence', desc: 'We set a high bar for ourselves and our work, delivering quality and building trust at every step.' },
];

const openPositions = [
    { 
        title: 'Senior Full-Stack Engineer', 
        location: 'Remote, India', 
        type: 'Full-time', 
        description: 'Join our core engineering team to build and scale the Verve99 platform. You will work across our stack, from our Next.js frontend to our Supabase backend, to deliver a world-class user experience.',
        responsibilities: ['Develop new user-facing features.', 'Build reusable components and front-end libraries.', 'Optimize applications for maximum speed and scalability.'],
        qualifications: ['5+ years of experience with React & Node.js.', 'Deep understanding of Next.js and server-side rendering.', 'Experience with PostgreSQL and Supabase is a major plus.']
    },
    { 
        title: 'Partnership Manager (Real Estate)', 
        location: 'Mumbai, MH', 
        type: 'Full-time', 
        description: 'Be the face of Verve99 to our property partners. You will onboard new high-quality workspaces, build lasting relationships with hosts, and ensure our inventory is the best in the market.',
        responsibilities: ['Identify and source new property partners.', 'Negotiate partnership agreements.', 'Serve as the primary point of contact for hosts.'],
        qualifications: ['3+ years of experience in commercial real estate or B2B sales.', 'Excellent communication and negotiation skills.', 'A deep understanding of the flexible workspace industry.']
    },
    { 
        title: 'UX/UI Designer', 
        location: 'Bangalore, KA', 
        type: 'Full-time', 
        description: 'Shape the look and feel of the Verve99 platform. You will own the design process from user research and wireframing to high-fidelity mockups and interactive prototypes, ensuring our product is both beautiful and intuitive.',
        responsibilities: ['Conduct user research and usability testing.', 'Create wireframes, storyboards, and user flows.', 'Develop and maintain our design system.'],
        qualifications: ['4+ years of experience in UX/UI design for web applications.', 'A strong portfolio showcasing your design process.', 'Proficiency in Figma, Sketch, or Adobe XD.']
    },
];

export default function CareersPage() {
  return (
    <div className="bg-[#1A1A1A] text-white">
        <Head>
            <title>Careers | Verve99</title>
            <meta name="description" content="Join the Verve99 team and help us redefine the future of work." />
        </Head>
        <Navbar />

        {/* Hero Section */}
        <header className="text-center py-24 md:py-32 bg-black/10 relative">
          <div className="absolute inset-0 w-full h-full bg-[url('/images/partner-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-5 z-0" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
                  Shape the Future of Work
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-xl text-medium-gray max-w-3xl mx-auto">
                  We're a team of innovators and problem-solvers, passionate about building the operating system for the flexible workspace industry. Join us.
              </motion.p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4">
            {/* Values Section */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Why Join Verve99?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value) => (
                         <div key={value.title} className="bg-white/5 p-8 rounded-lg border border-white/10">
                            <div className="inline-block p-4 text-brand-primary bg-brand-primary/10 rounded-full mb-4">{value.icon}</div>
                            <h4 className="font-bold text-white text-xl">{value.title}</h4>
                            <p className="text-sm text-medium-gray mt-2">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="border-white/10" />

            {/* Open Positions Section */}
            <section className="py-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Open Positions</h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                    {openPositions.map((job) => (
                        <JobPosting key={job.title} {...job} />
                    ))}
                </div>
            </section>
            
            <hr className="border-white/10" />
            
            {/* Application Form */}
            <div className="py-20">
                 <ApplicationForm />
            </div>
        </main>
      
        <Footer />
    </div>
  );
}