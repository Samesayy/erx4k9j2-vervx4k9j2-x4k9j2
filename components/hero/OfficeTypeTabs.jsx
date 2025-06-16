// components/hero/OfficeTypeTabs.jsx
import { useState } from 'react';

// Use an array of objects for clarity
const officeTypes = [
  { display: 'Coworking Spaces', value: 'Coworking Space' },
  { display: 'Serviced Offices', value: 'Serviced Office' },
  { display: 'Virtual Offices', value: 'Virtual Office' },
  { display: 'Meeting Rooms', value: 'Meeting Room' },
  { display: 'Training Rooms', value: 'Training Room' },
  { display: 'Day Office', value: 'Day Office' },
];

export default function OfficeTypeTabs({ onSelect }) {
  const [selectedValue, setSelectedValue] = useState(officeTypes[0].value);

  const handleClick = (type) => {
    setSelectedValue(type.value);
    if (onSelect) onSelect(type.value); // Pass the singular value up
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {officeTypes.map((type) => (
        <button
          key={type.value}
          onClick={() => handleClick(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedValue === type.value
              ? 'bg-brand-primary text-primary-light'
              : 'bg-primary-light text-primary-dark hover:bg-accent'
          }`}
        >
          {type.display} {/* Show the plural display text */}
        </button>
      ))}
    </div>
  );
}