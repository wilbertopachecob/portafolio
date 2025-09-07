import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portafolio/',
  plugins: [
    vue(),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          fontawesome: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|gif|svg)$/)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
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
