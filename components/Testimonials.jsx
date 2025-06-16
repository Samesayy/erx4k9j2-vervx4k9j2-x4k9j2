// components/Testimonials.jsx
import { useRef } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

// 1. DUMMY DATA FOR 6 REALISTIC TESTIMONIALS
const testimonials = [
  {
    name: 'Priya Sharma',
    title: 'CEO, InnovateTech',
    avatar: '/images/avatars/person1.jpg',
    quote: 'Verve99 was a game-changer for our startup. We found the perfect flexible office in days, not months. The process was seamless and the support was outstanding.'
  },
  {
    name: 'Rohan Mehta',
    title: 'Enterprise Solutions Manager, Global Corp',
    avatar: '/images/avatars/person2.jpg',
    quote: 'Scaling our operations across three cities was a massive challenge. Verve99 provided a custom-built enterprise solution with centralized billing that saved us time and money.'
  },
  {
    name: 'Anjali Desai',
    title: 'Freelance UX Designer',
    avatar: '/images/avatars/person3.jpg',
    quote: 'As a freelancer, I need professional spaces on the go. The day pass option is perfect for meeting clients, and the virtual office gave my business instant credibility.'
  },
  {
    name: 'Vikram Singh',
    title: 'HR Director, ConnectAll',
    avatar: '/images/avatars/person4.jpg',
    quote: 'Our transition to a hybrid work model was made easy by Verve99. Their platform helped us find vetted satellite offices for our teams across the country.'
  },
  {
    name: 'Sameer Khan',
    title: 'Founder, EcoGoods Pvt. Ltd.',
    avatar: '/images/avatars/person5.jpg',
    quote: 'Finding a cost-effective, professional office was crucial for our small business. Verve99 delivered with zero brokerage fees and transparent pricing. Highly recommended!'
  },
  {
    name: 'Neha Reddy',
    title: 'Operations Head, LearnFast Edu',
    avatar: '/images/avatars/person6.jpg',
    quote: 'The variety of training rooms available on the platform is impressive. We booked a fully-equipped space for our workshop in under an hour. Fantastic service!'
  }
];

export default function Testimonials() {
  const scrollContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
            Trusted by Businesses of All Sizes
          </h2>
          <p className="text-lg text-medium-gray mt-3 max-w-2xl mx-auto">
            See what our clients have to say about their experience with Verve99.
          </p>
        </div>

        <div className="relative">
          {/* Testimonials Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex-shrink-0 w-full sm:w-[45%] lg:w-[31%] bg-white rounded-2xl shadow-lg p-8"
                style={{ scrollSnapAlign: 'start' }}
              >
                <FaQuoteLeft className="text-brand-primary/50 text-4xl mb-4" />
                <p className="text-medium-gray leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary-dark">{testimonial.name}</p>
                    <p className="text-sm text-medium-gray">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-0 pointer-events-none">
            <button
              onClick={() => handleScroll(-400)}
              className="pointer-events-auto p-3 bg-white rounded-full shadow-lg hover:bg-primary-light transition -ml-6"
              aria-label="Previous Testimonial"
            >
              <FiArrowLeft className="text-primary-dark" />
            </button>
            <button
              onClick={() => handleScroll(400)}
              className="pointer-events-auto p-3 bg-white rounded-full shadow-lg hover:bg-primary-light transition -mr-6"
              aria-label="Next Testimonial"
            >
              <FiArrowRight className="text-primary-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}