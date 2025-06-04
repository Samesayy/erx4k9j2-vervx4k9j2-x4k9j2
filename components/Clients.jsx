// components/Clients.jsx
import Image from 'next/image';

export default function Clients() {
  const clientLogos = [
    '/images/clients/logo1.png',
    '/images/clients/logo2.png',
    '/images/clients/logo3.png',
    '/images/clients/logo4.png',
    '/images/clients/logo5.png',
    '/images/clients/logo6.png',
    '/images/clients/logo7.png',
    '/images/clients/logo8.png',
    '/images/clients/logo9.png',
    '/images/clients/logo10.png',
  ];

  return (
    <section className="py-20 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-primary-dark text-center mb-12">
          Our Esteemed Clients
        </h2>

        {/* Responsive Grid of Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {clientLogos.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full h-24 bg-white rounded-lg shadow-sm flex items-center justify-center 
                         hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Logo */}
              <Image
                src={src}
                alt={`Client logo ${idx + 1}`}
                fill
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
