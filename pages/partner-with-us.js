// pages/partner-with-us.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkflowSection from '../components/partner/WorkflowSection';
import LeadForm from '../components/partner/LeadForm';
import Head from 'next/head';

export default function PartnerWithUsPage() {
  return (
    <>
      <Head>
        <title>Partner With Us | Verve99</title>
        <meta name="description" content="Transform Your Commercial Property into a High-Value Verve99 Coworking Hub." />
      </Head>

      {/* The main container with the dark background */}
      <div className="bg-[#1A1A1A] text-white">
        {/* This div creates the static, non-scrolling background image effect */}
        <div className="fixed inset-0 w-full h-full bg-[url('/images/partner-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-10 z-0" />

        {/* The content container, which scrolls over the background */}
        <div className="relative z-10">
          <Navbar />

          {/* --- Hero Section --- */}
          <header className="text-center min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl animate-fade-in-down" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>
              Transform Your Property into a High-Value <span className="text-brand-primary">Verve99 Hub</span>
            </h1>
            <p className="mt-6 text-xl text-medium-gray max-w-2xl animate-fade-in-down [animation-delay:0.3s]">
              From blueprint to booking—everything you need, backed by Verve99 expertise.
            </p>
            <a 
              href="#lead-form"
              className="mt-10 px-8 py-3 text-lg font-bold text-brand-primary border-2 border-brand-primary rounded-lg transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-[0_0_20px_rgba(52,152,219,0.7)] animate-fade-in-down [animation-delay:0.6s]"
            >
              Get Started
            </a>
          </header>

          {/* --- Workflow Section --- */}
          <WorkflowSection />
          
          {/* --- Lead Capture Form Section --- */}
          <LeadForm />

          <Footer />
        </div>
      </div>
    </>
  );
}