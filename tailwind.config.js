/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Museo Sans', 'sans-serif'],
        serif: ['Museo Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
