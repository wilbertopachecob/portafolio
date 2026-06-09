<template>
  <div id="app" itemscope itemtype="https://schema.org/Person">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link" @click="focusMainContent">{{ $t('accessibility.skipToContent') }}</a>
    
    <!-- Navigation -->
    <Navigation />
    
    <!-- Main Content -->
    <main id="main-content" class="main-content" role="main" tabindex="-1">
      <section
        v-for="section in pageSections"
        :key="section.id"
        :id="section.id"
        :class="getSectionClasses(section)"
        :role="section.showHeader ? 'region' : undefined"
        :aria-labelledby="section.showHeader ? `${section.id}-section-heading` : undefined"
      >
        <component :is="section.component" v-if="!section.showHeader" />
        <div v-else class="container">
          <div class="section-header">
            <p v-if="$te(`sections.${section.id}.eyebrow`)" class="section-eyebrow">
              {{ $t(`sections.${section.id}.eyebrow`) }}
            </p>
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
          <p class="footer-line">&copy; {{ currentYear }} Wilberto Pacheco Batista. {{ $t('footer.copyright') }}</p>
          <p class="footer-line footer-line--right">{{ $t('footer.builtWith') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import { getSectionClasses, PAGE_SECTIONS } from './config/sections'
import { resolveClientLocale } from './i18n'

export default {
  name: 'App',
  components: {
    Navigation,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      pageSections: PAGE_SECTIONS,
    }
  },
  mounted() {
    // The app is prerendered/hydrated in the default locale; switch to the
    // visitor's preferred locale only after hydration to avoid markup mismatch.
    this.applyClientLocale()
    this.syncDocumentLanguage()
    this.updateDocumentTitle()
  },
  methods: {
    getSectionClasses,
    applyClientLocale() {
      const locale = resolveClientLocale()
      if (locale !== this.$i18n.locale) {
        this.$i18n.locale = locale
      }
    },
    syncDocumentLanguage() {
      document.documentElement.lang = this.$i18n.locale
    },
    updateDocumentTitle() {
      // Keep full name + role for SEO when people search "Wilberto Pacheco Batista"
      const title = this.$i18n.locale === 'es' 
        ? 'Wilberto Pacheco Batista - Software Engineer de Producto y Modernización'
        : 'Wilberto Pacheco Batista - Product-Minded Software Engineer'
      document.title = title
    },
    focusMainContent() {
      this.$nextTick(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true })
      })
    }
  },
  watch: {
    '$i18n.locale'() {
      this.syncDocumentLanguage()
      this.updateDocumentTitle()
    }
  }
}
</script>

<style>
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
  padding-top: 64px;
}

.footer-line {
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    padding-top: 56px;
  }

  .container {
    padding: 0 var(--space-md);
  }

  .footer-line--right {
    text-align: left;
  }
}

/* Smooth scrolling for anchor links — disabled when the user prefers reduced motion */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
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
}
</style>
