// components/QuoteForm.jsx

import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    plan: '',
    agreeContact: false,
    agreeMarketing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up actual submission (e.g., Supabase, API call)
    console.log('Quote form submitted:', form);
  };

  return (
    // **CHANGED:** Removed "p-8 lg:p-12" from here.
    // The padding will be handled by the parent FAQWithForm's overall section padding.
    // You'll retain the internal spacing provided by "space-y-6" and "mb-6" on the h3.
    <div className="bg-white rounded-2xl shadow-xl"> {/* Removed padding here */}
      <h3 className="text-2xl font-semibold text-primary-dark mb-6 pt-8 lg:pt-12 px-8 lg:px-12"> {/* Re-added specific padding for the content inside */}
        Get a Quote
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 px-8 lg:px-12 pb-8 lg:pb-12"> {/* Added horizontal and bottom padding to form */}
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

        {/* City & Plan (two‐column on md+, stacked on mobile) */}
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
            <label htmlFor="agreeContact" className="ml-3 text-primary-dark">
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
            <label htmlFor="agreeMarketing" className="ml-3 text-primary-dark">
              I authorize Verve99 to share promotions and marketing-
              related mailers via email.
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
  );
}