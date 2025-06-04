// pages/listing/[id].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchListing = async () => {
      let { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setListing(data);
    };
    fetchListing();
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: id, name, email, message }),
    });
    setSuccess(true);
  };

  if (!listing) return <p className="p-4 text-medium-gray">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-primary-light py-8">
        <div className="max-w-3xl mx-auto px-4 bg-primary-light rounded shadow">
          <img
            src={listing.image_url}
            alt={listing.title}
            className="w-full h-64 object-cover rounded-t"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary-dark mb-2">
              {listing.title}
            </h1>
            <p className="text-medium-gray mb-4">{listing.city}</p>
            <p className="text-primary-dark mb-4">{listing.description}</p>
            <h2 className="text-xl font-semibold text-brand-primary mb-2">
              Price: ${listing.price_per_day}/day
            </h2>
            <hr className="my-4 border-medium-gray" />
            <h2 className="text-2xl font-semibold text-primary-dark mb-2">
              Inquire / Generate Lead
            </h2>
            {success ? (
              <p className="text-brand-primary">Your inquiry has been submitted!</p>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <label className="block text-primary-dark">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-medium-gray rounded bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-primary-dark">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-medium-gray rounded bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-primary-dark">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-medium-gray rounded bg-primary-light text-primary-dark h-24 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-primary text-primary-light px-4 py-2 rounded hover:bg-accent transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
