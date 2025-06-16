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
  ];

  const handleClick = (city) => {
    // UPDATED: Navigate to the /listing page we built
    router.push(`/listing?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => handleClick(city)}
          className="px-4 py-1 rounded-full border border-medium-gray text-medium-gray hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
        >
          {city}
        </button>
      ))}
    </div>
  );
}
