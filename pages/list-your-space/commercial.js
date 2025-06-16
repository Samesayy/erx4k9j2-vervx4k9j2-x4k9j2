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

export default function ListCommercialPage() {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: 'office',
    city: '',
    address: '',
    totalAreaSqFt: '',
    fitOutStatus: 'bare_shell',
    leaseTermYears: '',
    monthlyRentPerSqFt: '',
    securityDepositMonths: '',
    images: [],
    floorPlan: null,
    description: '',
  });

  const [openSection, setOpenSection] = useState('details');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleToggle = (section) => setOpenSection(openSection === section ? null : section);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    console.log("Submitting Commercial Property Listing:", formData);
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 1500);
  };
  
  const inputStyle = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary";

  return (
    <div className="bg-primary-light min-h-screen">
      <Head>
        <title>List Your Commercial Property | Verve99</title>
      </Head>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">List Your Commercial Property</h1>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">Reach a wide audience of established businesses looking for long-term office and retail spaces.</p>
          </div>

          {submitted ? (
             <div className="text-center p-10 bg-white text-green-800 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">Submission Received!</h3>
                <p className="mt-2">Thank you. Your commercial property has been submitted for review.</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                <fieldset className="space-y-6 mb-6">
                    <legend className="text-xl font-bold text-primary-dark border-b pb-2 w-full">Property Details</legend>
                    <div><label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name*</label><input type="text" name="propertyName" id="propertyName" required value={formData.propertyName} onChange={handleChange} className={inputStyle} /></div>
                    <div><label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label><select name="propertyType" id="propertyType" value={formData.propertyType} onChange={handleChange} className={inputStyle}><option value="office">Office Space</option><option value="retail">Retail Showroom</option><option value="industrial">Industrial Unit</option></select></div>
                    <div><label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label><input type="text" name="city" id="city" required value={formData.city} onChange={handleChange} className={inputStyle} /></div>
                    <div><label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address*</label><input type="text" name="address" id="address" required value={formData.address} onChange={handleChange} className={inputStyle} /></div>
                </fieldset>

                <div className="divide-y divide-gray-200">
                    <AccordionSection title="Space & Lease Terms" isOpen={openSection === 'terms'} onToggle={() => handleToggle('terms')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="totalAreaSqFt" className="block text-sm font-medium text-gray-700">Total Area (sq. ft)*</label><input type="number" name="totalAreaSqFt" id="totalAreaSqFt" required value={formData.totalAreaSqFt} onChange={handleChange} className={inputStyle} /></div>
                            <div><label htmlFor="monthlyRentPerSqFt" className="block text-sm font-medium text-gray-700">Monthly Rent per sq. ft. (₹)*</label><input type="number" name="monthlyRentPerSqFt" id="monthlyRentPerSqFt" required value={formData.monthlyRentPerSqFt} onChange={handleChange} className={inputStyle} /></div>
                            <div><label htmlFor="leaseTermYears" className="block text-sm font-medium text-gray-700">Min. Lease Term (Years)*</label><input type="number" name="leaseTermYears" id="leaseTermYears" required value={formData.leaseTermYears} onChange={handleChange} className={inputStyle} /></div>
                            <div><label htmlFor="securityDepositMonths" className="block text-sm font-medium text-gray-700">Security Deposit (No. of Months) <span className="text-gray-400">(Optional)</span></label><input type="number" name="securityDepositMonths" id="securityDepositMonths" value={formData.securityDepositMonths} onChange={handleChange} className={inputStyle} /></div>
                            <div className="md:col-span-2"><label htmlFor="fitOutStatus" className="block text-sm font-medium text-gray-700">Fit-Out Status</label><select name="fitOutStatus" id="fitOutStatus" value={formData.fitOutStatus} onChange={handleChange} className={inputStyle}><option value="bare_shell">Bare Shell</option><option value="warm_shell">Warm Shell</option><option value="fully_furnished">Fully Furnished</option></select></div>
                        </div>
                    </AccordionSection>

                    <AccordionSection title="Description & Media" isOpen={openSection === 'media'} onToggle={() => handleToggle('media')}>
                         <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description <span className="text-gray-400">(Optional)</span></label><textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} className={inputStyle} placeholder="Highlight key features, building amenities, nearby landmarks, etc."></textarea></div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Photos* (Min. 3)</label>
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
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image"><FiTrash2 size={20} /></button>
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
