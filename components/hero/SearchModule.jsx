// components/hero/SearchModule.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchModule({ initialType }) {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [officeType, setOfficeType] = useState(initialType || '');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to /search with query params: city, q, type
    router.push(
      `/search?city=${encodeURIComponent(city)}&q=${encodeURIComponent(
        query
      )}&type=${encodeURIComponent(officeType)}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center gap-2"
    >
      {/* City Dropdown */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:w-1/4 px-3 py-2 border border-medium-gray bg-primary-light text-primary-dark rounded-l focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        <option value="">Select City</option>
        <option value="Gurgaon">Gurgaon</option>
        <option value="Delhi">Delhi</option>
        <option value="Noida">Noida</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Pune">Pune</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Ahmedabad">Ahmedabad</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Indore">Indore</option>
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search location or coworking space"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-3 py-2 border-t border-b border-medium-gray bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />

      {/* Hidden: keep track of selected office type */}
      <input type="hidden" value={officeType} />

      {/* Show Workspaces Button */}
      <button
        type="submit"
        className="w-full sm:w-auto bg-brand-primary text-primary-light px-4 py-2 rounded-r hover:bg-accent transition-colors"
      >
        Show Workspaces
      </button>
    </form>
  );
}
