// components/Verve99.jsx
import {
  FiGlobe,
  FiLayers,
  FiTrendingUp,
  FiShield,
  FiThumbsUp,
  FiHeadphones,
} from 'react-icons/fi';

export default function Verve99() {
  const stats = [
    { number: '190+', label: 'Active Cities' },
    { number: '3,110+', label: 'Partner Hubs' },
    { number: '39,000+', label: 'Businesses Served' },
  ];

  const features = [
    {
      icon: <FiGlobe size={28} />,
      title: 'Nationwide Reach',
      desc: 'From major metros to emerging markets, explore workspaces in 120+ cities.',
    },
    {
      icon: <FiLayers size={28} />,
      title: 'Layered Solutions',
      desc: 'Choose plug‑and‑play desks or fully branded hubs—scale as you grow.',
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: 'Data‑Driven Insights',
      desc: 'Market intelligence helps you negotiate the best rates every time.',
    },
    {
      icon: <FiShield size={28} />,
      title: 'Vetted & Secure',
      desc: 'Every location passes a 20‑point safety and quality check.',
    },
    {
      icon: <FiThumbsUp size={28} />,
      title: 'Zero Brokerage',
      desc: 'Premium listings with no hidden fees—our earnings come from providers.',
    },
    {
      icon: <FiHeadphones size={28} />,
      title: 'Dedicated Support',
      desc: 'A single point of contact to guide you from search to signing, ensuring a smooth process.',
    },
  ];

  return (
    // 1. UPDATED SECTION BACKGROUND
    <section className="relative py-24 bg-gradient-to-b from-primary-light to-white overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-1/4 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-primary-dark tracking-tight">
            Why <span className="text-brand-primary">Verve99</span>?
          </h2>
          <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
            Your premier partner for refined workspace solutions—powered by data and backed by trust.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-24">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-xl p-6 text-center shadow-sm">
              <p className="text-5xl font-extrabold text-brand-primary">{stat.number}</p>
              <p className="mt-2 text-medium-gray font-semibold tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => (
            // 2. UPDATED CARD STYLING
            <div 
              key={feat.title} 
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl border border-gray-200/80 hover:border-brand-primary/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* 3. UPDATED ICON STYLING */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-primary/10 to-accent/10 text-brand-primary shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-dark">{feat.title}</h3>
              <p className="mt-2 text-medium-gray leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}