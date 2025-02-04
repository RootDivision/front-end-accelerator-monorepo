/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  plugins: [import('tailwindcss-animate')],
};
