<template>
  <div id="app" itemscope itemtype="https://schema.org/Person">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">{{ $t('accessibility.skipToContent') }}</a>
    
    <!-- Navigation -->
    <Navigation />
    
    <!-- Main Content -->
    <main id="main-content" class="main-content" role="main">
      <section
        v-for="section in pageSections"
        :key="section.id"
        :id="section.id"
        class="section"
        role="region"
        :aria-labelledby="section.showHeader ? `${section.id}-section-heading` : undefined"
      >
        <component :is="section.component" v-if="!section.showHeader" />
        <div v-else class="container">
          <div class="section-header">
            <h2 :id="`${section.id}-section-heading`" class="section-title">
              {{ $t(`sections.${section.id}.title`) }}
            </h2>
            <p class="section-subtitle">{{ $t(`sections.${section.id}.subtitle`) }}</p>
          </div>
          <component :is="section.component" />
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} Wilberto Pacheco Batista. {{ $t('footer.copyright') }}</p>
          <p>{{ $t('footer.builtWith') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import Navigation from './components/Navigation.vue'
import About from './components/About.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import Education from './components/Education.vue'
import Languages from './components/Languages.vue'
import Certifications from './components/Certifications.vue'
import Portfolio from './components/Portfolio.vue'

const PAGE_SECTIONS = [
  { id: 'about', component: markRaw(About), showHeader: false },
  { id: 'experience', component: markRaw(Experience), showHeader: true },
  { id: 'skills', component: markRaw(Skills), showHeader: true },
  { id: 'portfolio', component: markRaw(Portfolio), showHeader: true },
  { id: 'education', component: markRaw(Education), showHeader: true },
  { id: 'languages', component: markRaw(Languages), showHeader: true },
  { id: 'certifications', component: markRaw(Certifications), showHeader: true },
]

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
    Portfolio,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      pageSections: PAGE_SECTIONS,
    }
  },
  mounted() {
    this.updateDocumentTitle()
  },
  methods: {
    updateDocumentTitle() {
      // Keep full name + role for SEO when people search "Wilberto Pacheco Batista"
      const title = this.$i18n.locale === 'es' 
        ? 'Wilberto Pacheco Batista - Ingeniero de Software y Desarrollador Full Stack'
        : 'Wilberto Pacheco Batista - Software Engineer & Full Stack Developer'
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

/* Import custom CSS */
@import './assets/css/main.css';
/* Note: FontAwesome CSS removed - using SVG icons only via tree-shaking */

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
  scroll-margin-top: 64px; /* fixed navbar offset for anchor / programmatic scroll */
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
    scroll-margin-top: 56px;
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
