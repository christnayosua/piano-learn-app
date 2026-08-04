/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        deep: {
          black: "#0A0A0F",
          card: "#12121A",
          surface: "#1A1A25",
          border: "#2A2A3A",
        },
        neon: {
          cyan: "#00E5FF",
          cyanDim: "#00B8D4",
          purple: "#B388FF",
          purpleDim: "#9C6AFF",
          pink: "#FF6BCD",
        },
        text: {
          primary: "#EAEAF0",
          secondary: "#8888A0",
          muted: "#555570",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
