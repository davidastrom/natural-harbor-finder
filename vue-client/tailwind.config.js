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
        'soft-xxs': '0 1px 5px 1px #ddd',
        'soft-xs': '0 3px 5px -1px rgba(0,0,0,.09),0 2px 3px -1px rgba(0,0,0,.07)',
        'soft-sm':
          '0 .25rem .375rem -.0625rem hsla(0,0%,8%,.12),0 .125rem .25rem -.0625rem hsla(0,0%,8%,.07)',
        'soft-md': '0 4px 7px -1px rgba(0,0,0,.11),0 2px 4px -1px rgba(0,0,0,.07)',
        'soft-lg': '0 2px 12px 0 rgba(0,0,0,.16)',
        'soft-xl': '0 20px 27px 0 rgba(0,0,0,.05)',
        'soft-2xl': '0 .3125rem .625rem 0 rgba(0,0,0,.12)',
        'soft-3xl': '0 8px 26px -4px hsla(0,0%,8%,.15),0 8px 9px -5px hsla(0,0%,8%,.06)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
