module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/portafolio/" : "/",
  pages: {
    index: {
      title: "Wilberto Pacheco Batista | Software Engineer & Full Stack Developer",
      entry: "./src/main.js",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
      meta: {
        description: "Professional portfolio of Wilberto Pacheco Batista, a skilled Software Engineer and Full Stack Web Developer specializing in Vue.js, React, Node.js, and modern web technologies.",
        keywords: "software engineer, web developer, full stack developer, Vue.js, React, Node.js, JavaScript, TypeScript, portfolio, frontend, backend, AWS, cloud computing",
        author: "Wilberto Pacheco Batista",
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        "og:title": "Wilberto Pacheco Batista - Software Engineer & Full Stack Developer",
        "og:description": "Professional portfolio showcasing expertise in Vue.js, React, Node.js, and modern web technologies. Full stack development with cloud computing experience.",
        "og:type": "website",
        "og:url": "https://wilbertopachecob.github.io/portafolio/",
        "twitter:card": "summary_large_image",
        "twitter:title": "Wilberto Pacheco Batista - Software Engineer & Full Stack Developer",
        "twitter:description": "Professional portfolio showcasing expertise in Vue.js, React, Node.js, and modern web technologies. Full stack development with cloud computing experience."
      }
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
  // SEO and Performance optimizations
  chainWebpack: config => {
    // Enable source maps for better debugging
    config.devtool('source-map');
    
    // Optimize CSS splitting
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: 5,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    });
  },
  // PWA configuration
  pwa: {
    name: 'Wilberto Pacheco Batista Portfolio',
    shortName: 'WP Portfolio',
    themeColor: '#007bff',
    backgroundColor: '#ffffff',
    display: 'standalone',
    orientation: 'portrait-primary',
    scope: '/portafolio/',
    startUrl: '/portafolio/',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
};
