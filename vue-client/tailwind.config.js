/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        fullscreen: "url('/img/archibelago-bg.jpg')",
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
      colors: {
        'primary-50': 'rgb(var(--primary-50))',
        'primary-100': 'rgb(var(--primary-100))',
        'primary-200': 'rgb(var(--primary-200))',
        'primary-300': 'rgb(var(--primary-300))',
        'primary-400': 'rgb(var(--primary-400))',
        'primary-500': 'rgb(var(--primary-500))',
        'primary-600': 'rgb(var(--primary-600))',
        'primary-700': 'rgb(var(--primary-700))',
        'primary-800': 'rgb(var(--primary-800))',
        'primary-900': 'rgb(var(--primary-900))',
        'primary-950': 'rgb(var(--primary-950))',
        'surface-0': 'rgb(var(--surface-0))',
        'surface-50': 'rgb(var(--surface-50))',
        'surface-100': 'rgb(var(--surface-100))',
        'surface-200': 'rgb(var(--surface-200))',
        'surface-300': 'rgb(var(--surface-300))',
        'surface-400': 'rgb(var(--surface-400))',
        'surface-500': 'rgb(var(--surface-500))',
        'surface-600': 'rgb(var(--surface-600))',
        'surface-700': 'rgb(var(--surface-700))',
        'surface-800': 'rgb(var(--surface-800))',
        'surface-900': 'rgb(var(--surface-900))',
        'surface-950': 'rgb(var(--surface-950))'
      }
    },
  },
};
