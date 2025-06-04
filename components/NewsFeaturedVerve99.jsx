import Image from 'next/image';

export default function NewsFeaturedVerve99() {
  // 1) List of your news/outlet logos (place actual files under public/images/news/)
  const logos = [
    '/images/news/logo1.png',
    '/images/news/logo2.png',
    '/images/news/logo3.png',
    '/images/news/logo4.png',
    '/images/news/logo5.png',
    '/images/news/logo6.png',
  ];

  // 2) Duplicate the array so that the scroll appears continuous
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-primary-dark text-center mb-8">
          Featured In
        </h2>

        {/* Carousel Wrapper */}
        <div className="overflow-hidden">
          <div className="flex space-x-6 marquee pause-on-hover">
            {marqueeLogos.map((src, idx) => (
              <div
                key={idx}
                // --- FIX STARTS HERE ---
                // Changed from double quotes to backticks for multi-line string
                className={`
                  flex-shrink-0
                  bg-white
                  rounded-xl
                  shadow-lg
                  p-4
                  transform
                  transition-transform
                  duration-300
                  ease-in-out
                  hover:scale-105
                  hover:shadow-2xl
                `}
                // --- FIX ENDS HERE ---
              >
                <div className="relative w-32 h-16">
                  <Image
                    src={src}
                    alt={`News logo ${idx % logos.length + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3) Inline CSS for marquee animation and hover-pause */}
      <style jsx>{`
        .marquee {
          display: flex;
          animation: scroll-left 20s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}