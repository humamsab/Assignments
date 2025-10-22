/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          700: "#01295c",
          800: "#19406b"
        },
        green: {
          500: "#3be2cb"
        },
        gray: {
          200: "#7f93ac",
          300: "#8491a4"
        }
      }
    },
  },
  plugins: [],
}

