/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./renderer.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
