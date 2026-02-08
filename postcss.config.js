const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: [
        './index.html',
        './src/**/*.vue',
        './src/**/*.js',
        './src/**/*.ts',
      ],
      // Safelist patterns to preserve certain classes
      safelist: {
        // Preserve all classes that might be dynamically added
        standard: [
          /^nav-/,
          /^mobile-/,
          /^theme-/,
          /^sr-only/,
          /^skip-link/,
          /^active$/,
          /^show$/,
          /^fade$/,
          /^collapse$/,
          /data-theme/,
        ],
        // Preserve classes with specific patterns
        deep: [/^navbar/, /^container/, /^section/],
        // Preserve classes used in attributes
        greedy: [/^is-/, /^has-/],
      },
      // CSS to process
      css: ['./src/**/*.css'],
      // Font face rules should be preserved
      fontFace: true,
      // Keyframes should be preserved
      keyframes: true,
    }),
  ],
}
