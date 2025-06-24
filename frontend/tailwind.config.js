/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bank-blue': '#1e40af',
        'bank-green': '#059669',
        'bank-red': '#dc2626',
      }
    },
  },
  plugins: [],
}