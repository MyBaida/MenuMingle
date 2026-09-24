/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm, appetising brand accent used sparingly (clean & minimal).
        // Softer amber/terracotta ramp - less neon than the previous orange.
        brand: {
          50: '#fbf5f0',
          100: '#f6e7db',
          200: '#efd1bc',
          300: '#e4b293',
          400: '#d68f67',
          500: '#c4703f',
          600: '#a85a31',
          700: '#874627',
          800: '#6b3820',
          900: '#57301d',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
        'card-hover': '0 8px 30px -6px rgb(15 23 42 / 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
