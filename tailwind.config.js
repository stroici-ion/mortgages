/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#3CDAF7',
        buttonGradientEndColor: '#20B2FA',
        gray: {
          1: '#f8f8f8',
          2: '#eee',
          3: '#aaa',
          4: '#444',
        },
        secondary: {
          DEFAULT: '#20B2FA',
          100: '#FF9001',
          200: '#FF8E01',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
      },
    },
  },
  plugins: [],
};
