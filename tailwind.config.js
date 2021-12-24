const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coolestGray: {
          50: "#E0E0E0",
          100: "#EDEEF0",
          200: "#393939",
          900: "#161616",
        },
        coolestBlue: {
          100: "#0F62FE",
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
