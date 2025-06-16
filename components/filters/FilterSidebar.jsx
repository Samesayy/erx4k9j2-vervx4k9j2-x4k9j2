import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function FilterSidebar({ filters, onChange }) {
    const [cities, setCities] = useState([]);
    const supabase = useSupabaseClient();

    // Fetch all available cities when the component loads
    useEffect(() => {
        const fetchCities = async () => {
            const { data, error } = await supabase.from('cities').select('name').order('name');
            if (data) {
                setCities(data);
            }
        };
        fetchCities();
    }, [supabase]);

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        onChange({ ...filters, [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* City Filter - NOW A DROPDOWN! */}
            <div>
                <label className="block text-sm font-medium">City</label>
                <select
                    value={filters.city}
                    onChange={handleChange('city')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                >
                    {/* Default option */}
                    <option value="">All Cities</option>
                    {/* Populate with cities from your database */}
                    {cities.map(city => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>

            {/* Product Type */}
            <div>
                <label className="block text-sm font-medium">Product</label>
                <select
                    value={filters.product}
                    onChange={handleChange('product')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                >
                    <option value="">All Products</option>
                    <option value="Coworking Space">Coworking Space</option>
                    <option value="Private Office">Private Office</option>
                    <option value="Meeting Room">Meeting Room</option>
                </select>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium">Max Price (₹)</label>
                <input
                    type="range"
                    min="0"
                    max="100000" // Increased max price range
                    step="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                        onChange({ ...filters, priceRange: [0, Number(e.target.value)] })
                    }
                    className="w-full"
                />
                <div className="mt-1 text-sm text-gray-600">
                    Up to ₹{filters.priceRange[1].toLocaleString()}
                </div>
            </div>
        </div>
    );
}