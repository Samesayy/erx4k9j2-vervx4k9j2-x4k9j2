// pages/access-request.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSend } from 'react-icons/fi';

export default function AccessRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    requestDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    // Simulate API call
    console.log('Submitting Access Request:', formData);
    setTimeout(() => {
      setMessage('Your request has been submitted successfully. We will get back to you within 30 days.');
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-primary-light flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">Data Access Request</h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
              Please use this form to request access to the personal data Verve99 holds about you. We will respond to your request in accordance with applicable data protection laws.
            </p>
          </div>

          <div className="mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            {message ? (
              <div className="text-center p-6 bg-green-100 text-green-800 rounded-lg">
                <p>{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country of Residence</label>
                  <input type="text" name="country" id="country" required value={formData.country} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                  <label htmlFor="requestDetails" className="block text-sm font-medium text-gray-700">Details of Your Request</label>
                  <textarea name="requestDetails" id="requestDetails" rows="4" required value={formData.requestDetails} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                </div>
                <div className="text-right">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 disabled:bg-gray-400">
                    <FiSend />
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}