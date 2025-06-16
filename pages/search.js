// pages/search.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useMemo } from 'react';

// -- DUMMY DATA: 6 services × 6 cities = 36 listings --
// Each listing has: id, name, imageUrl, location, city, service, capacity, budgetPerSeat, timing, connectivity
const ALL_LISTINGS = [
  // --- Coworking Space (3 per city × 6 cities = 18) ---
  {
    id: 'cs-delhi-1',
    name: 'Delhi Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Connaught Place',
    city: 'Delhi',
    service: 'Coworking Space',
    capacity: 10,
    budgetPerSeat: 2000,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'cs-delhi-2',
    name: 'Delhi Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Saket',
    city: 'Delhi',
    service: 'Coworking Space',
    capacity: 15,
    budgetPerSeat: 1800,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'cs-delhi-3',
    name: 'Delhi Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Hauz Khas',
    city: 'Delhi',
    service: 'Coworking Space',
    capacity: 12,
    budgetPerSeat: 2200,
    timing: '7:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Rail',
  },
  {
    id: 'cs-gurgaon-1',
    name: 'Gurgaon Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 14',
    city: 'Gurgaon',
    service: 'Coworking Space',
    capacity: 8,
    budgetPerSeat: 2100,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'cs-gurgaon-2',
    name: 'Gurgaon Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Cyber City',
    city: 'Gurgaon',
    service: 'Coworking Space',
    capacity: 20,
    budgetPerSeat: 2400,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Bus',
  },
  {
    id: 'cs-gurgaon-3',
    name: 'Gurgaon Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'MG Road',
    city: 'Gurgaon',
    service: 'Coworking Space',
    capacity: 6,
    budgetPerSeat: 2000,
    timing: '8:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Rail',
  },
  {
    id: 'cs-noida-1',
    name: 'Noida Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 62',
    city: 'Noida',
    service: 'Coworking Space',
    capacity: 14,
    budgetPerSeat: 1900,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'cs-noida-2',
    name: 'Noida Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 18',
    city: 'Noida',
    service: 'Coworking Space',
    capacity: 10,
    budgetPerSeat: 2000,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Rail',
  },
  {
    id: 'cs-noida-3',
    name: 'Noida Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 50',
    city: 'Noida',
    service: 'Coworking Space',
    capacity: 16,
    budgetPerSeat: 1800,
    timing: '7:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'cs-mumbai-1',
    name: 'Mumbai Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Andheri West',
    city: 'Mumbai',
    service: 'Coworking Space',
    capacity: 12,
    budgetPerSeat: 2500,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'cs-mumbai-2',
    name: 'Mumbai Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Bandra',
    city: 'Mumbai',
    service: 'Coworking Space',
    capacity: 20,
    budgetPerSeat: 2600,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Bus · Rail',
  },
  {
    id: 'cs-mumbai-3',
    name: 'Mumbai Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Lower Parel',
    city: 'Mumbai',
    service: 'Coworking Space',
    capacity: 18,
    budgetPerSeat: 2400,
    timing: '7:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Rail',
  },
  {
    id: 'cs-bangalore-1',
    name: 'Bangalore Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Koramangala',
    city: 'Bangalore',
    service: 'Coworking Space',
    capacity: 15,
    budgetPerSeat: 2300,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'cs-bangalore-2',
    name: 'Bangalore Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Whitefield',
    city: 'Bangalore',
    service: 'Coworking Space',
    capacity: 10,
    budgetPerSeat: 2200,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Bus',
  },
  {
    id: 'cs-bangalore-3',
    name: 'Bangalore Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'MG Road',
    city: 'Bangalore',
    service: 'Coworking Space',
    capacity: 12,
    budgetPerSeat: 2100,
    timing: '7:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Rail',
  },
  {
    id: 'cs-chennai-1',
    name: 'Chennai Cowork Hub A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'T. Nagar',
    city: 'Chennai',
    service: 'Coworking Space',
    capacity: 10,
    budgetPerSeat: 2000,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'cs-chennai-2',
    name: 'Chennai Cowork Hub B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Adyar',
    city: 'Chennai',
    service: 'Coworking Space',
    capacity: 14,
    budgetPerSeat: 2100,
    timing: '9:00 AM – 9:00 PM',
    connectivity: 'Car · Rail',
  },
  {
    id: 'cs-chennai-3',
    name: 'Chennai Cowork Hub C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Velachery',
    city: 'Chennai',
    service: 'Coworking Space',
    capacity: 12,
    budgetPerSeat: 1900,
    timing: '7:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },

  // --- Serviced Office (6 listings in 3 cities) ---
  {
    id: 'so-gurgaon-1',
    name: 'Gurgaon Serviced Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Cyber City',
    city: 'Gurgaon',
    service: 'Serviced Office',
    capacity: 5,
    budgetPerSeat: 3500,
    timing: '9:00 AM – 7:00 PM',
    connectivity: 'Car · Bus · Rail',
  },
  {
    id: 'so-gurgaon-2',
    name: 'Gurgaon Serviced Office B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sushant Lok',
    city: 'Gurgaon',
    service: 'Serviced Office',
    capacity: 8,
    budgetPerSeat: 3300,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'so-gurgaon-3',
    name: 'Gurgaon Serviced Office C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'MG Road',
    city: 'Gurgaon',
    service: 'Serviced Office',
    capacity: 6,
    budgetPerSeat: 3400,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Rail',
  },
  {
    id: 'so-noida-1',
    name: 'Noida Serviced Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 18',
    city: 'Noida',
    service: 'Serviced Office',
    capacity: 4,
    budgetPerSeat: 3200,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'so-noida-2',
    name: 'Noida Serviced Office B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 62',
    city: 'Noida',
    service: 'Serviced Office',
    capacity: 8,
    budgetPerSeat: 3100,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bus · Rail',
  },
  {
    id: 'so-noida-3',
    name: 'Noida Serviced Office C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 125',
    city: 'Noida',
    service: 'Serviced Office',
    capacity: 10,
    budgetPerSeat: 3000,
    timing: '9:00 AM – 7:00 PM',
    connectivity: 'Car · Bike · Rail',
  },
  {
    id: 'so-mumbai-1',
    name: 'Mumbai Serviced Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Bandra',
    city: 'Mumbai',
    service: 'Serviced Office',
    capacity: 4,
    budgetPerSeat: 4000,
    timing: '9:00 AM – 7:00 PM',
    connectivity: 'Car · Bus · Rail',
  },
  {
    id: 'so-mumbai-2',
    name: 'Mumbai Serviced Office B',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Andheri East',
    city: 'Mumbai',
    service: 'Serviced Office',
    capacity: 6,
    budgetPerSeat: 4200,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike',
  },
  {
    id: 'so-mumbai-3',
    name: 'Mumbai Serviced Office C',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Lower Parel',
    city: 'Mumbai',
    service: 'Serviced Office',
    capacity: 5,
    budgetPerSeat: 3900,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Rail',
  },

  // --- Virtual Office (3 listings) ---
  {
    id: 'vo-delhi-1',
    name: 'Delhi Virtual Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Connaught Place',
    city: 'Delhi',
    service: 'Virtual Office',
    capacity: 2,
    budgetPerSeat: 1500,
    timing: '10:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'vo-gurgaon-1',
    name: 'Gurgaon Virtual Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 14',
    city: 'Gurgaon',
    service: 'Virtual Office',
    capacity: 1,
    budgetPerSeat: 1400,
    timing: '10:00 AM – 5:00 PM',
    connectivity: 'Car · Rail',
  },
  {
    id: 'vo-noida-1',
    name: 'Noida Virtual Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 62',
    city: 'Noida',
    service: 'Virtual Office',
    capacity: 2,
    budgetPerSeat: 1300,
    timing: '10:00 AM – 6:00 PM',
    connectivity: 'Car · Bus · Bike',
  },

  // --- Meeting Room (3 listings) ---
  {
    id: 'mr-delhi-1',
    name: 'Delhi Meeting Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Khan Market',
    city: 'Delhi',
    service: 'Meeting Room',
    capacity: 8,
    budgetPerSeat: 2500,
    timing: '8:00 AM – 8:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },
  {
    id: 'mr-noida-1',
    name: 'Noida Meeting Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 18',
    city: 'Noida',
    service: 'Meeting Room',
    capacity: 10,
    budgetPerSeat: 2300,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Bus · Bike',
  },
  {
    id: 'mr-mumbai-1',
    name: 'Mumbai Meeting Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Nariman Point',
    city: 'Mumbai',
    service: 'Meeting Room',
    capacity: 12,
    budgetPerSeat: 2700,
    timing: '8:00 AM – 7:00 PM',
    connectivity: 'Car · Bus · Rail',
  },

  // --- Training Room (3 listings) ---
  {
    id: 'tr-delhi-1',
    name: 'Delhi Training Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Bandra Kurla Complex',
    city: 'Delhi',
    service: 'Training Room',
    capacity: 20,
    budgetPerSeat: 1800,
    timing: '8:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'tr-bangalore-1',
    name: 'Bangalore Training Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Whitefield',
    city: 'Bangalore',
    service: 'Training Room',
    capacity: 25,
    budgetPerSeat: 2000,
    timing: '9:00 AM – 7:00 PM',
    connectivity: 'Car · Bus',
  },
  {
    id: 'tr-chennai-1',
    name: 'Chennai Training Room A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Adyar',
    city: 'Chennai',
    service: 'Training Room',
    capacity: 15,
    budgetPerSeat: 1900,
    timing: '8:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus · Rail',
  },

  // --- Day Office (3 listings) ---
  {
    id: 'do-noida-1',
    name: 'Noida Day Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Sector 50',
    city: 'Noida',
    service: 'Day Office',
    capacity: 4,
    budgetPerSeat: 1200,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
  {
    id: 'do-mumbai-1',
    name: 'Mumbai Day Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Bandra East',
    city: 'Mumbai',
    service: 'Day Office',
    capacity: 2,
    budgetPerSeat: 1300,
    timing: '8:00 AM – 5:00 PM',
    connectivity: 'Car · Bus · Rail',
  },
  {
    id: 'do-bangalore-1',
    name: 'Bangalore Day Office A',
    imageUrl: '/images/sample-workspace.jpg',
    location: 'Koramangala',
    city: 'Bangalore',
    service: 'Day Office',
    capacity: 3,
    budgetPerSeat: 1250,
    timing: '9:00 AM – 6:00 PM',
    connectivity: 'Car · Bike · Bus',
  },
];

export default function SearchPage() {
  const router = useRouter();
  const { service: initialService, city: initialCity } = router.query;

  // Filter states
  const [service, setService] = useState(initialService || '');
  const [city, setCity] = useState(initialCity || '');
  const [locality, setLocality] = useState('');
  const [capacity, setCapacity] = useState('');
  const [budget, setBudget] = useState('');

  // Compute filtered listings
  const filteredListings = useMemo(() => {
    return ALL_LISTINGS.filter((item) => {
      if (service && item.service !== service) return false;
      if (city && item.city !== city) return false;
      if (locality && !item.location.toLowerCase().includes(locality.toLowerCase())) return false;
      if (capacity) {
        const capNum = parseInt(capacity, 10);
        if (item.capacity < capNum) return false;
      }
      if (budget) {
        const budNum = parseInt(budget, 10);
        if (item.budgetPerSeat > budNum) return false;
      }
      return true;
    });
  }, [service, city, locality, capacity, budget]);

  // Update URL query params (shallow) when service/city changes
  const updateQuery = (key, value) => {
    const newQuery = { ...router.query, [key]: value || undefined };
    if (!value) delete newQuery[key];
    router.push({ pathname: '/search', query: newQuery }, undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen bg-primary-light">
      {/* --- Back to Home --- */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => router.push('/')}
          className="text-blue-600 underline mb-4"
        >
          ← Back to Home
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4">
          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                updateQuery('service', e.target.value);
              }}
              className="mt-1 block w-48 border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Services</option>
              <option value="Coworking Space">Coworking Space</option>
              <option value="Serviced Office">Serviced Office</option>
              <option value="Virtual Office">Virtual Office</option>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Training Room">Training Room</option>
              <option value="Day Office">Day Office</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                updateQuery('city', e.target.value);
              }}
              className="mt-1 block w-48 border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Noida">Noida</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Locality</label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="Type locality (e.g. Saket)"
              className="mt-1 block w-48 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity (min seats)</label>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-1 block w-48 border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Min</option>
              <option value="1">1+</option>
              <option value="5">5+</option>
              <option value="10">10+</option>
              <option value="20">20+</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget (₹ per seat ≤)</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 block w-48 border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Max</option>
              <option value="1500">₹1,500</option>
              <option value="2000">₹2,000</option>
              <option value="3000">₹3,000</option>
              <option value="5000">₹5,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Dynamic Headline (when both city & service selected) --- */}
      {service && city && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-primary-dark">
            Experience {city}&apos;s Premier {service}
          </h2>
        </div>
      )}

      {/* --- Listings Grid --- */}
      <div className="container mx-auto px-4 py-8">
        {filteredListings.length === 0 ? (
          <div className="text-center text-gray-500">
            No matching workspaces found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                href={{
                  pathname: `/listing/${listing.id}`,
                  query: { service: listing.service, city: listing.city },
                }}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {listing.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {listing.location}, {listing.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Timing:</strong> {listing.timing}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Connectivity:</strong> {listing.connectivity}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    ₹{listing.budgetPerSeat}/seat &middot; {listing.capacity} seats
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
