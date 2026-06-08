import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portafolio/',
  // Define Vue feature flags so they resolve during the vite-ssg server render
  // (esbuild inlines these, avoiding "__VUE_PROD_DEVTOOLS__ is not defined").
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
  // Bundle vue-i18n into the server render so the Vue feature-flag defines above
  // are inlined; otherwise it stays externalized and references them at runtime.
  ssr: {
    noExternal: ['vue-i18n'],
  },
  plugins: [
    vue(),
    // Inline, tree-shaken SVG icons (replaces the @fortawesome runtime).
    Icons({ compiler: 'vue3', autoInstall: false }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Target modern browsers (ES2020+) to reduce legacy JavaScript
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for Vue
          if (id.includes('node_modules/vue')) {
            return 'vendor';
          }
          // Other node_modules go to vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|gif|svg)$/)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          // CSS files get their own directory for better caching
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Minify with terser for better compression and console removal
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
})
