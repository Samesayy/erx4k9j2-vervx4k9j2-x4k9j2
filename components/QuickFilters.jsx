// components/QuickFilters.jsx
import { useState, useEffect } from 'react';

export default function QuickFilters({ onFilterChange }) {
  const [hasParking, setHasParking] = useState(false);
  const [isMetroNearby, setIsMetroNearby] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // When any filter changes, call the onFilterChange prop with the new state
  useEffect(() => {
    onFilterChange({
      parking: hasParking,
      metro: isMetroNearby,
      sort: sortBy,
    });
  }, [hasParking, isMetroNearby, sortBy, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-6 p-4 bg-gray-100 rounded-lg">
      <div className="text-sm font-semibold text-primary-dark">Quick Filters:</div>
      
      {/* --- Filter Toggles --- */}
      <div className="flex gap-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasParking}
            onChange={(e) => setHasParking(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-gray-700">Parking</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isMetroNearby}
            onChange={(e) => setIsMetroNearby(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-gray-700">Metro Nearby</span>
        </label>
      </div>

      {/* --- Sort Dropdown --- */}
      <div className="md:ml-auto">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
        >
          <option value="default">Sort by: Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}