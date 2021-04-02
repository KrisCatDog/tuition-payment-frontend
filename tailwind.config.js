const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Quicksand", ...defaultTheme.fontFamily.sans],
      mulish: ["Mulish", ...defaultTheme.fontFamily.sans],
      dm: ["DM Sans", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
