/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        bgPrimary: '#FCA5A5',
        secondary: '#3B82F6',
        accent: {
          yellow: '#FBBF24',
          purple: '#E9D5FF',
        },
      },
    },
  },
  plugins: [],
}