/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './navigation.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandLight: '#60C9EE',
        brandMain: '#24B4E7',
        brandDark: '#1E9AC6',
        darkGray: '#484848',
        success: '#22bb33',
        error: '#FF2424',
        info: '#5bc0de',
        backdrop: 'rgba(51, 47, 55, 0.4)',
        outline: '#968e98',
        blur: '#9CA3AF',
      },
      fontFamily: {
        gmarket: ['GmarketSansMedium'],
        roboto: ['Roboto-Medium'],
      },
      transitionProperty: {
        colors:
          'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
    },
  },
  plugins: [],
};
