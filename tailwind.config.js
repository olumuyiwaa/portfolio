// Theme colours are CSS variables (see globals.css) so light/dark can swap them.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: v("paper"),
        ink: v("ink"),
        night: "#101814",
        panel: v("panel"),
        accent: v("accent"),
        hover: v("hover"),
        sage: {
          50: v("sage-50"),
          100: v("sage-100"),
          200: v("sage-200"),
          300: "#8DBFA2",
          400: "#4E9E78",
          500: "#1F8A62",
          600: "#137352",
          700: "#0E5C42",
          800: "#0B4733",
          900: v("sage-900"),
        },
        amber: {
          50: "#FFF4E5",
          100: "#FFE3BD",
          300: "#FFC46B",
          500: "#F29B1D",
          600: "#D17F0B",
          700: "#A15F08",
        },
        stone: {
          50: v("stone-50"),
          100: v("stone-100"),
          200: v("stone-200"),
          300: v("stone-300"),
          400: v("stone-400"),
          500: v("stone-500"),
          600: v("stone-600"),
          700: v("stone-700"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1180px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "22px",
      },
    },
  },
  plugins: [],
};
