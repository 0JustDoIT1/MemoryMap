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
        blackOpacity: 'rgba(0,0,0, 0.6)',
        whiteOpacity: 'rgba(255,255,255, 0.7)',
        brandLight: '#3F6FE6',
        brandMain: '#2058E2',
        brandDark: '#1B4BC1',
        darkGray: '#484848',
        success: '#22bb33',
        error: '#FF2424',
        info: '#5bc0de',
        backdrop: 'rgba(51, 47, 55, 0.4)',
        outline: '#968e98',
        blur: '#9CA3AF',
        skelton: '#DBDBDB',
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
