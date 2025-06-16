import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// These constants define the options for your filters.
const topCitiesIndia = ["Delhi", "Gurgaon", "Noida", "Mumbai", "Bangalore", "Pune", "Hyderabad"];
const allBrands = ['WeWork', 'Awfis', 'Regus', 'CoWrks'];

// This is a helper component for creating dropdowns with checkboxes.
// It is self-contained and does not need to be in a separate file.
const FilterDropdown = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-10 px-4 text-left border border-gray-300 rounded-md text-sm flex justify-between items-center bg-white hover:border-gray-400"
            >
                <span className="truncate">{label}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-60 bg-white p-4 rounded-lg shadow-2xl border z-20">
                    {children}
                </div>
            )}
        </div>
    );
};

// This is the main component function that was missing in the previous code.
export default function AdvancedFilterBar({ filters, onFiltersChange }) {

    // Handler for the multi-select brand checkboxes
    const handleBrandChange = (brand) => {
        const currentBrands = filters.brands || [];
        const newBrands = currentBrands.includes(brand)
            ? currentBrands.filter(b => b !== brand)
            : [...currentBrands, brand];
        onFiltersChange({ ...filters, brands: newBrands });
    };

    // Generic handler for all other simple filter inputs
    const handleChange = (field, value) => {
        onFiltersChange({ ...filters, [field]: value });
    };

    // The return statement is now correctly placed inside the component function.
    return (
        <div className="bg-white p-3 rounded-lg shadow-md mb-6 border sticky top-20 z-10">
            {/* Main Filters are in a 5-column grid on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                {/* Filter 1: Product */}
                <select
                    value={filters.product}
                    onChange={e => handleChange('product', e.target.value)}
                    className="h-10 w-full px-3 border border-gray-300 rounded-md text-sm"
                >
                    <option value="">All Products</option>
                    <option value="Coworking Space">Coworking Space</option>
                    <option value="Day Pass">Day Pass</option>
                    <option value="Meeting Room">Meeting Room</option>
                    <option value="Training Room">Training Room</option>
                    <option value="Managed Office">Managed Office</option>
                    <option value="Virtual Office">Virtual Office</option>
                </select>

                {/* Filter 2: City */}
                <select
                    value={filters.city}
                    onChange={e => handleChange('city', e.target.value)}
                    className="h-10 w-full px-3 border border-gray-300 rounded-md text-sm"
                >
                    <option value="">All Cities</option>
                    {topCitiesIndia.map(city => <option key={city} value={city}>{city}</option>)}
                </select>

                {/* Filter 3: Location Search */}
                <input
                    type="text"
                    placeholder="Search Locality..."
                    value={filters.location || ''}
                    onChange={e => handleChange('location', e.target.value)}
                    className="h-10 w-full px-3 border border-gray-300 rounded-md text-sm"
                />
                
                {/* Filter 4: Brands */}
                <FilterDropdown label={filters.brands?.length > 0 ? `${filters.brands.length} Brands Selected` : "Select Brands"}>
                    <div className="space-y-2">
                        {allBrands.map(brand => (
                            <label key={brand} className="flex items-center space-x-2 text-sm p-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.brands?.includes(brand) || false}
                                    onChange={() => handleBrandChange(brand)}
                                    className="h-4 w-4 rounded text-brand-primary focus:ring-0"
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </FilterDropdown>

                {/* Filter 5: Parking */}
                <select
                    value={filters.parking}
                    onChange={e => handleChange('parking', e.target.value)}
                    className="h-10 w-full px-3 border border-gray-300 rounded-md text-sm"
                >
                    <option value="">Any Parking</option>
                    <option value="car">Car Parking</option>
                    <option value="bike">Bike Parking</option>
                </select>
            </div>

            {/* Amenity Toggles at the bottom */}
            <div className="mt-4 pt-4 border-t flex items-center gap-6">
                 <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium">
                    <input
                        type="checkbox"
                        checked={filters.metro || false}
                        onChange={e => handleChange('metro', e.target.checked)}
                        className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary focus:ring-opacity-50"
                    />
                    <span>Near Metro</span>
                </label>
                 <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium">
                    <input
                        type="checkbox"
                        checked={filters.verified || false}
                        onChange={e => handleChange('verified', e.target.checked)}
                        className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary focus:ring-opacity-50"
                    />
                    <span>Verve+ Verified</span>
                </label>
            </div>
        </div>
    );
};