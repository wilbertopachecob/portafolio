<template>
  <div id="app">
    <!-- Modern Navigation -->
    <Navigation />
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero/About Section -->
      <About />
      
      <!-- Experience Section -->
      <section class="section" id="experience">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Work Experience</h2>
            <p class="section-subtitle">
              My professional journey in software development and engineering
            </p>
          </div>
          <Experience />
        </div>
      </section>
      
      <!-- Skills Section -->
      <section class="section" id="skills">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Skills & Technologies</h2>
            <p class="section-subtitle">
              Technical expertise and tools I use to build amazing applications
            </p>
          </div>
          <Skills />
        </div>
      </section>
      
      <!-- Education Section -->
      <section class="section" id="education">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Education</h2>
            <p class="section-subtitle">
              My academic background and continuous learning journey
            </p>
          </div>
          <Education />
        </div>
      </section>
      
      <!-- Certifications Section -->
      <section class="section" id="certifications">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Certifications</h2>
            <p class="section-subtitle">
              Professional certifications and specialized training
            </p>
          </div>
          <Certifications />
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} Wilberto Pacheco Batista. All rights reserved.</p>
          <p>Built with Vue.js and modern web technologies</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import About from './components/About.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import Education from './components/Education.vue'
import Certifications from './components/Certifications.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    About,
    Experience,
    Skills,
    Education,
    Certifications,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
  mounted() {
    // Set document title
    document.title = 'Wilberto Pacheco Batista | Software Engineer'
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  },
}
</script>

<style>
/* Import Bootstrap CSS */
@import 'bootstrap/dist/css/bootstrap.min.css';

/* Import FontAwesome CSS */
@import '@fortawesome/fontawesome-free/css/all.css';

/* Import custom CSS */
@import './assets/css/main.css';

/* App-specific styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 64px; /* Account for fixed navbar */
}

/* Ensure sections have proper spacing */
.section {
  padding: var(--space-3xl) 0;
}

.section:first-of-type {
  padding-top: 0;
}

/* Container max-width for better readability */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    padding-top: 56px; /* Smaller navbar height on mobile */
  }
  
  .section {
    padding: var(--space-2xl) 0;
  }
  
  .container {
    padding: 0 var(--space-md);
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .navbar,
  .footer {
    display: none;
  }
  
  .main-content {
    padding-top: 0;
  }
  
  .section {
    page-break-inside: avoid;
    padding: var(--space-lg) 0;
  }
}
</style>
