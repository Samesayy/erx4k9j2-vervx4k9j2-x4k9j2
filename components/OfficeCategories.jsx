// components/OfficeCategories.jsx
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Co-working Spaces',
    description:
      'Collaborative desks and cabins designed to spark innovation.',
    image: '/images/categories/coworking.jpg',
    href: '/services/coworking-spaces',
  },
  {
    title: 'Serviced Offices',
    description:
      'Fully managed offices that let your team hit the ground running.',
    image: '/images/categories/serviced.jpg',
    href: '/services/serviced-offices',
  },
  {
    title: 'Virtual Offices',
    description:
      'Business registration & GST address without a physical space.',
    image: '/images/categories/virtual.jpg',
    href: '/services/virtual-offices',
  },
  {
    title: 'Meeting Rooms',
    description:
      'Professional meeting suites for client pitch and team huddles.',
    image: '/images/categories/meeting.jpg',
    href: '/services/meeting-rooms',
  },
  {
    title: 'Training Rooms',
    description:
      'Tech-enabled rooms for workshops, seminars, and larger events.',
    image: '/images/categories/training.jpg',
    href: '/services/training-rooms',
  },
  {
    title: 'Day Pass',
    description:
      'On-demand access to any coworking location—all day, no membership.',
    image: '/images/categories/daypass.jpg',
    href: '/search?type=Day%20Office',
  },
];

export default function OfficeCategories() {
  return (
    <section className="py-12 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark mb-6 text-center">
          The Ultimate Office Space Solutions for You
        </h2>

        {/* Horizontal scroll container */}
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-primary-light rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-40 md:h-44 overflow-hidden rounded-t-lg">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 h-36 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-primary-dark">
                  {cat.title}
                </h3>
                <p className="text-medium-gray text-sm">{cat.description}</p>
                <div className="mt-2">
                  <span className="text-brand-primary font-medium hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
