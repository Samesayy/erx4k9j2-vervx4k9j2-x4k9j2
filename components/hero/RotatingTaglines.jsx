// components/hero/RotatingTaglines.jsx
import { useState, useEffect } from 'react';

export default function RotatingTaglines() {
  const phrases = [
    'Seamlessly Connecting You to Premium Workspaces.',
    "Your Enterprise’s Next Productive Hub, Simplified.",
    'Discover Flexible Solutions for Modern Teams.',
  ];
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFadeOut(false);
      }, 500); // Fade‐out duration (ms)
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 md:h-12 relative overflow-hidden">
      <p
        key={index}
        className={`absolute text-brand-primary text-lg md:text-xl font-medium transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {phrases[index]}
      </p>
    </div>
  );
}
