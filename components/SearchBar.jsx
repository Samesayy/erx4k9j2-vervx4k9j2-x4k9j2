// components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Define the options for the dropdowns
const officeTypes = [
    { display: 'All Types', value: '' },
    { display: 'Coworking Spaces', value: 'Coworking Space' },
    { display: 'Serviced Offices', value: 'Serviced Office' },
    { display: 'Virtual Offices', value: 'Virtual Office' },
    { display: 'Meeting Rooms', value: 'Meeting Room' },
];
const cities = ['All Cities', 'Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Bangalore'];

export default function SearchBar() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // This part reads the current filters from the URL and sets the dropdowns' default values
  useEffect(() => {
    if (router.isReady) {
      setSelectedCity(router.query.city || '');
      setSelectedService(router.query.service || '');
    }
  }, [router.isReady, router.query]);

  // This part creates the new URL and navigates to it when you click "Search"
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/listing?service=${selectedService}&city=${selectedCity}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* City Dropdown */}
        <div>
          <label htmlFor="city-filter" className="block text-sm font-medium text-primary-dark">City</label>
          <select
            id="city-filter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
          >
            {cities.map(city => <option key={city} value={city === 'All Cities' ? '' : city}>{city}</option>)}
          </select>
        </div>

        {/* Workspace Type Dropdown */}
        <div>
          <label htmlFor="service-filter" className="block text-sm font-medium text-primary-dark">Workspace Type</label>
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
          >
             {officeTypes.map(type => <option key={type.value} value={type.value}>{type.display}</option>)}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-brand-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-accent transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}