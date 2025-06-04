// components/hero/OfficeTypeTabs.jsx
import { useState } from 'react';

export default function OfficeTypeTabs({ onSelect }) {
  const tabs = [
    'Coworking Spaces',
    'Serviced Offices',
    'Virtual Offices',
    'Meeting Rooms',
    'Training Rooms',
    'Day Office',
  ];
  const [selected, setSelected] = useState(tabs[0]);

  const handleClick = (tab) => {
    setSelected(tab);
    if (onSelect) onSelect(tab);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === tab
              ? 'bg-brand-primary text-primary-light'
              : 'bg-primary-light text-primary-dark hover:bg-accent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
