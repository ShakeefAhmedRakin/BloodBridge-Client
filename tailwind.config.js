/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#000000",
        background: "#fbfbfb",
        primary: "#d70427",
        secondary: "#2a2c41",
        accent: "#92c8f7",
        textDark: "#ffffff",
        backgroundDark: "#050505",
        primaryDark: "#fb284b",
        secondaryDark: "#bec0d5",
        accentDark: "#083e6d",
      },

      fontFamily: {
        heading: ["Karla"],
        text: ["Merriweather"],
      },
    },
  },
  plugins: [require("daisyui")],
};
