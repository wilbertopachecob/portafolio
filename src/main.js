// Main application entry point
import { createApp } from 'vue'
import App from './App.vue'

// Import i18n configuration
import i18n from './i18n'

// Import application configuration
import { APP_CONFIG } from './config/constants'

// FontAwesome configuration
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faEnvelope, 
  faMapMarkerAlt, 
  faBriefcase, 
  faCode, 
  faCalendarAlt,
  faArrowAltCircleUp,
  faServer,
  faDatabase,
  faSearch,
  faCog,
  faCheckCircle,
  faVial,
  faPlug,
  faSun,
  faMoon,
  faGlobe,
  faDownload
} from '@fortawesome/free-solid-svg-icons'
import { 
  faLinkedin, 
  faGithub, 
  faXTwitter,
  faJs,
  faPhp,
  faHtml5,
  faCss3Alt,
  faVuejs,
  faReact,
  faAngular,
  faLaravel,
  faNode,
  faBootstrap,
  faGit,
  faAws,
  faDocker,
  faLinux,
  faWordpress,
  faDrupal
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

// Add FontAwesome icons to the library
// Note: We don't import the full CSS file - only SVG icons are used via tree-shaking
library.add(
  faEnvelope, 
  faMapMarkerAlt, 
  faBriefcase, 
  faCode, 
  faCalendarAlt,
  faArrowAltCircleUp,
  faServer,
  faDatabase,
  faSearch,
  faCog,
  faCheckCircle,
  faVial,
  faPlug,
  faSun,
  faMoon,
  faGlobe,
  faDownload,
  faLinkedin, 
  faGithub, 
  faXTwitter,
  faJs,
  faPhp,
  faHtml5,
  faCss3Alt,
  faVuejs,
  faReact,
  faAngular,
  faLaravel,
  faNode,
  faBootstrap,
  faGit,
  faAws,
  faDocker,
  faLinux,
  faWordpress,
  faDrupal
)

// Create and configure Vue app
const app = createApp(App)

// Use i18n
app.use(i18n)

// Register FontAwesome components globally
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)

// Mount the application
app.mount('#app')

// Register Service Worker for offline functionality
// Only register in production to avoid interfering with Vite's dev server
// Defer registration using requestIdleCallback to avoid blocking main thread
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const registerServiceWorker = () => {
    // Use dynamic path based on environment
    const swPath = APP_CONFIG.SERVICE_WORKER.PROD_PATH;
    const swScope = APP_CONFIG.SERVICE_WORKER.PROD_SCOPE;
    navigator.serviceWorker.register(swPath, { scope: swScope })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              if (confirm('New version available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  };
  
  // Use requestIdleCallback if available, otherwise defer with setTimeout
  if ('requestIdleCallback' in window) {
    window.addEventListener('load', () => {
      requestIdleCallback(registerServiceWorker, { timeout: 2000 });
    });
  } else {
    window.addEventListener('load', () => {
      setTimeout(registerServiceWorker, 2000);
    });
  }
  
  // Listen for service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Message from service worker:', event.data);
  });
} else if ('serviceWorker' in navigator && import.meta.env.DEV) {
  // In development, unregister any existing service workers to prevent conflicts
  // Defer this as well to avoid blocking
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then(() => {
            console.log('Service Worker unregistered for development mode');
          });
        }
      });
    }, { timeout: 1000 });
  } else {
    setTimeout(() => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then(() => {
            console.log('Service Worker unregistered for development mode');
          });
        }
      });
    }, 1000);
  }
}
