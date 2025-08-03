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
  faArrowAltCircleUp
} from '@fortawesome/free-solid-svg-icons'
import { 
  faLinkedin, 
  faGithub, 
  faXTwitter 
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
  faLinkedin, 
  faGithub, 
  faXTwitter
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
