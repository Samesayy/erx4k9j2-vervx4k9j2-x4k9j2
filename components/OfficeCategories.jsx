// components/OfficeCategories.jsx
import { useRef } from 'react'; // 1. IMPORT useRef
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // 2. IMPORT ICONS

const categories = [
  {
    title: 'Co-working Spaces',
    description: 'Collaborative desks and cabins designed to spark innovation.',
    image: '/images/categories/coworking.jpg',
    href: '/listing?service=Coworking Space',
  },
  {
    title: 'Serviced Offices',
    description: 'Fully managed offices that let your team hit the ground running.',
    image: '/images/categories/serviced.jpg',
    href: '/listing?service=Serviced Office',
  },
  {
    title: 'Virtual Offices',
    description: 'Business registration & GST address without a physical space.',
    image: '/images/categories/virtual.jpg',
    href: '/listing?service=Virtual Office',
  },
  {
    title: 'Meeting Rooms',
    description: 'Professional meeting suites for client pitch and team huddles.',
    image: '/images/categories/meeting.jpg',
    href: '/listing?service=Meeting Room',
  },
  {
    title: 'Training Rooms',
    description: 'Tech-enabled rooms for workshops, seminars, and larger events.',
    image: '/images/categories/training.jpg',
    href: '/listing?service=Training Room',
  },
  {
    title: 'Day Pass',
    description: 'On-demand access to any coworking location—all day, no membership.',
    image: '/images/categories/daypass.jpg',
    href: '/listing?service=Day Office',
  },
];

export default function OfficeCategories() {
  // 3. SET UP THE REF AND SCROLL HANDLER
  const scrollContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
          Find, Book, Work: Office Spaces Simplified
        </h2>

        {/* 4. WRAP THE SLIDER AND BUTTONS IN A 'relative' CONTAINER */}
        <div className="relative">
          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef} // 5. ATTACH THE REF
            className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar"
          >
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex-shrink-0 w-72 md:w-80 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-primary-dark">
                    {cat.title}
                  </h3>
                  <p className="text-medium-gray text-sm mt-2">{cat.description}</p>
                  <div className="mt-4">
                    <span className="text-brand-primary font-semibold flex items-center">
                      Explore
                      <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1 ml-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 6. ADD THE SCROLL BUTTONS */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-0">
            <button
                onClick={() => handleScroll(-320)}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition"
                aria-label="Scroll Left"
            >
                <FiArrowLeft className="text-primary-dark" />
            </button>
            <button
                onClick={() => handleScroll(320)}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition"
                aria-label="Scroll Right"
            >
                <FiArrowRight className="text-primary-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}