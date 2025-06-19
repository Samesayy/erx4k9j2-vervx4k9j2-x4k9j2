// components/listing/RightSidebar.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, MessageSquare, CheckCircle, ThumbsUp, ShieldCheck, Building, Zap, Handshake } from 'lucide-react';

const perks = [
  { icon: <ThumbsUp size={20} className="text-brand-primary" />, title: 'Zero Brokerage', desc: 'Connect directly—no hidden fees.' },
  { icon: <ShieldCheck size={20} className="text-brand-primary" />, title: 'Verified Listings', desc: 'All spaces are quality checked.' },
  { icon: <Zap size={20} className="text-brand-primary" />, title: 'Quick Responses', desc: 'Enquiries answered within hours.' },
  { icon: <Building size={20} className="text-brand-primary" />, title: 'Diverse Spaces', desc: 'Coworking, retreats, offices & more.' },
  { icon: <Handshake size={20} className="text-brand-primary" />, title: 'End-to-End Support', desc: 'From design to move-in.' }
];

export default function RightSidebar({ onEnquirySubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnquirySubmit(formData);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Enquiry Card */}
      <motion.div
        className="bg-primary-light p-6 rounded-2xl shadow-glass text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Award size={32} className="mx-auto mb-3 text-accent" />
        <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
        <p className="text-sm text-medium-gray mb-4">Our experts are here to guide you.</p>

        <AnimatePresence>
          {!showForm ? (
            <motion.button
              onClick={() => setShowForm(true)}
              className="w-full py-2 bg-brand-primary text-white rounded-md font-semibold hover:bg-accent transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Talk to an Expert
            </motion.button>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3 text-left"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <label className="text-sm">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-medium-gray rounded-md text-sm"
              />
              <label className="text-sm">Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-medium-gray rounded-md text-sm"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 text-sm text-medium-gray hover:underline">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-accent text-primary-dark rounded-md font-semibold text-sm hover:bg-accent/90 transition">
                  Submit
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Perks List */}
      <div className="bg-white p-6 rounded-2xl shadow-glass">
        {perks.map((p, i) => (
          <div key={i} className="flex items-start space-x-3 mb-4 last:mb-0">
            <div className="p-2 bg-accent/10 rounded-full">{p.icon}</div>
            <div>
              <h4 className="font-semibold text-primary-dark">{p.title}</h4>
              <p className="text-sm text-medium-gray">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}