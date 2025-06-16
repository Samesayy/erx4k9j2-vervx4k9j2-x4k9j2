// components/charts/AnimatedCounter.jsx
import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function AnimatedCounter({ to, from = 0, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = prefix + value.toFixed(1) + suffix;
          }
        },
      });
    }
  }, [inView, from, to, prefix, suffix]);

  return <span ref={ref} />;
}