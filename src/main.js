// Main application entry point
import { createApp } from 'vue'
import App from './App.vue'

// Import i18n configuration
import i18n from './i18n'

// Import application configuration
import { APP_CONFIG } from './config/constants'
import { deferWhenIdle } from './utils/defer'

// Inline, tree-shaken SVG icon wrapper (replaces the @fortawesome runtime)
import AppIcon from './components/AppIcon.vue'

// Create and configure Vue app
const app = createApp(App)

// Use i18n
app.use(i18n)

// Register the inline SVG icon component globally
app.component('app-icon', AppIcon)

// Mount the application
app.mount('#app')

// Register Service Worker for offline functionality
// Only register in production to avoid interfering with Vite's dev server
// Defer registration using requestIdleCallback to avoid blocking main thread
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const registerServiceWorker = () => {
    const { PROD_PATH: swPath, PROD_SCOPE: swScope } = APP_CONFIG.SERVICE_WORKER
    navigator.serviceWorker.register(swPath, { scope: swScope })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope)

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm('New version available! Refresh to update?')) {
                window.location.reload()
              }
            }
          })
        })
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error)
      })
  }

  window.addEventListener('load', () => {
    deferWhenIdle(registerServiceWorker, 2000)
  })

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Message from service worker:', event.data)
  })
} else if ('serviceWorker' in navigator && import.meta.env.DEV) {
  const unregisterServiceWorkers = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('Service Worker unregistered for development mode')
        })
      }
    })
  }

  deferWhenIdle(unregisterServiceWorkers, 1000)
}
