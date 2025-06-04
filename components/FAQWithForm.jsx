// components/FAQWithForm.jsx

import { useState } from 'react';
import Image from 'next/image';
import { FiPlus, FiMinus, FiInfo } from 'react-icons/fi';

export default function FAQWithForm() {
  // All 10 FAQs
  const faqs = [
    {
      q: 'What is Verve99?',
      a: 'Verve99 is a strategic platform offering flexible workspace solutions for individuals, teams, and enterprises. We connect you with a wide range of coworking spaces, private offices, managed offices, and more—tailored to your specific needs and budget—across various cities.',
    },
    {
      q: 'What types of workspaces does Verve99 offer?',
      a: 'We offer: Coworking Desks (hot-desks/dedicated desks), Private Offices (fully furnished cabins), Managed Office Solutions (custom enterprise hubs), Meeting Rooms & Event Spaces, Hybrid & Hub-and-Spoke Models.',
    },
    {
      q: 'How do I find and book a workspace on Verve99?',
      a: 'Search by location, team size, budget, and amenities. Once you’ve chosen a space, submit an inquiry directly on our site. A workspace expert will follow up to finalize your booking.',
    },
    {
      q: 'Is Verve99 suitable for individuals, startups, or enterprises?',
      a: 'Yes. Whether you’re a solo freelancer seeking a hot desk, a growing startup needing a private office, or a large enterprise requiring multi‐city deployments, Verve99 has you covered.',
    },
    {
      q: 'What are the benefits of using Verve99?',
      a: 'Verve99 offers: Extensive selection of verified spaces, expert guidance, preferential rates, centralized billing, and the flexibility to scale up or down as your needs change.',
    },
    {
      q: 'Do I have to pay Verve99 for its services?',
      a: 'For most individual and small-to-medium inquiries, our service is free. We earn commissions from our partner providers. For highly customized enterprise solutions, we will disclose any service fees upfront.',
    },
    {
      q: 'Can I visit a workspace before booking?',
      a: 'Absolutely. We encourage you to schedule a site visit. Our team will coordinate a convenient time so you can experience the workspace firsthand.',
    },
    {
      q: 'What amenities can I expect in Verve99 spaces?',
      a: 'Amenities vary by location but typically include high-speed internet, ergonomic furniture, meeting rooms, printing facilities, pantry access, reception services, security, cleaning, and sometimes wellness programs or event spaces.',
    },
    {
      q: 'How long are commitment periods?',
      a: 'We offer flexible terms: daily, weekly, monthly, or custom long-term leases. Managed office solutions can be tailored to your exact lease duration requirements.',
    },
    {
      q: 'What if my team changes size?',
      a: 'Verve99 is built for flexibility. If your team grows, we can find more desks or larger offices. If it shrinks, we’ll help you negotiate reduced space or move to a smaller setup to minimize costs.',
    },
  ];

  // Split into two groups of 5 each
  const leftFAQs = faqs.slice(0, 5);
  const rightFAQs = faqs.slice(5, 10);

  // Which FAQ index (0–9) is currently open? null = none
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-primary-dark mb-2 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-medium-gray mb-12">
          Have questions? Click any question to reveal the answer.
        </p>

        {/* Two‐Column FAQ Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column (indices 0–4) */}
          <div className="space-y-4">
            {leftFAQs.map((item, idx) => {
              const globalIndex = idx; // 0–4
              const isOpen = activeIndex === globalIndex;
              return (
                <div
                  key={globalIndex}
                  className="bg-white border border-medium-gray rounded-lg overflow-hidden"
                >
                  {/* Question Row */}
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
                  >
                    <span className="text-lg font-medium text-primary-dark text-left">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <FiMinus className="text-2xl text-brand-primary" />
                    ) : (
                      <FiPlus className="text-2xl text-brand-primary" />
                    )}
                  </button>

                  {/* Conditionally Rendered Answer */}
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-medium-gray text-sm">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (indices 5–9) */}
          <div className="space-y-4">
            {rightFAQs.map((item, idx) => {
              const globalIndex = idx + 5; // 5–9
              const isOpen = activeIndex === globalIndex;
              return (
                <div
                  key={globalIndex}
                  className="bg-white border border-medium-gray rounded-lg overflow-hidden"
                >
                  {/* Question Row */}
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
                  >
                    <span className="text-lg font-medium text-primary-dark text-left">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <FiMinus className="text-2xl text-brand-primary" />
                    ) : (
                      <FiPlus className="text-2xl text-brand-primary" />
                    )}
                  </button>

                  {/* Conditionally Rendered Answer */}
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-medium-gray text-sm">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-medium-gray my-16" />

        {/* “Get a Quote” Form + Image Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Get a Quote Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-primary-dark mb-6">
              Get a Quote
            </h3>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary-dark mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  className="w-full border border-medium-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary-dark mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full border border-medium-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-primary-dark mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter Phone Number"
                  className="w-full border border-medium-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* City & Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-primary-dark mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    className="w-full border border-medium-gray rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">Select City</option>
                    <option>Gurgaon</option>
                    <option>Delhi</option>
                    <option>Noida</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Hyderabad</option>
                    <option>Ahmedabad</option>
                    <option>Kolkata</option>
                    <option>Indore</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-sm font-medium text-primary-dark mb-1"
                  >
                    Plan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="plan"
                    className="w-full border border-medium-gray rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">Choose your plan</option>
                    <option>Business Address Plan</option>
                    <option>GST Registration Plan</option>
                    <option>Company Registration Plan</option>
                    <option>Day Pass</option>
                    <option>Private Cabin/s</option>
                    <option>Training Room</option>
                    <option>Private Office</option>
                    <option>Virtual Office</option>
                    <option>Event Space</option>
                    <option>Meeting Room/s</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-brand-primary border-medium-gray rounded focus:ring-brand-primary"
                  />
                  <span className="ml-2 text-sm text-primary-dark">
                    I hereby allow Verve99 to contact me via call and email.
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-brand-primary border-medium-gray rounded focus:ring-brand-primary"
                  />
                  <span className="ml-2 text-sm text-primary-dark">
                    I authorize Verve99 to share promotions and marketing‐related mailers via email.
                  </span>
                </label>
              </div>

              {/* Data Privacy Note */}
              <div className="flex items-center bg-primary-light border border-medium-gray rounded-lg p-4 text-sm text-medium-gray">
                <FiInfo className="text-lg text-medium-gray mr-2" />
                <span>Your data is safe with us and won’t be shared with anyone.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Image Container */}
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/quote-side-image.jpg"
              alt="Workspace Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
