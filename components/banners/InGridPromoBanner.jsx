import React from 'react';
import { MessageSquare } from 'lucide-react';

// This banner is designed to have the same aspect ratio as a grid card.
export default function InGridPromoBanner({ onExpertClick }) {
    return (
        <div className="rounded-lg shadow-sm bg-gradient-to-br from-primary-dark to-gray-800 text-white p-6 flex flex-col items-center justify-center text-center h-full">
            <MessageSquare size={36} className="mb-3" />
            <h3 className="font-bold text-lg">Still Looking?</h3>
            <p className="text-sm text-gray-200 mt-2">
                Let our experts find the perfect workspace for your team, free of charge.
            </p>
            <button
                onClick={onExpertClick}
                className="mt-4 w-full px-6 py-2 bg-accent text-primary-dark font-semibold rounded-md hover:bg-opacity-90 transition-transform hover:scale-105 text-sm"
            >
                Talk to an Expert
            </button>
        </div>
    );
}