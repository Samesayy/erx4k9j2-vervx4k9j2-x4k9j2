// components/AdvancedFilterBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';

const topCitiesIndia = ["Delhi","Gurgaon","Noida","Mumbai","Bangalore","Pune","Hyderabad"];
const allBrands = ['WeWork','Awfis','Regus','CoWrks'];
const parkingOptions = ['Car Parking','Motorcycle Parking'];

const FilterDropdown = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-10 px-4 bg-white border-2 border-accent rounded-md text-sm hover:border-primary-dark transition"
      >
        <span className="truncate">{label}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="absolute top-full w-56 mt-2 bg-white rounded-lg shadow-lg border z-20">{children}</div>}
    </div>
  );
};

export default function AdvancedFilterBar({ filters, onFiltersChange }) {
  const [localFilters, setLocal] = useState(filters);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => setLocal(filters), [filters]);

  const handleChange = (field, value) => {
    const updated = { ...localFilters, [field]: value };
    setLocal(updated);
    onFiltersChange(updated);
  };

  const toggleArray = (field, value) => {
    const arr = localFilters[field] || [];
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    handleChange(field, next);
  };

  return (
    <div className="bg-primary-light p-4 rounded-2xl border-2 border-accent shadow-glass mb-6 sticky top-24 z-10">
      {/* Always-visible filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <select
          value={localFilters.product || ''}
          onChange={e => handleChange('product', e.target.value)}
          className="h-10 px-3 bg-white border-2 border-accent rounded-md text-sm"
        >
          <option value="">All Products</option>
          <option>Coworking Space</option>
          <option>Meeting Room</option>
          <option>Day Pass</option>
          <option>Virtual Office</option>
        </select>

        <div className="relative">
          <MapPin size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-medium-gray" />
          <input
            list="city-list"
            placeholder="City..."
            value={localFilters.city || ''}
            onChange={e => handleChange('city', e.target.value)}
            className="h-10 w-full pl-10 pr-3 bg-white border-2 border-accent rounded-md text-sm"
          />
          <datalist id="city-list">
            {topCitiesIndia.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>

        <div className="relative">
          <MapPin size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-medium-gray" />
          <input
            type="text"
            placeholder="Locality..."
            value={localFilters.location || ''}
            onChange={e => handleChange('location', e.target.value)}
            className="h-10 w-full pl-10 pr-3 bg-white border-2 border-accent rounded-md text-sm"
          />
        </div>

        <FilterDropdown label={localFilters.parking?.length ? `${localFilters.parking.length} Selected` : 'Parking'}>
          <div className="p-3 space-y-2">
            {parkingOptions.map(opt => (
              <label key={opt} className="flex items-center space-x-2 text-sm hover:bg-primary-light p-1 rounded">
                <input
                  type="checkbox"
                  checked={(localFilters.parking || []).includes(opt)}
                  onChange={() => toggleArray('parking', opt)}
                  className="h-4 w-4 text-accent focus:ring-0"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </FilterDropdown>
      </div>

      {/* Collapsible Additional filters */}
      <div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center text-sm text-accent font-medium mb-2"
        >
          <ChevronDown size={16} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          <span className="ml-1">{collapsed ? 'More Filters' : 'Less Filters'}</span>
        </button>

        <div className={`${collapsed ? 'hidden' : 'block'} transition-all duration-300`}>          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <FilterDropdown label={localFilters.brands?.length ? `${localFilters.brands.length} Brands` : 'Brands'}>
              <div className="p-3 space-y-2">
                {allBrands.map(opt => (
                  <label key={opt} className="flex items-center space-x-2 text-sm hover:bg-primary-light p-1 rounded">
                    <input
                      type="checkbox"
                      checked={(localFilters.brands || []).includes(opt)}
                      onChange={() => toggleArray('brands', opt)}
                      className="h-4 w-4 text-accent focus:ring-0"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

            <div>
              <label className="block text-sm text-primary-dark mb-1">Max Price: ₹{localFilters.priceMax || 0}</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={localFilters.priceMax || 0}
                onChange={e => handleChange('priceMax', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-primary-dark mb-1">Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-medium-gray" />
                <input
                  type="date"
                  value={localFilters.date || ''}
                  onChange={e => handleChange('date', e.target.value)}
                  className="h-10 w-full pl-10 pr-3 bg-white border-2 border-accent rounded-md text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.metro || false}
                onChange={e => handleChange('metro', e.target.checked)}
                className="h-4 w-4 text-accent focus:ring-0"
              />
              <span className="text-sm">Near Metro</span>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.verified || false}
                onChange={e => handleChange('verified', e.target.checked)}
                className="h-4 w-4 text-accent focus:ring-0"
              />
              <span className="text-sm">Verve+ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
