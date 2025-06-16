// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure Tailwind scans all your pages and components for class names
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Custom color palette for "Strategic Horizon"
      colors: {
        'primary-dark':    '#2C3E50',    // Deep Slate
        'primary-light':   '#ECF0F1',    // Soft Warm Gray
        'medium-gray':     '#95A5A6',    // Secondary text / borders
        'brand-primary':   '#3498DB',    // Deep Cerulean Blue (CTA, active)
        'accent':          '#E6B980',    // Muted Gold (highlights)
        'brand-accent':    '#FF00FF',    // Electric Magenta
      },
      // Custom box shadow
      boxShadow: {
        glass: '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      // Keyframes for animations
      keyframes: {
        'fade-in-down': {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%':   { maxHeight: '0', opacity: '0', overflow: 'hidden' },
          '100%': { maxHeight: '500px', opacity: '1', overflow: 'visible' },
        },
        'marquee-scroll': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Named animations
      animation: {
        'fade-in-down':   'fade-in-down 0.3s ease-out forwards',
        'slide-down':     'slide-down 0.4s ease-out forwards',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
        'fade-slide-up':  'fade-slide-up 0.5s ease-out forwards',
      },
      // Override default sans font to use our CSS variable + fallbacks
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
