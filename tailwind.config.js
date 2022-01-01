const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coolestGray: {
          10: "#E5E5E5",
          50: "#E0E0E0",
          100: "#EDEEF0",
          200: "#393939",
          300: "#F4F4F4",
          900: "#161616",
        },
        coolestBlue: {
          100: "#0F62FE",
          200: "#EDF5FF",
          300: "#0F62FE",
        },
      },
      fontFamily: {
        display: ["IBM Plex Sans"],
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
