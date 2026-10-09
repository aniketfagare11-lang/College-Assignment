/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#1A202C',
        primary: '#6B46C1', // Purple
        accent: '#E53E3E',  // Red
      },
    },
  },
  plugins: [],
}
