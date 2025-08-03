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
