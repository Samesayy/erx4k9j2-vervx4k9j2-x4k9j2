import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ExpertModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend or CRM
        alert(`Thank you, ${name}! Our expert will call you back at ${phone}.`);
        onClose(); // Close the modal after submission
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="bg-white rounded-lg shadow-2xl w-full max-w-md relative"
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800">
                            <X size={24} />
                        </button>
                        
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-bold text-primary-dark">Need Help Finding a Space?</h3>
                            <p className="text-gray-600 mt-2">Leave your details and our workspace experts will get in touch with you shortly.</p>
                            
                            <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
                                <div>
                                    <label htmlFor="expert_name" className="text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="expert_name" value={name} onChange={e => setName(e.target.value)} required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/>
                                </div>
                                 <div>
                                    <label htmlFor="expert_phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="expert_phone" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/>
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="w-full bg-brand-primary text-white font-semibold py-3 rounded-md text-sm hover:bg-opacity-90">Request a Callback</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}