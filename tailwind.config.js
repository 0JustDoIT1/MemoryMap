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
        excite: '#41C450',
        happy: '#9ACD32',
        neutral: '#41C4AE',
        sad: '#FF7224',
        dead: '#FF4343',
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
