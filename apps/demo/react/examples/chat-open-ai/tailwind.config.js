/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  prefix: 'cw-',
  theme: {
    extend: {
      colors: {
        'background': {
          DEFAULT: `hsl(${process.env.THEME_BACKGROUND})`,
          dark: `hsl(${process.env.THEME_BACKGROUND_DARK})`,
        },
        'primary': {
          DEFAULT: `hsl(${process.env.THEME_PRIMARY})`,
          hover: `hsl(${process.env.THEME_PRIMARY_HOVER})`,
          dark: `hsl(${process.env.THEME_PRIMARY_DARK})`,
        },
        'ai-chat-bubble': {
          DEFAULT: `hsl(${process.env.THEME_AI_CHAT_BUBBLE})`,
          dark: `hsl(${process.env.THEME_AI_CHAT_BUBBLE_DARK})`,
        },
        'user-chat-bubble': {
          DEFAULT: `hsl(${process.env.THEME_USER_CHAT_BUBBLE})`,
          dark: `hsl(${process.env.THEME_USER_CHAT_BUBBLE_DARK})`,
        },
        'text': {
          DEFAULT: `hsl(${process.env.THEME_TEXT})`,
          dark: `hsl(${process.env.THEME_TEXT_DARK})`,
        },
        'border': {
          DEFAULT: `hsl(${process.env.THEME_BORDER})`,
          dark: `hsl(${process.env.THEME_BORDER_DARK})`,
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
