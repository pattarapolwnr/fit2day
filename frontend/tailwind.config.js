/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-home": "url('/images/bg_homescreen.png')",
        "bg-ranking": "url('/images/bg-ranking.png')",
      },
      colors: {
        primary: "#6528F7",
        secondary: "#A076F9",
        textMain: "#1E1E1E",
        textSecondary: "#D9D9D9",
        notDoneBox: "#5F5F5F",
      },
    },
  },
  plugins: [],
};
