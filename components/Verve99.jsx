// components/Verve99.jsx

import {
  FiGlobe,
  FiLayers,
  FiTrendingUp,
  FiShield,
  FiThumbsUp,
} from 'react-icons/fi';

export default function Verve99() {
  const stats = [
    { number: '120+', label: 'Active Cities' },
    { number: '5,200+', label: 'Partner Hubs' },
    { number: '35,000+', label: 'Businesses Served' },
  ];

  const features = [
    {
      icon: <FiGlobe className="text-2xl" />,
      title: 'Nationwide Reach',
      desc: 'From major metros to emerging markets, explore workspaces in 120+ cities.',
    },
    {
      icon: <FiLayers className="text-2xl" />,
      title: 'Layered Solutions',
      desc: 'Choose plug‑and‑play desks or fully branded hubs—scale as you grow.',
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: 'Data‑Driven Insights',
      desc: 'Market intelligence helps you negotiate the best rates every time.',
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: 'Vetted & Secure',
      desc: 'Every location passes a 20‑point safety and quality check.',
    },
    {
      icon: <FiThumbsUp className="text-2xl" />,
      title: 'Zero Brokerage',
      desc: 'Premium listings with no hidden fees—our earnings come from providers.',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-light via-white to-primary-light overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-brand-primary opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-accent opacity-20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary-dark">
            Why <span className="text-brand-primary">Verve99</span>?
          </h2>
          <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
            Your premier partner for refined workspace solutions—powered by data and backed by trust.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-4xl font-extrabold text-brand-primary">{stat.number}</p>
              <p className="mt-2 text-medium-gray font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => (
            <div key={feat.title} className="bg-white border border-medium-gray rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-brand-primary/10 text-brand-primary">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-dark">{feat.title}</h3>
              <p className="mt-2 text-medium-gray text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
