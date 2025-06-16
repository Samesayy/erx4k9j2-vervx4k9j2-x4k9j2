import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiTrash2, FiSend, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';

// --- Accordion Component for Form Sections ---
const AccordionSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-t border-gray-200 py-6">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left text-xl font-bold text-primary-dark"
      >
        <span>{title}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '24px' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ListHillStationPage() {
  const [formData, setFormData] = useState({
    workspaceName: '',
    shortTagline: '',
    detailedDescription: '',
    fullAddress: '',
    nearestLandmark: '',
    howToReach: '',
    maxSeats: '',
    privateRoomsCount: '',
    openDeskAreasCount: '',
    hourlyRate: '',
    dailyRate: '',
    minBookingDuration: '',
    images: [],
    altitude: '',
    avgTemp: '',
    seasonalNotes: '',
    amenities: [],
    tech: [],
    outdoorSpaces: [],
    cancellationPolicy: '',
    securityDeposit: '',
    virtualTourUrl: '',
    videoUrl: '',
  });
  
  const [openSection, setOpenSection] = useState('identity');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleToggle = (section) => setOpenSection(openSection === section ? null : section);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentItems = prev[field] || [];
      const newItems = checked ? [...currentItems, value] : currentItems.filter(item => item !== value);
      return { ...prev, [field]: newItems };
    });
  };
  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const imageObjects = imageFiles.map(file => ({ file, previewUrl: URL.createObjectURL(file) }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageObjects] }));
  };
  const handleFileChange = (e) => { if (e.target.files) handleFiles(e.target.files); };
  const handleRemoveImage = (indexToRemove) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove)}));
  
  const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);};
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Submitting Hill Station Workspace:", formData);
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 1500);
  };
  
  const inputStyle = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
  const checkboxGridStyle = "grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6";

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>List Your Hill Station Workspace | Verve99</title>
        <meta name="description" content="Attract remote workers, artists, and teams looking for an inspiring retreat to work and create." />
      </Head>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">List Your Scenic Workspace</h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">Attract remote workers, artists, and teams looking for an inspiring retreat to work and create.</p>
          </div>

          {submitted ? (
             <div className="text-center p-10 bg-white text-green-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Submission Received!</h3>
                <p className="mt-2">Thank you. Your inspiring workspace has been submitted for review.</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                <fieldset className="space-y-6 mb-6">
                    <legend className="text-xl font-bold text-primary-dark border-b pb-2 w-full">Space Identity</legend>
                    <div><label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700">Workspace Name*</label><input type="text" name="workspaceName" id="workspaceName" required value={formData.workspaceName} onChange={handleChange} className={inputStyle} /></div>
                    <div><label htmlFor="shortTagline" className="block text-sm font-medium text-gray-700">Short Tagline*</label><input type="text" name="shortTagline" id="shortTagline" required value={formData.shortTagline} onChange={handleChange} className={inputStyle} placeholder="e.g., Cozy lakeside co-working at 7,000 ft" /></div>
                </fieldset>

                <div className="divide-y divide-gray-200">
                    <AccordionSection title="Location & Access" isOpen={openSection === 'location'} onToggle={() => handleToggle('location')}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2"><label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Full Address*</label><input type="text" name="fullAddress" id="fullAddress" required value={formData.fullAddress} onChange={handleChange} className={inputStyle} /></div>
                            <div><label htmlFor="nearestLandmark" className="block text-sm font-medium text-gray-700">Nearest Landmark*</label><input type="text" name="nearestLandmark" id="nearestLandmark" required value={formData.nearestLandmark} onChange={handleChange} className={inputStyle} /></div>
                            <div><label htmlFor="howToReach" className="block text-sm font-medium text-gray-700">How to Reach*</label><input type="text" name="howToReach" id="howToReach" required value={formData.howToReach} onChange={handleChange} className={inputStyle} /></div>
                        </div>
                    </AccordionSection>

                    <AccordionSection title="Capacity & Pricing" isOpen={openSection === 'capacity'} onToggle={() => handleToggle('capacity')}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div><label htmlFor="maxSeats" className="block text-sm font-medium text-gray-700">Max. Seats*</label><input type="number" name="maxSeats" id="maxSeats" required value={formData.maxSeats} onChange={handleChange} className={inputStyle} /></div>
                             <div><label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700">Daily Rate (₹/day)*</label><input type="number" name="dailyRate" id="dailyRate" required value={formData.dailyRate} onChange={handleChange} className={inputStyle} /></div>
                             <div><label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate (₹/hr) <span className="text-gray-400">(Optional)</span></label><input type="number" name="hourlyRate" id="hourlyRate" value={formData.hourlyRate} onChange={handleChange} className={inputStyle} /></div>
                             <div><label htmlFor="minBookingDuration" className="block text-sm font-medium text-gray-700">Min. Booking Duration (hours)*</label><input type="number" name="minBookingDuration" id="minBookingDuration" required value={formData.minBookingDuration} onChange={handleChange} className={inputStyle} /></div>
                         </div>
                    </AccordionSection>
                    
                    <AccordionSection title="Facilities & Amenities" isOpen={openSection === 'amenities'} onToggle={() => handleToggle('amenities')}>
                         <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Select available amenities:</label>
                             <div className={checkboxGridStyle}>{['High-Speed Internet', 'Power Backup', 'Café / Pantry', 'Free Tea/Coffee', 'Lockers', 'Projector & Screen', 'Conference Call Setup', 'On-site Parking', 'Terrace / Balcony Access', 'Meditation / Yoga Room'].map(item => (<label key={item} className="flex items-center space-x-3"><input type="checkbox" value={item} checked={formData.amenities.includes(item)} onChange={(e) => handleCheckboxChange(e, 'amenities')} className="h-4 w-4 text-brand-primary rounded" /><span>{item}</span></label>))}</div>
                         </div>
                    </AccordionSection>

                    <AccordionSection title="Media & Visuals" isOpen={openSection === 'media'} onToggle={() => handleToggle('media')}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Photos* (Min. 5)</label>
                            <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${dragActive ? 'border-brand-primary bg-blue-50' : 'border-gray-300 hover:border-brand-primary'}`} onClick={() => document.getElementById('file-upload').click()}>
                                <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop</p>
                                <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                            </div>
                             {formData.images.length > 0 && (
                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {formData.images.map((image, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden border aspect-square">
                                        <Image src={image.previewUrl} alt={`Preview ${index + 1}`} fill sizes="200px" className="object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100" aria-label="Remove image"><FiTrash2 size={20} /></button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </AccordionSection>
                </div>

                <div className="text-right pt-8 mt-4 border-t">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 disabled:bg-gray-400">
                    <FiSend />
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
