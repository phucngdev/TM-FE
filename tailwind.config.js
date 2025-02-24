/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7b5eea",
        secondary: "#8799bf",
        redish: "#0d1627",
        purpleish: "#5b4c97",
        bluish: "#211944",
        darkblue: "#031544",
        border: "#3b465e",
        hover: "#000000e0",
      },
      fontSize: {
        s: "10px",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
