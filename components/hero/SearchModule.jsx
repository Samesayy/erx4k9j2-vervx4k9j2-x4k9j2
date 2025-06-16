// components/hero/SearchModule.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchModule({ officeType }) {
  const router = useRouter();
  // Set a default city so the field isn't empty
  const [city, setCity] = useState('Gurgaon'); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
        alert('Please select a city.');
        return;
    }
    // The 'officeType' is the clean, singular value from the tabs.
    // We navigate to the /listing page with the correct parameters.
    router.push(
      `/listing?service=${encodeURIComponent(officeType)}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-lg border border-medium-gray"
    >
      {/* City Dropdown */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:w-1/3 px-3 py-3 border-none bg-transparent focus:outline-none focus:ring-0"
      >
        <option value="" disabled>Select City</option>
        <option value="Gurgaon">Gurgaon</option>
        <option value="Delhi">Delhi</option>
        <option value="Noida">Noida</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Pune">Pune</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full sm:w-auto flex-grow bg-brand-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-accent transition-colors"
      >
        Search
      </button>
    </form>
  );
}