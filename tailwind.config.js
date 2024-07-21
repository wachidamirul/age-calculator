const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "selector",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xl": "1320px",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(50%)" },
          "50%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(50%)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
