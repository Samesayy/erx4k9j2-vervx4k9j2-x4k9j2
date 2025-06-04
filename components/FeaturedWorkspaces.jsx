// components/FeaturedWorkspaces.jsx
import { useState } from 'react';
import Image from 'next/image';

// Dummy data: six arrays, one for each category
const dataByCategory = {
  'Coworking Space': Array.from({ length: 15 }).map((_, i) => ({
    id: `cowork-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `CoWork Space ${i + 1}`,
    location: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Pune'][i % 5],
    price: `₹ ${300 + i * 20}/ day`,
  })),
  'Private Office': Array.from({ length: 15 }).map((_, i) => ({
    id: `private-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `Private Office ${i + 1}`,
    location: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Pune'][i % 5],
    price: `₹ ${500 + i * 30}/ day`,
  })),
  'Virtual Office': Array.from({ length: 15 }).map((_, i) => ({
    id: `virtual-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `Virtual Office ${i + 1}`,
    location: ['New York', 'London', 'Dubai', 'Berlin', 'Sydney'][i % 5],
    price: 'PRICE ON REQUEST',
  })),
  'Meeting Room': Array.from({ length: 15 }).map((_, i) => ({
    id: `meet-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `Meeting Room ${i + 1}`,
    location: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Pune'][i % 5],
    price: `₹ ${700 + i * 25}/ hour`,
  })),
  'Training Room': Array.from({ length: 15 }).map((_, i) => ({
    id: `train-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `Training Room ${i + 1}`,
    location: ['Hyderabad', 'Bangalore', 'Pune', 'Ahmedabad', 'Noida'][i % 5],
    price: `₹ ${1000 + i * 50}/ day`,
  })),
  'Flexi Desk': Array.from({ length: 15 }).map((_, i) => ({
    id: `flexi-${i + 1}`,
    image: '/images/sample-workspace.jpg',
    title: `Flexi Desk ${i + 1}`,
    location: ['Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune'][i % 5],
    price: `₹ ${250 + i * 15}/ day`,
  })),
};

const categories = [
  'Coworking Space',
  'Private Office',
  'Virtual Office',
  'Meeting Room',
  'Training Room',
  'Flexi Desk',
];

export default function FeaturedWorkspaces() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Grab the array for the currently selected category
  const filteredWorkspaces = dataByCategory[selectedCategory];

  return (
    <section className="py-12 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark mb-6">
          Featured Workspaces
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-primary text-primary-light'
                    : 'border border-medium-gray text-primary-dark hover:bg-accent hover:text-primary-dark'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Horizontal Slider */}
        <div className="relative">
          <button
            onClick={() =>
              document
                .getElementById('workspace-slider')
                .scrollBy({ left: -300, behavior: 'smooth' })
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-primary-dark bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity"
          >
            <span className="text-primary-light text-xl">&larr;</span>
          </button>

          <div
            id="workspace-slider"
            className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar"
          >
            {filteredWorkspaces.map((ws) => (
              <div
                key={ws.id}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-primary-light rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full h-40 md:h-44 overflow-hidden rounded-t-lg">
                  <Image
                    src={ws.image}
                    alt={ws.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary-dark mb-1">
                    {ws.title}
                  </h3>
                  <p className="text-medium-gray text-sm mb-2">{ws.location}</p>
                  <p className="text-brand-primary text-sm font-medium">
                    {ws.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              document
                .getElementById('workspace-slider')
                .scrollBy({ left: 300, behavior: 'smooth' })
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-primary-dark bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity"
          >
            <span className="text-primary-light text-xl">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
