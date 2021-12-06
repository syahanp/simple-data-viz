const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      heading: ["Nunito", "sans-serif"],
      paragraph: ["Nunito Sans", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      pink: colors.pink,
      green: colors.green,
    },
    fontSize: {
      "size-12": "12px",
      "size-14": "14px",
      "size-16": "16px",
      "size-18": "18px",
      "size-20": "20px",
      "size-24": "24px",
      "size-32": "32px",
      "size-40": "40px",
      "size-44": "44px",
      "size-48": "48px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
