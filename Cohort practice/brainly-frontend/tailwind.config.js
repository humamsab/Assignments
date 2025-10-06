/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      colors:{
        gray: {
          50:  "rgba(255, 255, 255, 0.5)",
          100: "#ffffff",  
          200: "#f9fbfc",
          600: "#93969c"
        },
        purple: {
          200: "#e0e5fd",
          500: "#7566de",
          600: "#5146e3",

        }
      }
    },
  },
  plugins: [],
}

