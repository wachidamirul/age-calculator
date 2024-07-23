const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        "permanent-marker": [
          '"Permanent Marker", cursive',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      screens: {
        "2xl": "1320px",
      },
      keyframes: {
        cloudMoveLeft: {
          "0%": { left: "-10%" },
          "100%": { left: "120%" },
        },
        cloudMoveRight: {
          "0%": { right: "-10%" },
          "100%": { right: "130%" },
        },
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
        cloudLeft: "cloudMoveLeft 15s linear infinite",
        cloudRight: "cloudMoveRight 20s linear infinite",
        slideUp: "slideUp 0.5s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
