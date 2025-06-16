// components/partner/LeadForm.jsx
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div id="lead-form" className="text-center py-20 px-4">
        <h3 className="text-3xl font-bold text-white">Thank You!</h3>
        <p className="mt-4 text-lg text-medium-gray">Your inquiry has been received. Our partnership team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <section id="lead-form" className="max-w-3xl mx-auto px-4 pb-24">
      <h2 className="text-4xl font-extrabold text-white text-center mb-10">Ready to Get Started?</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input type="text" name="name" id="name" required className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input type="email" name="email" id="email" required className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
              <input type="tel" name="phone" id="phone" required className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
            </div>
             <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-400 mb-1">Approx. Size (sq. ft)</label>
              <input type="text" name="size" id="size" className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">Property Address</label>
            <input type="text" name="address" id="address" required className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-400 mb-1">Desired Budget & Timeline</label>
            <textarea name="timeline" id="timeline" rows="3" className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white focus:ring-brand-primary focus:border-brand-primary"></textarea>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-bold text-brand-primary border-2 border-brand-primary rounded-lg transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-[0_0_20px_rgba(52,152,219,0.7)] disabled:opacity-50">
                <FiSend />
                {submitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}