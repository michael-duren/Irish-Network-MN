/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { "secondary-color": "#ffffff19" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
