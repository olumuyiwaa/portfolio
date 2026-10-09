/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#101814",
        sage: {
          50: "#EEF5F0",
          100: "#DCEBE1",
          200: "#BCD8C6",
          300: "#8DBFA2",
          400: "#4E9E78",
          500: "#1F8A62",
          600: "#137352",
          700: "#0E5C42",
          800: "#0B4733",
          900: "#082F23",
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
          50: "#FAF9F6",
          100: "#F1EFE9",
          200: "#E2DED3",
          300: "#C9C3B3",
          400: "#9A9484",
          500: "#6B6455",
          600: "#54503F",
          700: "#3D392D",
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
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "32px",
      },
    },
  },
  plugins: [],
};
