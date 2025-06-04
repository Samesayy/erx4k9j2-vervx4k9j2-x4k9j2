// components/SearchBar.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <input
        type="text"
        placeholder="Search for workspace..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 border border-medium-gray rounded-l bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
      <button
        type="submit"
        className="bg-brand-primary text-primary-light px-4 py-2 rounded-r hover:bg-accent transition-colors"
      >
        Search
      </button>
    </form>
  );
}
