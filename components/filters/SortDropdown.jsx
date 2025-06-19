// components/filters/SortDropdown.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

const options = [
  { label: 'Newest First', value: 'created_at|desc' },
  { label: 'Price: Low → High', value: 'price|asc' },
  { label: 'Price: High → Low', value: 'price|desc' },
  { label: 'A → Z (Workspace Name)', value: 'name|asc' },
  { label: 'Z → A (Workspace Name)', value: 'name|desc' }
];

export default function SortDropdown({ sortBy, onChange }) {
  const handleChange = (e) => {
    const [field, dir] = e.target.value.split('|');
    onChange({ field, asc: dir === 'asc' });
  };

  return (
    <div className="relative mt-4 w-48">
      <label className="block text-sm font-medium text-primary-dark mb-1">Sort By</label>
      <div className="relative">
        <select
          value={`${sortBy.field}|${sortBy.asc ? 'asc' : 'desc'}`}
          onChange={handleChange}
          className="block w-full pl-3 pr-8 py-2 bg-white border-2 border-accent rounded-md shadow-sm text-sm focus:outline-none focus:ring-accent focus:border-accent"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-medium-gray pointer-events-none"
        />
      </div>
    </div>
  );
}
