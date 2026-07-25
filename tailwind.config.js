/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#315CA5',
          gold: '#E8B13C',
          red: '#E72C2D',
          green: '#7DC244',
          lime: '#C6F886',
          dark: '#111827',
          surface: '#1A1A1A',
          bgDark: '#0D1117',
          lightBg: '#F8FAFC',
          cardBg: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(198, 248, 134, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(49, 92, 165, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
};
