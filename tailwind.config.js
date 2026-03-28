/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-cyan': '#E0FBFC',
        'light-cyan-alt': '#D4F5F7',
        'jet-black': '#293241',
        'dusk-blue': '#3D5A80',
        'powder-blue': '#98C1D9',
        'burnt-peach': '#EE6C4D',
      },
      fontFamily: {
        'sans': ['Barlow', 'sans-serif'],
        'condensed': ['Barlow Condensed', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.01em',
        'widest-xl': '0.2em',
      }
    },
  },
  plugins: [],
}