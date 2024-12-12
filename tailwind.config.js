/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3CDAF7',
          1: '#f2fbff',
          2: '#20B2FA',
        },
        buttonGradientEndColor: '#20B2FA',
        gray: {
          1: '#f8f8f8',
          2: '#eee',
          3: '#aaa',
          4: '#444',
        },
      },
      fontFamily: {
        iblack: 'Inter_900Black',
        ibold: 'Inter_700Bold',
        imedium: 'Inter_500Medium',
        isemibold: 'Inter_600SemiBold',
        iregular: 'Inter_400Regular',
        ilight: 'Inter_300Light',
      },
    },
  },
  plugins: [],
};
