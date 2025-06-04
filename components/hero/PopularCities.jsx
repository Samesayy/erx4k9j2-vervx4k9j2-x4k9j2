// components/hero/PopularCities.jsx
import { useRouter } from 'next/router';

export default function PopularCities() {
  const router = useRouter();
  const cities = [
    'Gurgaon',
    'Delhi',
    'Noida',
    'Mumbai',
    'Pune',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Ahmedabad',
    'Kolkata',
    'Indore',
  ];

  const handleClick = (city) => {
    // Navigate to search with city filter
    router.push(`/search?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => handleClick(city)}
          className="px-4 py-1 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-primary-light transition-colors"
        >
          {city}
        </button>
      ))}

      {/* View more button (no click handler) */}
      <button className="px-4 py-1 rounded-full bg-accent text-primary-light hover:bg-[#d4a764] transition-colors">
        View more
      </button>
    </div>
  );
}
