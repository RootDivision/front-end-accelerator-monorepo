import tailwindScrollbarHide from 'tailwind-scrollbar-hide';
import tailwindCssAnimate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  plugins: [tailwindCssAnimate, tailwindScrollbarHide],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
};
