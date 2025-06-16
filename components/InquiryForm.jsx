// components/InquiryForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function InquiryForm({ listingId, hostId }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  const onSubmit = async (formData) => {
    if (!user) {
      alert("Please log in to send an inquiry.");
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          guest_id: user.id,
          listing_id: listingId,
          host_id: hostId,
          number_of_seats: formData.seats,
          start_date: formData.startDate,
          guest_message: formData.message,
          status: 'pending_approval',
        });

      if (error) throw error;
      
      setSuccess(true);
      reset();

    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setServerError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold text-primary-dark">Inquiry Sent!</h3>
            <p className="mt-2 text-medium-gray">The property host has been notified. We will contact you shortly to confirm the details.</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg sticky top-28">
      <h3 className="text-2xl font-bold text-primary-dark mb-1">Request a Quote</h3>
      <p className="text-sm text-medium-gray mb-6">Submit an inquiry and our team will get back to you with a custom quote.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="seats" className="block text-sm font-medium text-gray-700">No. of Seats*</label>
            <input 
              type="number" 
              id="seats"
              {...register("seats", { required: true, valueAsNumber: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date*</label>
            <input 
              type="date"
              id="startDate"
              {...register("startDate", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-gray-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
          <textarea 
            id="message" 
            rows="4" 
            {...register("message")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            placeholder="Tell us about your team's specific requirements..."
          />
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}
        
        <div>
          <motion.button 
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-accent focus:outline-none disabled:bg-gray-400"
          >
            <Send size={16} />
            {loading ? 'Sending...' : 'Send Inquiry'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
