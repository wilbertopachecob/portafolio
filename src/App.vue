<template>
  <div id="app" itemscope itemtype="https://schema.org/Person">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">{{ $t('accessibility.skipToContent') }}</a>
    
    <!-- Navigation -->
    <Navigation />
    
    <!-- Main Content -->
    <main id="main-content" class="main-content" role="main">
      <!-- About Section -->
      <section id="about" class="section" role="region" aria-labelledby="about-section-heading">
        <About />
      </section>
      
      <!-- Experience Section -->
      <section id="experience" class="section" role="region" aria-labelledby="experience-section-heading">
        <div class="container">
          <div class="section-header">
            <h2 id="experience-section-heading" class="section-title">{{ $t('sections.experience.title') }}</h2>
            <p class="section-subtitle">{{ $t('sections.experience.subtitle') }}</p>
          </div>
          <Experience />
        </div>
      </section>
      
      <!-- Skills Section -->
      <section id="skills" class="section" role="region" aria-labelledby="skills-section-heading">
        <div class="container">
          <div class="section-header">
            <h2 id="skills-section-heading" class="section-title">{{ $t('sections.skills.title') }}</h2>
            <p class="section-subtitle">{{ $t('sections.skills.subtitle') }}</p>
          </div>
          <Skills />
        </div>
      </section>
      
      <!-- Education Section -->
      <section id="education" class="section" role="region" aria-labelledby="education-section-heading">
        <div class="container">
          <div class="section-header">
            <h2 id="education-section-heading" class="section-title">{{ $t('sections.education.title') }}</h2>
            <p class="section-subtitle">{{ $t('sections.education.subtitle') }}</p>
          </div>
          <Education />
        </div>
      </section>
      
      <!-- Languages Section -->
      <section id="languages" class="section" role="region" aria-labelledby="languages-section-heading">
        <div class="container">
          <div class="section-header">
            <h2 id="languages-section-heading" class="section-title">{{ $t('sections.languages.title') }}</h2>
            <p class="section-subtitle">{{ $t('sections.languages.subtitle') }}</p>
          </div>
          <Languages />
        </div>
      </section>
      
      <!-- Certifications Section -->
      <section id="certifications" class="section" role="region" aria-labelledby="certifications-section-heading">
        <div class="container">
          <div class="section-header">
            <h2 id="certifications-section-heading" class="section-title">{{ $t('sections.certifications.title') }}</h2>
            <p class="section-subtitle">{{ $t('sections.certifications.subtitle') }}</p>
          </div>
          <Certifications />
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} <span itemprop="name">Wilberto Pacheco Batista</span>. {{ $t('footer.copyright') }}</p>
          <p>{{ $t('footer.builtWith') }}</p>
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
import Languages from './components/Languages.vue'
import Certifications from './components/Certifications.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    About,
    Experience,
    Skills,
    Education,
    Languages,
    Certifications,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
  mounted() {
    // Set document title based on current locale
    this.updateDocumentTitle()
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  },
  methods: {
    updateDocumentTitle() {
      const title = this.$i18n.locale === 'es' 
        ? 'Wilberto Pacheco Batista | Ingeniero de Software'
        : 'Wilberto Pacheco Batista | Software Engineer'
      document.title = title
    }
  },
  watch: {
    '$i18n.locale'() {
      this.updateDocumentTitle()
    }
  }
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
