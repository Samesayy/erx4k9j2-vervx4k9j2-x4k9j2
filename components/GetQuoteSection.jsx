// components/GetQuoteSection.jsx

import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

/**
 * GetQuoteSection
 *
 * Renders a two‐column layout:
 * - Left side: placeholder (could be an illustration or marketing text).
 * - Right side: “Get a Quote” form with the fields and dropdowns requested.
 *
 * The form uses:
 *  • Cities: Gurgaon, Delhi, Noida, Mumbai, Pune, Bangalore, Chennai, Hyderabad, Ahmedabad, Kolkata, Indore
 *  • Plans: Business Address Plan, GST Registration Plan, Company Registration Plan, Day Pass, Private Cabin/s,
 *           Training Room, Private Office, Virtual Office, Event Space, Meeting Room/s
 *
 * All styling honors the Strategic Horizon palette:
 *  • bg-primary-light (#ECF0F1) as section background
 *  • text-primary-dark (#2C3E50) for headings
 *  • text-medium-gray (#95A5A6) for secondary text
 *  • bg-white (inputs/cards) with subtle shadows
 *  • accent (#E6B980) used for input “fill” and checkbox accent
 *  • brand-primary (#3498DB) is used on buttons and focus states
 *
 * This component is mobile/tablet/desktop responsive and can be used elsewhere in the project.
 */

export default function GetQuoteSection() {
  // Simple state to capture form values (could be extended later)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    plan: '',
    agreeContact: false,
    agreeMarketing: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submit (for now, just prevent default)
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook up to your submission logic (e.g., API call, Supabase, etc.)
    console.log('Form submitted:', form);
  };

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:space-x-12">
        {/* ───────────── Left Column (Illustration / Promo) ───────────── */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 flex items-center justify-center">
          {/* Replace this div with any image or promotional copy */}
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-accent/30 to-brand-primary/20 flex items-center justify-center">
            <span className="text-primary-dark font-semibold text-2xl text-center">
              {/* Placeholder text for left column */}
              Elevate Your Brand with Verve99’s<br />
              Virtual & Hybrid Office Plans
            </span>
          </div>
        </div>

        {/* ───────────── Right Column (Form) ───────────── */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-primary-dark mb-6">
              Get a Quote
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-primary-dark font-medium mb-1"
                >
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter Name"
                  className="
                    w-full px-4 py-3 
                    bg-accent/10 
                    border border-accent/50 
                    rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-brand-primary 
                    text-primary-dark
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-primary-dark font-medium mb-1"
                >
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter User Email Id"
                  className="
                    w-full px-4 py-3 
                    bg-accent/10 
                    border border-accent/50 
                    rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-brand-primary 
                    text-primary-dark
                  "
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-primary-dark font-medium mb-1"
                >
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter Phone Number"
                  className="
                    w-full px-4 py-3 
                    bg-accent/10 
                    border border-accent/50 
                    rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-brand-primary 
                    text-primary-dark
                  "
                />
              </div>

              {/* City & Plan (Side by side on md+, stacked on mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-primary-dark font-medium mb-1"
                  >
                    City <span className="text-accent">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 
                      bg-accent/10 
                      border border-accent/50 
                      rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-brand-primary 
                      text-primary-dark
                    "
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Indore">Indore</option>
                  </select>
                </div>

                {/* Plan */}
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-primary-dark font-medium mb-1"
                  >
                    Plan <span className="text-accent">*</span>
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={form.plan}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 
                      bg-accent/10 
                      border border-accent/50 
                      rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-brand-primary 
                      text-primary-dark
                    "
                  >
                    <option value="" disabled>
                      Choose your plan
                    </option>
                    <option value="Business Address Plan">
                      Business Address Plan
                    </option>
                    <option value="GST Registration Plan">
                      GST Registration Plan
                    </option>
                    <option value="Company Registration Plan">
                      Company Registration Plan
                    </option>
                    <option value="Day Pass">Day Pass</option>
                    <option value="Private Cabin/s">Private Cabin/s</option>
                    <option value="Training Room">Training Room</option>
                    <option value="Private Office">Private Office</option>
                    <option value="Virtual Office">Virtual Office</option>
                    <option value="Event Space">Event Space</option>
                    <option value="Meeting Room/s">Meeting Room/s</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeContact"
                    name="agreeContact"
                    checked={form.agreeContact}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="agreeContact"
                    className="ml-3 text-primary-dark"
                  >
                    I hereby allow Verve99 to contact me via call and email.
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    name="agreeMarketing"
                    checked={form.agreeMarketing}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="agreeMarketing"
                    className="ml-3 text-primary-dark"
                  >
                    I authorize Verve99 to share promotions and marketing‐related
                    mailers via email.
                  </label>
                </div>
              </div>

              {/* Data Safety Notice */}
              <div className="mt-4 flex items-start bg-accent/10 border border-accent/40 rounded-lg px-4 py-3">
                <FiInfo className="text-accent h-6 w-6 shrink-0 mr-3" />
                <span className="text-medium-gray text-sm">
                  Your data is safe with us and won’t be shared with anyone.
                </span>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="
                    w-full px-6 py-3 
                    bg-brand-primary 
                    text-white 
                    font-semibold 
                    rounded-lg 
                    shadow-md 
                    hover:bg-brand-primary/90 
                    transition
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
