// components/HowItWorks.jsx
import { FiSearch, FiCalendar, FiCheckCircle, FiHome, FiArrowRight } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Search for a Space',
      icon: <FiSearch className="text-2xl text-brand-primary" />,
    },
    {
      title: 'Arrange a Viewing',
      icon: <FiCalendar className="text-2xl text-brand-primary" />,
    },
    {
      title: 'Finalize Your Space',
      icon: <FiCheckCircle className="text-2xl text-brand-primary" />,
    },
    {
      title: 'Move In',
      icon: <FiHome className="text-2xl text-brand-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-primary-dark mb-12">
          Upgrade your office space in <span className="text-accent">4</span> simple steps
        </h2>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full md:w-1/4">
              {/* Number Circle */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary mb-4">
                <span className="text-primary-light font-semibold">{`0${idx + 1}`}</span>
              </div>

              {/* Icon Box */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-light border-2 border-medium-gray mb-4 shadow-sm">
                {step.icon}
              </div>

              {/* Step Title */}
              <p className="text-lg font-medium text-primary-dark">{step.title}</p>

              {/* Connector Arrow (except after last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden absolute md:flex items-center justify-center right-[-2%] top-1/2 transform translate-y-[-50%]">
                  <FiArrowRight className="text-2xl text-medium-gray opacity-75" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
