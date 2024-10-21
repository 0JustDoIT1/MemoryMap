/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      brandLight: '#FF7C6C',
      brandMain: '#FF624F',
      brandDark: '#FF4832',
      brandBase: '#FF9A8E',
      brandAccent: '#FF290F',
      success: '#198754',
      info: '#0DCAF0',
      backdrop: 'rgba(51, 47, 55, 0.4)',
      outline: '#968e98',
    },
    fontFamily: {sans: ['GmarketSansMedium', 'sans-serif']},
  },
  plugins: [],
};
