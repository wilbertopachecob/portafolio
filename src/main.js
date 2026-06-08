// Main application entry point (vite-ssg single-page: static HTML is rendered
// at build time, then hydrated on the client).
import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'

// Import i18n configuration
import i18n from './i18n'

// Import application configuration
import { APP_CONFIG } from './config/constants'
import { deferWhenIdle } from './utils/defer'

// Inline, tree-shaken SVG icon wrapper (replaces the @fortawesome runtime)
import AppIcon from './components/AppIcon.vue'

export const createApp = ViteSSG(App, ({ app, isClient }) => {
  app.use(i18n)
  app.component('app-icon', AppIcon)

  // Everything below touches browser APIs and only runs in the client.
  if (isClient) {
    setupServiceWorker()
  }
})

/**
 * Registers the service worker in production and unregisters stale workers in
 * development. Browser-only; never executed during SSR/prerender.
 */
function setupServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return
  }

  if (import.meta.env.PROD) {
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
  } else if (import.meta.env.DEV) {
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
}
