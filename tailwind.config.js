/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        secondary: '#D4AF37',
      }
    },
  },
  plugins: [],
}
