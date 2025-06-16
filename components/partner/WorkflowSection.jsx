// components/partner/WorkflowSection.jsx
import { useEffect, useRef, useState } from 'react';
import {
  FiCheckCircle, FiCompass, FiEdit, FiHardDrive, FiUsers, FiTarget, FiBarChart2
} from 'react-icons/fi';

const workflowSteps = [
  {
    icon: <FiCompass size={32} />,
    title: 'Assess Your Space',
    desc: 'Our process begins with a comprehensive evaluation of your property. We analyze its potential based on location, size, and layout to provide a data-backed feasibility snapshot within 24 hours.',
    features: ['Market Demand Analysis', 'Yield Projection', 'Layout Feasibility'],
  },
  {
    icon: <FiEdit size={32} />,
    title: 'Custom Design & Layout',
    desc: 'We create ultra-modern, efficient floor plans. Our designs are tailored to your unique footprint, focusing on optimal traffic flow, acoustics, and a distinct brand identity that attracts premium clients.',
    features: ['3D Renderings & Virtual Walkthroughs', 'Ergonomic & Biophilic Design', 'Brand Integration'],
  },
  {
    icon: <FiHardDrive size={32} />,
    title: 'Interior Fit-Out & Furnishing',
    desc: 'Verve99 manages the entire transformation. We handle everything from installing partitions and power outlets to sourcing ergonomic workstations and designing comfortable lounge zones.',
    features: ['Project Management', 'Vendor Negotiation', 'Quality Control'],
  },
  {
    icon: <FiCheckCircle size={32} />,
    title: 'Tech & Connectivity',
    desc: 'A modern workspace runs on seamless technology. We deploy enterprise-grade, high-speed internet, secure access control, and integrated video conferencing systems.',
    features: ['Enterprise-Grade WiFi', 'Secure Access Systems', 'Plug & Play AV'],
  },
  {
    icon: <FiUsers size={32} />,
    title: 'Operations & Management',
    desc: 'We handle the day-to-day so you don’t have to. This includes on-site staff training, integration with the Verve99 booking platform, and curating a vibrant community events calendar.',
    features: ['Staff Recruitment & Training', 'Platform Integration', 'Community Engagement'],
  },
  {
    icon: <FiTarget size={32} />,
    title: 'Marketing & Launch',
    desc: 'A successful launch is key. We execute a custom marketing campaign including local outreach, digital advertising, and a content plan to build buzz and fill your desks quickly.',
    features: ['Pre-Launch Campaigns', 'Digital Marketing & SEO', 'Broker & Partner Outreach'],
  },
  {
    icon: <FiBarChart2 size={32} />,
    title: 'Analytics & Revenue Share',
    desc: 'Our partnership is built on transparency. Your host dashboard provides real-time insights on occupancy rates, member feedback, and detailed monthly revenue statements and payouts.',
    features: ['Real-Time Dashboard', 'Occupancy Analytics', 'Transparent Payouts'],
  },
];

// Custom hook for scroll animations (no changes here)
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.3 }
    );
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

// A single step component
function WorkflowStep({ icon, title, desc, features, isLeftAligned }) {
    const ref = useRef();
    const onScreen = useOnScreen(ref);

    return (
        // THIS IS THE ONLY LINE WE ARE CHANGING: mb-8 is now mb-20
        <div ref={ref} className="flex items-center w-full mb-20 min-h-[200px]">
            <div className={`flex items-start gap-8 w-full ${isLeftAligned ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Icon */}
                <div className={`
                    p-6 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-full text-brand-primary
                    transition-all duration-700
                    ${onScreen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}>
                    {icon}
                </div>
                {/* Content */}
                <div className={`
                    w-full transition-all duration-700
                    ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ textShadow: '0 0 8px rgba(52, 152, 219, 0.4)' }}>
                        {title}
                    </h3>
                    <p className="text-lg text-medium-gray mb-4">{desc}</p>
                    <ul className="space-y-1">
                        {features.map(feature => (
                            <li key={feature} className="flex items-center text-gray-400">
                                <FiCheckCircle className="text-brand-primary mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

// The main section component (no changes here)
export default function WorkflowSection() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-24">
            {workflowSteps.map((step, index) => (
                <WorkflowStep
                    key={step.title}
                    icon={step.icon}
                    title={step.title}
                    desc={step.desc}
                    features={step.features}
                    isLeftAligned={index % 2 === 0}
                />
            ))}
        </div>
    );
}