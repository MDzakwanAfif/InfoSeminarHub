/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: ["./src/**/*.{js,}"],
  theme: {
    extend: {
      colors: {
        primary: "#f7941d", 
        secondary: "#242424", 
        accent: "#ffd700", 
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"], 
      },
    },
  },
  plugins: [],
};
