module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/portafolio/" : "/",
  pages: {
    index: {
      title: "Wilberto Pacheco Batista | Portafolio",
      entry: "./src/main.js",
    },
  },
  lintOnSave: false,
  devServer: {
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true,
        interval: 1000,
      },
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
