module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/portafolio/" : "/",
  pages: {
    index: {
      title: "Wilberto Pacheco Batista | Portafolio",
      entry: "./src/main.js",
    },
  },
  lintOnSave: false,
};
