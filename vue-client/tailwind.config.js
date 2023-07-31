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
        fullscreen: "url('./img/archibelago-bg.jpg')",
      },
      boxShadow: {
        1: '0px 1px 4px 0px rgba(29, 41, 57, 0.08), 0px 1px 2px 0px rgba(29, 41, 57, 0.10)',
        2: '0px 4px 8px 0px rgba(29, 41, 57, 0.10), 0px 1px 4px 0px rgba(29, 41, 57, 0.10)',
        3: '0px 12px 20px 0px rgba(29, 41, 57, 0.10), 0px 5px 12px -1px rgba(29, 41, 57, 0.10), 0px 2px 4px -1px rgba(29, 41, 57, 0.10)',
        4: '0px 16px 24px -1px rgba(29, 41, 57, 0.10), 0px 8px 16px -2px rgba(29, 41, 57, 0.10), 0px 4px 8px -2px rgba(29, 41, 57, 0.10)',
        5: '0px 24px 40px -2px rgba(29, 41, 57, 0.10), 0px 16px 24px -3px rgba(29, 41, 57, 0.10), 0px 10px 20px -3px rgba(29, 41, 57, 0.10), 0px 5px 12px -3px rgba(29, 41, 57, 0.10)',
        6: '0px 40px 80px -3px rgba(29, 41, 57, 0.10), 0px 32px 64px -4px rgba(29, 41, 57, 0.10), 0px 16px 32px -4px rgba(29, 41, 57, 0.10), 0px 12px 20px -4px rgba(29, 41, 57, 0.10), 0px 8px 16px -4px rgba(29, 41, 57, 0.10)',
      },
      dropShadow: {
        1: '0px 1px 4px 0px rgba(29, 41, 57, 0.08), 0px 1px 2px 0px rgba(29, 41, 57, 0.10)',
        2: '0px 4px 8px 0px rgba(29, 41, 57, 0.10), 0px 1px 4px 0px rgba(29, 41, 57, 0.10)',
        3: '0px 12px 20px 0px rgba(29, 41, 57, 0.10), 0px 5px 12px -1px rgba(29, 41, 57, 0.10), 0px 2px 4px -1px rgba(29, 41, 57, 0.10)',
        4: '0px 16px 24px -1px rgba(29, 41, 57, 0.10), 0px 8px 16px -2px rgba(29, 41, 57, 0.10), 0px 4px 8px -2px rgba(29, 41, 57, 0.10)',
        5: '0px 24px 40px -2px rgba(29, 41, 57, 0.10), 0px 16px 24px -3px rgba(29, 41, 57, 0.10), 0px 10px 20px -3px rgba(29, 41, 57, 0.10), 0px 5px 12px -3px rgba(29, 41, 57, 0.10)',
        6: '0px 40px 80px -3px rgba(29, 41, 57, 0.10), 0px 32px 64px -4px rgba(29, 41, 57, 0.10), 0px 16px 32px -4px rgba(29, 41, 57, 0.10), 0px 12px 20px -4px rgba(29, 41, 57, 0.10), 0px 8px 16px -4px rgba(29, 41, 57, 0.10)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
