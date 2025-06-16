// components/charts/AnimatedIndiaMap.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const cities = [
    { name: 'Delhi', x: '50%', y: '30%' },
    { name: 'Mumbai', x: '35%', y: '55%' },
    { name: 'Bangalore', x: '50%', y: '75%' },
    { name: 'Chennai', x: '58%', y: '78%' },
    { name: 'Hyderabad', x: '55%', y: '65%' },
    { name: 'Pune', x: '40%', y: '60%' },
    { name: 'Kolkata', x: '80%', y: '45%' },
];

export default function AnimatedIndiaMap() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <motion.div 
            ref={ref} 
            className="relative w-full aspect-[4/5] max-w-sm mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1 }}
        >
            <motion.svg
                viewBox="0 0 793.12 905.99"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.path
                    d="M653.13,242.33l-13.4-12.71-3.35-7.43-11.42-3.35-1.34-6.04-10.07-2.68-4.02-4.02-22.13-10.07-2.68-12.08-14.75-10.74-2.68-10.74-18.1-16.09-12.08-2.68-15.42-16.77-16.77-14.75-2.68-14.09-2.01-14.75-16.77-6.71-12.74-10.74-12.08-11.4-6.71-11.4-12.74-14.09-31.52-2.01-16.77-2.68-18.78-9.39-12.74L350.5,0l-16.77,2.68-16.1,2.68-14.09,10.07-10.74,10.74-2.68,14.09L272,60.38l-10.07,14.75-12.08,12.08L236.43,101l-10.74,14.75-16.77,10.74-12.74,12.74-12.08,16.77-15.42,12.74-12.74,12.08-16.77,10.74-14.09-2.01-14.75,2.01-12.08,10.07-16.77,14.75-10.07,13.4-12.08,16.77-2.68,10.74-2.01,13.4-2.68,14.09-10.74,12.08-10.07,12.74-14.09,16.77-11.4,12.74-12.74,12.08-16.77,10.74-14.09,2.68-12.74,10.74-2.01,16.1-2.01,14.75,2.01,14.09-2.68,12.74-2.01,16.77,2.01,15.42,10.07,13.4,12.74,10.74-2.01,12.08,2.01,14.75,10.74,16.1,12.74,15.42,16.77,14.09,10.74,12.08,14.75,10.07,16.1-2.01,12.74-2.68,14.09,10.07,13.4,14.09,16.1,12.08,15.42,16.1,14.75,10.74-2.01,12.08-2.68,13.4,2.01,14.09-2.01,12.74-2.68,14.75,10.74,16.1,12.08,15.42,16.77,14.09,10.74,12.74,14.75,10.07,16.1-2.01,12.74-2.68,14.09-10.07,13.4-14.09,16.1-12.08,15.42-16.77-14.09-10.74-12.74-14.75-10.07-16.1,2.01-12.74,2.68-14.09L653.13,242.33Z"
                    fill="rgba(52, 152, 219, 0.1)"
                    stroke="rgba(52, 152, 219, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </motion.svg>
            {cities.map((city, index) => (
                <motion.div
                    key={city.name}
                    className="absolute"
                    style={{ top: city.y, left: city.x }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                >
                    <div className="w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(255,0,255,1)]" />
                </motion.div>
            ))}
        </motion.div>
    );
};