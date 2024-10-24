/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"GmarketSansMedium"', ...defaultTheme.fontFamily.sans],
      roboto: ['"Roboto-Medium"'],
    },
    extend: {
      colors: {
        brandLight: '#FF7C6C',
        brandMain: '#FF624F',
        brandDark: '#FF4832',
        brandBase: '#FF9A8E',
        brandAccent: '#FF290F',
        success: '#22bb33',
        error: '#ff0000',
        info: '#5bc0de',
        backdrop: 'rgba(51, 47, 55, 0.4)',
        outline: '#968e98',
        blur: '#9CA3AF',
      },

      transitionProperty: {
        colors:
          'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
    },
  },
  plugins: [],
};
