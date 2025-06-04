/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    // (If you have any other custom directories with JSX/TSX, add them here.)
  ],
  theme: {
    extend: {
      colors: {
        // Strategic Horizon color palette
        'primary-dark': '#2C3E50',    // Deep Slate
        'primary-light': '#ECF0F1',   // Soft Warm Gray
        'medium-gray': '#95A5A6',     // Secondary text / borders
        'brand-primary': '#3498DB',   // Deep Cerulean Blue (CTA, active)
        'accent': '#E6B980',          // Muted Gold (highlights)
      },
      fontFamily: {
        // Example: if you want to use Inter as your default
        // Make sure you import the font in your global CSS or head
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        // Optionally add a custom “blurred” shadow for glassmorphism
        'glass': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    // Add any official plugins if you need them, for example:
    // require('@tailwindcss/forms'),
    require('@tailwindcss/typography'), // This line has been added/uncommented
    // ...other plugins // Removed the comment, as it's not valid JS syntax
  ],
};