// components/listing/RightSidebar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Award, MessageSquare, CheckCircle, ThumbsUp, 
    Shield, Building, Zap, Handshake 
} from 'lucide-react';

export default function RightSidebar() {
    const [showExpertForm, setShowExpertForm] = useState(false);

    const whyVerve99 = [
        { icon: <ThumbsUp />, title: 'Zero Brokerage Hassle', text: 'Connect directly with property owners—no hidden fees, no middlemen.' },
        { icon: <Shield />, title: 'Verified Workspaces Only', text: 'Every listing is thoroughly verified for quality, safety, and reliability.' },
        { icon: <Building />, title: 'Beyond Just Desks', text: 'Find coworking, warehousing, hill retreats & more—all in one place.' },
        { icon: <Zap />, title: 'Quick Response, Faster Deals', text: 'Enquiries answered within hours—because your time is valuable.' },
        { icon: <Handshake />, title: 'Design, Furnish, Launch', text: 'From interior design to setup, get end-to-end support to start your own coworking space.' },
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert("Inquiry submitted! Our expert will contact you shortly.");
        setShowExpertForm(false);
    }

    return (
        <div className="space-y-6 sticky top-28">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border">
                <Award size={32} className="mx-auto text-accent mb-3"/>
                <h3 className="font-bold text-lg">Get the Best Price at Verve99</h3>
                <p className="text-sm text-gray-500 mt-2">No brokerage fee, priority services, and expert assistance in selection.</p>
                
                <AnimatePresence>
                {!showExpertForm ? (
                     <motion.button 
                        key="button"
                        onClick={() => setShowExpertForm(true)} 
                        className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MessageSquare size={16} /> Talk to an Expert
                    </motion.button>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 text-left"
                    >
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <div>
                                <label htmlFor="expert_name" className="text-xs font-semibold text-gray-600">Name</label>
                                <input type="text" id="expert_name" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/>
                            </div>
                             <div>
                                <label htmlFor="expert_phone" className="text-xs font-semibold text-gray-600">Phone</label>
                                <input type="tel" id="expert_phone" required className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/>
                            </div>
                            <div className="flex gap-2 pt-2">
                               <button type="button" onClick={() => setShowExpertForm(false)} className="w-1/3 text-xs text-gray-600 hover:underline">Cancel</button>
                               <button type="submit" className="w-2/3 bg-accent text-primary-dark font-semibold py-2 rounded-md text-sm">Submit</button>
                            </div>
                        </form>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                {whyVerve99.map(item => (
                    <div key={item.title} className="flex items-start mb-4 last:mb-0">
                        <div className="p-2 bg-brand-primary/10 rounded-full mr-4 text-brand-primary">{React.cloneElement(item.icon, {size: 20})}</div>
                        <div>
                            <h4 className="font-semibold text-primary-dark">{item.title}</h4>
                            <p className="text-xs text-gray-600">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
