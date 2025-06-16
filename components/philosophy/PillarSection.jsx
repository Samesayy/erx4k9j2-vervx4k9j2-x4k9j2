// components/philosophy/PillarSection.jsx
import { useEffect, useRef, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

// Custom hook for scroll animations from the previous step
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef) };
  }, [ref]);
  return isIntersecting;
}

export default function PillarSection({ icon, title, desc, features, isLeftAligned }) {
    const ref = useRef();
    const onScreen = useOnScreen(ref);

    return (
        <div ref={ref} className="flex items-center w-full py-16">
            <div className={`flex items-center gap-12 w-full flex-col ${isLeftAligned ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Icon */}
                <div className={`
                    p-8 bg-brand-primary/10 border-2 border-brand-primary/20 rounded-full text-brand-primary transition-all duration-700
                    ${onScreen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}>
                    {icon}
                </div>
                {/* Content */}
                <div className={`
                    flex-1 transition-all duration-700
                    ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 8px rgba(52, 152, 219, 0.4)' }}>
                        {title}
                    </h2>
                    <p className="text-lg text-medium-gray mb-6 leading-relaxed">{desc}</p>
                    <ul className="space-y-2">
                        {features.map(feature => (
                            <li key={feature} className="flex items-center text-gray-400">
                                <FiCheckCircle className="text-brand-primary mr-3 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}