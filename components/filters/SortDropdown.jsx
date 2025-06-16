// components/filters/SortDropdown.jsx
import React from 'react';

export default function SortDropdown({ sortBy, onChange }) {
  const handleChange = (e) => {
    const [field, dir] = e.target.value.split('|');
    onChange({ field, asc: dir === 'asc' });
  };

  return (
    <div className="mt-8">
      <label className="block text-sm font-medium">Sort By</label>
      <select
        value={`${sortBy.field}|${sortBy.asc ? 'asc' : 'desc'}`}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="created_at|desc">Newest First</option>
        <option value="price|asc">Price: Low → High</option>
        <option value="price|desc">Price: High → Low</option>
      </select>
    </div>
  );
}
