/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A2518',
        'brand-green': '#009F4D',
        'brand-light-green': '#E8F5EE',
        'brand-blue': '#0070F3',
      }
    },
  },
  plugins: [],
}
