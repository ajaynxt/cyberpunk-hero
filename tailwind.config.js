/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Albert Sans"', 'sans-serif'],
      },
      colors: {
        f1: {
          dark: 'rgb(41,41,41)',
          yellow: 'rgb(237,180,11)',
        },
      },
    },
  },
  plugins: [],
}
