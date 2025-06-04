// components/Verve99.jsx

import {
  FiGlobe,
  FiLayers,
  FiTrendingUp,
  FiShield,
  FiThumbsUp,
} from 'react-icons/fi';

export default function Verve99() {
  // Left‐column statistics
  const stats = [
    { number: '120+', label: 'Active Cities' },
    { number: '5,200+', label: 'Partner Hubs' },
    { number: '35,000+', label: 'Businesses Served' },
  ];

  // Right‐column features
  const features = [
    {
      icon: <FiGlobe className="text-3xl text-brand-primary" />,
      title: 'Nationwide Reach',
      desc: 'From major metros to emerging markets, explore over 120 cities with a single click.',
    },
    {
      icon: <FiLayers className="text-3xl text-brand-primary" />,
      title: 'Layered Solutions',
      desc: 'Choose everything from a plug-and-play desk to a fully branded enterprise hub—scalable as you grow.',
    },
    {
      icon: <FiTrendingUp className="text-3xl text-brand-primary" />,
      title: 'Data-Driven Insights',
      desc: 'Our analytics engine surfaces market trends and pricing intelligence, so you always negotiate from strength.',
    },
    {
      icon: <FiShield className="text-3xl text-brand-primary" />,
      title: 'Vetted & Secure',
      desc: 'Every workspace passes a rigorous 20-point safety and quality check. Peace of mind is built‐in.',
    },
    {
      icon: <FiThumbsUp className="text-3xl text-brand-primary" />,
      title: 'Zero Brokerage',
      desc: 'Premium listings with no hidden fees. We earn only from providers, never from you.',
    },
  ];

  return (
    <section className="relative py-20 bg-primary-light overflow-hidden">
      {/* Optional soft background pattern (Very subtle) */}
      <div
        className="absolute inset-0 bg-[url('/pattern-diagonal.svg')] opacity-5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-12">
        {/* ========== LEFT COLUMN: Statistics Cards ========== */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-primary-dark">
            Why <span className="text-accent">Verve99</span>?
          </h2>
          <p className="text-medium-gray text-lg max-w-md">
            Your strategic partner for finding, comparing, and securing the perfect workspace—powered by data, backed by trust.
          </p>
          <div className="space-y-6">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 bg-white border border-medium-gray rounded-lg p-6 shadow-sm"
              >
                <div className="flex-shrink-0">
                  <span className="text-4xl font-extrabold text-accent">
                    {item.number}
                  </span>
                </div>
                <p className="text-lg font-medium text-primary-dark">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== RIGHT COLUMN: Feature Cards ========== */}
        <div className="mt-16 lg:mt-0 space-y-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-5 bg-white border border-medium-gray rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary-light border-2 border-brand-primary flex items-center justify-center">
                  {feat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-dark">
                  {feat.title}
                </h3>
                <p className="mt-1 text-medium-gray">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
