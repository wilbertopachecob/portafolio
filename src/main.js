// Main application entry point
import { createApp } from 'vue'
import App from './App.vue'

// Import i18n configuration
import i18n from './i18n'

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
  faMoon
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

// Import FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.css'

// Add FontAwesome icons to the library
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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use dynamic path based on environment
    const swPath = process.env.NODE_ENV === 'production' ? '/portafolio/sw.js' : '/sw.js';
    const swScope = process.env.NODE_ENV === 'production' ? '/portafolio/' : '/';
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
  });
  
  // Listen for service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Message from service worker:', event.data);
  });
}
