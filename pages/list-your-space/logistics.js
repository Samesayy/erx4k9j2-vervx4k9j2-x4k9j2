import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiTrash2, FiSend, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const AccordionSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-t border-gray-200 py-6">
      <button type="button" onClick={onToggle} className="w-full flex justify-between items-center text-left text-xl font-bold text-primary-dark">
        <span>{title}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '24px' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ListLogisticsPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '', city: '', address: '', totalSqFt: '', pricePerSqFt: '', images: [],
    // Optional fields
    floorLoadCapacity: '', ceilingHeight: '', palletPositions: '', rackingType: 'selective',
    tempControl: 'ambient', dockLevelers: 'no', railSiding: 'no', distanceToHighway: '',
    valueAddedServices: [],
  });
  
  const [openSection, setOpenSection] = useState('specifications');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ... other handlers like handleFiles, handleRemoveImage ...
  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const imageObjects = imageFiles.map(file => ({ file, previewUrl: URL.createObjectURL(file) }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageObjects] }));
  };
  const handleRemoveImage = (indexToRemove) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove)}));


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        alert("You must be logged in to list a space.");
        return;
    }
    setSubmitting(true);
    
    try {
        // Step 1: Upload images
        const imageUrls = await Promise.all(
            formData.images.map(async (image) => {
                const filePath = `listings/${user.id}/${Date.now()}-${image.file.name}`;
                const { data, error } = await supabase.storage.from('listings').upload(filePath, image.file);
                if (error) throw error;
                const { data: { publicUrl } } = supabase.storage.from('listings').getPublicUrl(data.path);
                return publicUrl;
            })
        );

        // Step 2: Insert into 'listings' table
        const { data: newListing, error: listingError } = await supabase
            .from('listings')
            .insert({
                host_id: user.id,
                title: formData.title,
                address: formData.address,
                images: imageUrls,
                category: 'logistics', // <-- Set the correct category
                // Find city_id based on name, or handle this differently
                // city_id: findCityId(formData.city), 
            })
            .select()
            .single();
        
        if (listingError) throw listingError;

        // Step 3: Insert into 'logistics_details' table
        const { error: logisticsError } = await supabase
            .from('logistics_details')
            .insert({
                listing_id: newListing.id,
                total_sq_ft: formData.totalSqFt,
                ceiling_height_meters: formData.ceilingHeight || null,
                has_loading_dock: formData.dockLevelers === 'yes',
            });
        
        if (logisticsError) throw logisticsError;
        
        setSubmitted(true);

    } catch (error) {
        console.error("Submission failed:", error.message);
        alert(`Error: ${error.message}`);
    } finally {
        setSubmitting(false);
    }
  };
  
  const inputStyle = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary";

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>List Your Warehouse or Storage | Verve99</title>
      </Head>
      <Navbar />

      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">List Your Warehouse & Storage Facility</h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">Provide the details of your facility to connect with businesses looking for logistics solutions.</p>
          </div>

          {submitted ? (
             <div className="text-center p-10 bg-white text-green-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Submission Received!</h3>
                <p className="mt-2">Thank you. Your listing has been submitted for review.</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                {/* All form field sections go here as before... */}
                <fieldset className="space-y-6 mb-6">
                    <legend className="text-xl font-bold text-primary-dark border-b pb-2 w-full">Basic Information</legend>
                    {/* ... Name, City, Address ... */}
                </fieldset>
                <div className="divide-y divide-gray-200">
                    <AccordionSection title="Facility Specifications" isOpen={openSection === 'specifications'} onToggle={() => handleToggle('specifications')}>
                        {/* ... All specification inputs ... */}
                    </AccordionSection>
                    {/* ... Other Accordion Sections ... */}
                </div>
                <div className="text-right pt-8 mt-4 border-t">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white ...">
                    {submitting ? 'Submitting...' : 'Submit Listing'}
                  </button>
                </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
