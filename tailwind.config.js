/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFBF8",
        ink: "#16231C",
        sage: {
          50: "#F1F6F3",
          100: "#E4EEE7",
          200: "#C7DDCE",
          300: "#A0C5AC",
          400: "#6E9C82",
          500: "#4C8267",
          600: "#3F6B52",
          700: "#325342",
          800: "#263F32",
          900: "#1A2C23",
        },
        amber: {
          50: "#FDF6E9",
          100: "#FAEACB",
          300: "#EFC066",
          500: "#D98E2B",
          600: "#B87420",
          700: "#8F5A18",
        },
        stone: {
          50: "#FAF9F6",
          100: "#F1EFE9",
          200: "#E2DED3",
          300: "#C9C3B3",
          400: "#9C9483",
          500: "#79715F",
          600: "#5C5546",
          700: "#453F34",
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
