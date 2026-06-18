/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonCyan: '#00f3ff',
        matteBlack: '#121212',
        glassBg: 'rgba(18, 18, 18, 0.7)',
      }
    },
  },
  plugins: [],
}
