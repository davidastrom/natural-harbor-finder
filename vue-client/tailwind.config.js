/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        fullscreen: "url('./public/img/archibelago-bg.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
