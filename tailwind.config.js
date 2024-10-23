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
      success: '#22bb33',
      error: '#bb2124',
      info: '#5bc0de',
      backdrop: 'rgba(51, 47, 55, 0.4)',
      outline: '#968e98',
      blur: '#9CA3AF',
    },
    fontFamily: {sans: ['GmarketSansMedium', 'sans-serif']},
  },
  plugins: [],
};
