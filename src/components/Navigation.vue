<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="navbar-container">
      <!-- Mobile Menu Toggle (Left side on mobile) -->
      <button 
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :class="{ 'active': isMobileMenuOpen }"
        :aria-label="isMobileMenuOpen ? $t('accessibility.closeMenu') : $t('accessibility.openMenu')"
        :aria-expanded="isMobileMenuOpen"
        :aria-controls="'mobile-menu'"
      >
        <span class="sr-only">{{ isMobileMenuOpen ? $t('accessibility.closeMenu') : $t('accessibility.openMenu') }}</span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <!-- Brand/Logo -->
      <a href="#about" class="navbar-brand" aria-label="Go to about section">
        Wilberto Pacheco
      </a>
      
      <!-- Navigation Links -->
      <ul class="navbar-nav" role="menubar">
        <li class="nav-item" role="none">
          <a href="#about" class="nav-link" :class="{ 'active': activeSection === 'about' }" @click="scrollToSection('about')" role="menuitem" :aria-label="$t('nav.about')">
            {{ $t('nav.about') }}
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="#experience" class="nav-link" :class="{ 'active': activeSection === 'experience' }" @click="scrollToSection('experience')" role="menuitem" :aria-label="$t('nav.experience')">
            {{ $t('nav.experience') }}
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="#skills" class="nav-link" :class="{ 'active': activeSection === 'skills' }" @click="scrollToSection('skills')" role="menuitem" :aria-label="$t('nav.skills')">
            {{ $t('nav.skills') }}
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="#education" class="nav-link" :class="{ 'active': activeSection === 'education' }" @click="scrollToSection('education')" role="menuitem" :aria-label="$t('nav.education')">
            {{ $t('nav.education') }}
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="#languages" class="nav-link" :class="{ 'active': activeSection === 'languages' }" @click="scrollToSection('languages')" role="menuitem" :aria-label="$t('nav.languages')">
            {{ $t('nav.languages') }}
          </a>
        </li>
        <li class="nav-item" role="none">
          <a href="#certifications" class="nav-link" :class="{ 'active': activeSection === 'certifications' }" @click="scrollToSection('certifications')" role="menuitem" :aria-label="$t('nav.certifications')">
            {{ $t('nav.certifications') }}
          </a>
        </li>
      </ul>
      
      <!-- Right side controls -->
      <div class="navbar-controls">
        <!-- Language Toggle -->
        <LanguageToggle />
        
        <!-- Dark Mode Toggle -->
        <button 
          class="theme-toggle"
          @click="toggleTheme"
          :title="isDarkMode ? $t('accessibility.lightMode') : $t('accessibility.darkMode')"
          :aria-label="isDarkMode ? $t('accessibility.lightMode') : $t('accessibility.darkMode')"
          role="switch"
          :aria-checked="isDarkMode"
        >
          <font-awesome-icon 
            :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" 
            :aria-hidden="true"
          />
        </button>
      </div>
    </div>
    
    <!--
      Mobile Menu — teleported to <body> so it escapes the navbar's
      backdrop-filter, which would otherwise become the containing block for
      these position:fixed elements (collapsing the panel and letting page
      content bleed through). Rendered as an opaque slide-in drawer + scrim.
    -->
    <Teleport to="body">
      <Transition name="mm-fade">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-menu-backdrop"
          @click="closeMobileMenu"
          aria-hidden="true"
        ></div>
      </Transition>

      <Transition name="mm-slide">
        <aside
          v-if="isMobileMenuOpen"
          class="mobile-menu-drawer"
          id="mobile-menu"
          role="menu"
          :aria-label="$t('accessibility.openMenu')"
        >
          <div class="mm-header">
            <span class="mm-title">Wilberto Pacheco</span>
            <button
              class="mm-close"
              @click="closeMobileMenu"
              :aria-label="$t('accessibility.closeMenu')"
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <nav class="mm-nav">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="'#' + item.id"
              class="mm-link"
              :class="{ 'active': activeSection === item.id }"
              role="menuitem"
              :aria-label="$t('nav.' + item.id)"
              @click.prevent="goToSection(item.id)"
            >
              <span class="mm-icon" aria-hidden="true">
                <font-awesome-icon :icon="item.icon" />
              </span>
              <span class="mm-label">{{ $t('nav.' + item.id) }}</span>
              <span class="mm-chevron" aria-hidden="true">›</span>
            </a>
          </nav>
        </aside>
      </Transition>
    </Teleport>
  </nav>
</template>

<script>
import LanguageToggle from './LanguageToggle.vue'

export default {
  name: "Navigation",
  components: {
    LanguageToggle
  },
  data() {
    return {
      isScrolled: false,
      isDarkMode: false,
      isMobileMenuOpen: false,
      activeSection: 'about',
      scrollTimeout: null,
      rafId: null,
      sectionPositions: null, // Cache section positions to avoid forced reflows
      // Drawer nav items (icon + i18n key share the same id)
      navItems: [
        { id: 'about', icon: ['fas', 'user'] },
        { id: 'experience', icon: ['fas', 'briefcase'] },
        { id: 'skills', icon: ['fas', 'code'] },
        { id: 'education', icon: ['fas', 'graduation-cap'] },
        { id: 'languages', icon: ['fas', 'globe'] },
        { id: 'certifications', icon: ['fas', 'certificate'] },
      ],
    };
  },
  watch: {
    // Lock background scroll while the drawer is open
    isMobileMenuOpen(open) {
      document.body.style.overflow = open ? 'hidden' : '';
    },
  },
  mounted() {
    // Check for saved theme preference or default to light mode
    this.isDarkMode = localStorage.getItem('theme') === 'dark' || 
                     (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.applyTheme();
    
    // Add scroll listener
    window.addEventListener('scroll', this.handleScroll);
    
    // Add click listener to close mobile menu when clicking outside
    document.addEventListener('click', this.handleClickOutside);
    
    // Add keyboard event listeners
    document.addEventListener('keydown', this.handleKeydown);
    
    // Initialize active section
    this.updateActiveSection();
    
    // Re-cache section positions on resize to handle layout changes
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Make sure scroll is restored if the component unmounts while open
    document.body.style.overflow = '';
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeydown);
    
    // Clean up timeout and animation frame
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
      
      // Use requestAnimationFrame to batch DOM reads and avoid forced reflows
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      
      this.rafId = requestAnimationFrame(() => {
        this.updateActiveSection();
        this.rafId = null;
      });
    },
    
    updateActiveSection() {
      const sections = ['about', 'experience', 'skills', 'education', 'languages', 'certifications'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height and some buffer
      
      // Cache section positions on first call or if cache is invalid
      if (!this.sectionPositions) {
        this.cacheSectionPositions();
      }
      
      // Find the section that is currently in view using cached positions
      let currentSection = 'about';
      
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        const position = this.sectionPositions[sectionId];
        
        if (position && scrollPosition >= position.top && scrollPosition < position.top + position.height) {
          currentSection = sectionId;
          break;
        }
      }
      
      // If we're at the very top, default to about section
      if (scrollPosition < 200) {
        currentSection = 'about';
      }
      
      this.activeSection = currentSection;
    },
    
    cacheSectionPositions() {
      // Batch all DOM reads together to avoid forced reflows
      const sections = ['about', 'experience', 'skills', 'education', 'languages', 'certifications'];
      this.sectionPositions = {};
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          // Read all layout properties together
          this.sectionPositions[sections[i]] = {
            top: section.offsetTop,
            height: section.offsetHeight,
          };
        }
      }
    },
    
    getNavbarOffset() {
      const navbar = document.querySelector('.navbar');
      return navbar ? navbar.offsetHeight : 64;
    },

    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const offset = this.getNavbarOffset();
      // Prefer the visible section title over the full section block (avoids landing mid-section)
      const scrollTarget =
        section.querySelector('.section-header, .hero-content, h1, h2') || section;
      const top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });

      // Move focus for screen readers without triggering a second scroll on mobile
      const focusTarget =
        section.querySelector('[id$="-heading"], h1, h2') || section;
      if (!focusTarget.hasAttribute('tabindex')) {
        focusTarget.setAttribute('tabindex', '-1');
      }
      const focusDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500;
      setTimeout(() => {
        focusTarget.focus({ preventScroll: true });
      }, focusDelay);

      this.sectionPositions = null;
    },
    
    handleResize() {
      // Invalidate cache on resize to recalculate positions
      this.sectionPositions = null;
      // Debounce resize handler
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.cacheSectionPositions();
        this.updateActiveSection();
      }, 150);
    },
    
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    },
    
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    },
    
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },

    // Drawer link: close the drawer first, then scroll once layout is stable
    goToSection(sectionId) {
      this.closeMobileMenu();
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.scrollToSection(sectionId);
        });
      });
    },

    handleClickOutside(event) {
      if (!this.isMobileMenuOpen) return;
      // The drawer is teleported to <body>, so it is NOT inside .navbar.
      // Close only when the click is outside both the drawer and the toggle.
      const insideToggle = event.target.closest('.mobile-menu-toggle');
      const insideDrawer = event.target.closest('.mobile-menu-drawer');
      if (!insideToggle && !insideDrawer) {
        this.closeMobileMenu();
      }
    },
    
    handleKeydown(event) {
      // Close mobile menu on Escape key
      if (event.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
        // Focus the mobile menu toggle button
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        if (toggleButton) {
          toggleButton.focus();
        }
      }
      
      // Toggle theme on Ctrl/Cmd + T
      if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        this.toggleTheme();
      }
    },
  },
};
</script>

<style scoped>
/* Navigation Styles */
.navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color) !important;
  z-index: 1000 !important;
  transition: all var(--transition-normal);
  height: 64px !important;
  width: 100% !important;
}

[data-theme="dark"] .navbar {
  background: rgba(15, 23, 42, 0.9) !important;
  border-bottom-color: var(--border-color) !important;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: var(--shadow-md) !important;
}

[data-theme="dark"] .navbar-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
}

.navbar-container {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 100% !important;
  padding: 0 var(--space-lg) !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  width: 100% !important;
}

.navbar-controls {
  display: flex !important;
  align-items: center !important;
  gap: var(--space-sm) !important;
}

.navbar-brand {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: var(--text-primary) !important;
  text-decoration: none !important;
  transition: color var(--transition-fast) !important;
  white-space: nowrap !important;
}

[data-theme="dark"] .navbar-brand {
  color: var(--text-primary) !important;
}

.navbar-brand:hover {
  color: var(--primary-color) !important;
}

.navbar-nav {
  display: flex !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: var(--space-lg) !important;
  align-items: center !important;
  flex-direction: row !important;
}

.nav-item {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.nav-link {
  color: var(--text-secondary) !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  transition: color var(--transition-fast) !important;
  position: relative !important;
  padding: var(--space-sm) 0 !important;
  white-space: nowrap !important;
  display: block !important;
}

[data-theme="dark"] .nav-link {
  color: var(--text-secondary) !important;
}

.nav-link:hover {
  color: var(--primary-color) !important;
}

.nav-link::after {
  content: '' !important;
  position: absolute !important;
  bottom: -4px !important;
  left: 0 !important;
  width: 0 !important;
  height: 2px !important;
  background: var(--primary-color) !important;
  transition: width var(--transition-normal) !important;
}

.nav-link:hover::after {
  width: 100% !important;
}

/* Active Navigation Link Styles */
.nav-link.active {
  color: var(--primary-color) !important;
}

[data-theme="dark"] .nav-link.active {
  color: var(--primary-color) !important;
}

.nav-link.active::after {
  width: 100% !important;
}



/* Theme Toggle */
.theme-toggle {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  background: var(--bg-secondary) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--radius-md) !important;
  color: var(--text-secondary) !important;
  cursor: pointer !important;
  transition: all var(--transition-normal) !important;
  margin-left: var(--radius-lg) !important;
}

[data-theme="dark"] .theme-toggle {
  background: var(--bg-secondary) !important;
  border-color: var(--border-color) !important;
  color: var(--text-secondary) !important;
}

.theme-toggle:hover {
  background: var(--primary-color) !important;
  color: white !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--shadow-md) !important;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none !important;
  flex-direction: column !important;
  justify-content: space-around !important;
  width: 28px !important;
  height: 28px !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 0 !important;
  z-index: 10 !important;
}

.mobile-menu-toggle span {
  width: 100% !important;
  height: 2px !important;
  background: var(--text-primary) !important;
  border-radius: 1px !important;
  transition: all var(--transition-normal) !important;
  transform-origin: center !important;
}

[data-theme="dark"] .mobile-menu-toggle span {
  background: var(--text-primary) !important;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px) !important;
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0 !important;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px) !important;
}

/* ============================================================
   Mobile Menu — Slide-in Drawer (teleported to <body>)
   ============================================================ */

/* Scrim behind the drawer */
.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1100;
}

/* The drawer panel itself */
.mobile-menu-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(86vw, 360px);
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  box-shadow: 8px 0 40px rgba(0, 0, 0, 0.28);
  z-index: 1101;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

[data-theme="dark"] .mobile-menu-drawer {
  box-shadow: 8px 0 48px rgba(0, 0, 0, 0.55);
}

/* Drawer header */
.mm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.mm-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.mm-close {
  position: relative;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.mm-close:hover {
  border-color: var(--primary-color);
  background: var(--bg-tertiary);
}

.mm-close span {
  position: absolute;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: var(--text-primary);
}

.mm-close span:first-child { transform: rotate(45deg); }
.mm-close span:last-child  { transform: rotate(-45deg); }

/* Nav list */
.mm-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--space-md);
}

.mm-link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0.85rem var(--space-md);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mm-link:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.mm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--primary-color);
  font-size: 0.95rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mm-label {
  flex: 1;
}

.mm-chevron {
  font-size: 1.35rem;
  line-height: 1;
  color: var(--text-secondary);
  opacity: 0.45;
}

/* Active item */
.mm-link.active {
  background: var(--primary-color);
  color: #fff;
}

.mm-link.active .mm-icon {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.mm-link.active .mm-chevron {
  color: #fff;
  opacity: 0.85;
}

/* Enter / leave transitions */
.mm-fade-enter-active,
.mm-fade-leave-active {
  transition: opacity 0.25s ease;
}
.mm-fade-enter-from,
.mm-fade-leave-to {
  opacity: 0;
}

.mm-slide-enter-active,
.mm-slide-leave-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.mm-slide-enter-from,
.mm-slide-leave-to {
  transform: translateX(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .mm-fade-enter-active,
  .mm-fade-leave-active,
  .mm-slide-enter-active,
  .mm-slide-leave-active {
    transition: none;
  }
}


/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    height: 56px !important;
  }
  
  .navbar-nav {
    display: none !important;
  }
  
  .language-toggle {
    margin-left: var(--space-md) !important;
  }
  
  .theme-toggle {
    margin-left: var(--space-sm) !important;
    width: 32px !important;
    height: 32px !important;
  }
  
  .mobile-menu-toggle {
    display: flex !important;
  }
  
  .navbar-container {
    padding: 0 var(--space-md) !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .navbar-brand {
    font-size: 1.125rem !important;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 var(--space-sm) !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .navbar-brand {
    font-size: 1rem !important;
  }
  
  .theme-toggle {
    width: 28px !important;
    height: 28px !important;
  }
}
</style> 