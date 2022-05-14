const colors = require("tailwindcss/colors");
module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      green: colors.green,
      orange: colors.orange,
      indigo: colors.indigo,
      pink: colors.pink,
      purple: colors.purple,

      "style-purple": {
        1: "#9B99FF",
        2: "#5551FF",
        3: "#211FCC",
        4: "#201F66",
      },
    },
    extend: {
      backgroundImage: {
        logo: "url('./assets/images/salon.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
