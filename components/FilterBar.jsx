// components/FilterBar.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

// Main FilterBar component that accepts filter state and update functions as props
export default function FilterBar({ filters, setFilters }) {
  
  const handleVerticalChange = (e) => {
    const newVertical = e.target.value;
    // When vertical changes, reset specific filters but keep location
    setFilters({
      vertical: newVertical,
      location: filters.location,
      // Reset all other filters to their defaults
      amenities: [],
      minSqFt: '',
      minCapacity: '', // Reset new event filter
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleAmenityChange = (amenity) => {
    setFilters(prev => {
        const newAmenities = prev.amenities.includes(amenity)
            ? prev.amenities.filter(a => a !== amenity)
            : [...prev.amenities, amenity];
        return { ...prev, amenities: newAmenities };
    });
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        {/* Master Vertical Selector */}
        <div>
          <label className="text-xs font-semibold text-gray-500">I'm looking for...</label>
          <select 
            value={filters.vertical} 
            onChange={handleVerticalChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="workspace">Workspaces</option>
            <option value="warehousing">Warehousing</option>
            <option value="event_space">Event Spaces</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="text-xs font-semibold text-gray-500">In Location</label>
          <input 
            type="text" 
            name="location"
            placeholder="e.g., Delhi" 
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
         {/* More Filters button could go here */}
         <div className="text-right">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-primary">
                <SlidersHorizontal size={16} />
                More Filters
            </button>
         </div>
      </div>

      {/* --- Context-Aware Filters --- */}
      <AnimatePresence mode="wait">
        <motion.div 
            key={filters.vertical} // This key triggers the animation when the vertical changes
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pt-4 mt-4 border-t border-gray-200"
        >
          {filters.vertical === 'workspace' && (
            <div>
                <h4 className="text-sm font-semibold mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {['Parking', '24/7 Access', 'Cafe'].map(amenity => (
                        <label key={amenity} className="flex items-center text-sm space-x-2">
                            <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={() => handleAmenityChange(amenity)} className="rounded text-brand-primary focus:ring-brand-primary"/>
                            <span>{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>
          )}

          {filters.vertical === 'warehousing' && (
            <div>
                 <h4 className="text-sm font-semibold mb-2">Warehouse Filters</h4>
                 <input 
                    type="number"
                    name="minSqFt"
                    placeholder="Min. Square Feet" 
                    value={filters.minSqFt}
                    onChange={handleFilterChange}
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-brand-primary"
                 />
            </div>
          )}

           {filters.vertical === 'event_space' && (
            <div className="space-y-3">
                 <h4 className="text-sm font-semibold">Event Space Filters</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="number" 
                        name="minCapacity"
                        placeholder="Min. Guest Capacity" 
                        value={filters.minCapacity}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-primary"
                    />
                     <div className="flex items-center gap-4">
                         <label className="flex items-center text-sm space-x-2">
                            <input type="checkbox" name="avEquipment" checked={filters.avEquipment || false} onChange={handleFilterChange} className="rounded text-brand-primary focus:ring-brand-primary"/>
                            <span>A/V Equipment</span>
                        </label>
                     </div>
                 </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
