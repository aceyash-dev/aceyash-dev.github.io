/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        milk: '#f5f0e6',
        ink: '#17130f',
        orange: '#e66a2c',
        'orange-light': '#f59a65',
        'milk-dim': '#b8afa2'
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
        display: ['Instrument Serif', 'serif']
      },
      boxShadow: {
        card: '0 18px 60px rgba(28, 17, 9, .09)',
        glow: '0 0 90px rgba(230, 106, 44, .2)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};
