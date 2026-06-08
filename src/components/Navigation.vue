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
      <ul class="navbar-nav">
        <li
          v-for="item in primaryNavItems"
          :key="item.id"
          class="nav-item"
        >
          <a
            :href="'#' + item.id"
            class="nav-link"
            :class="{ active: activeSection === item.id }"
            @click="scrollToSection(item.id)"
          >
            {{ navLabel(item.id) }}
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
          :aria-label="$t('accessibility.mobileNavigation')"
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
              v-for="item in primaryNavItems"
              :key="item.id"
              :href="'#' + item.id"
              class="mm-link"
              :class="{ 'active': activeSection === item.id }"
              @click.prevent="goToSection(item.id)"
            >
              <span class="mm-icon" aria-hidden="true">
                <font-awesome-icon :icon="item.icon" />
              </span>
              <span class="mm-label">{{ navLabel(item.id) }}</span>
              <span class="mm-chevron" aria-hidden="true">›</span>
            </a>
          </nav>

          <div class="mm-footer">
            <a
              :href="resumeUrl"
              class="mm-resume-btn"
              :download="resumeFilename"
              @click="closeMobileMenu"
            >
              <font-awesome-icon :icon="['fas', 'download']" aria-hidden="true" />
              {{ $t('hero.downloadResume') }}
            </a>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </nav>
</template>

<script>
import LanguageToggle from './LanguageToggle.vue'
import { NAV_ITEMS, PRIMARY_NAV_IDS, SECTION_IDS } from '@/config/sections'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

export default {
  name: "Navigation",
  components: {
    LanguageToggle
  },
  computed: {
    resumeFilename() {
      return RESUME_FILENAME
    },
    resumeUrl() {
      return getPublicAssetUrl(RESUME_FILENAME)
    },
    primaryNavItems() {
      return PRIMARY_NAV_IDS
        .map((id) => NAV_ITEMS.find((item) => item.id === id))
        .filter(Boolean)
    },
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
    };
  },
  watch: {
    // Lock background scroll while the drawer is open
    isMobileMenuOpen(open) {
      document.body.style.overflow = open ? 'hidden' : '';
    },
  },
  mounted() {
    this.isDarkMode = this.getInitialDarkMode()
    this.applyTheme()
    
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
    navLabel(itemId) {
      const shortKey = `navShort.${itemId}`
      return this.$te(shortKey) ? this.$t(shortKey) : this.$t(`nav.${itemId}`)
    },

    getInitialDarkMode() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) return savedTheme === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },

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
      const scrollPosition = window.scrollY + 150; // Offset for navbar height and some buffer

      if (!this.sectionPositions) {
        this.cacheSectionPositions();
      }

      if (scrollPosition < 200) {
        this.activeSection = 'about';
        return;
      }

      const currentSection = SECTION_IDS.find((sectionId) => {
        const position = this.sectionPositions[sectionId];
        return position
          && scrollPosition >= position.top
          && scrollPosition < position.top + position.height;
      }) ?? 'about';

      this.activeSection = this.getNavigationSectionId(currentSection);
    },

    getNavigationSectionId(sectionId) {
      return this.primaryNavItems.some((item) => item.id === sectionId) ? sectionId : 'about';
    },

    cacheSectionPositions() {
      this.sectionPositions = SECTION_IDS.reduce((positions, sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          positions[sectionId] = {
            top: section.offsetTop,
            height: section.offsetHeight,
          };
        }
        return positions;
      }, {});
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: all var(--transition-normal);
  height: 64px;
  width: 100%;
}

[data-theme="dark"] .navbar {
  background: rgba(15, 23, 42, 0.9);
  border-bottom-color: var(--border-color);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
}

[data-theme="dark"] .navbar-scrolled {
  background: rgba(15, 23, 42, 0.95);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.navbar-controls {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.navbar-brand:hover {
  color: var(--primary-color);
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 var(--space-md);
  gap: var(--space-md);
  align-items: center;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.nav-item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color var(--transition-fast);
  position: relative;
  padding: var(--space-sm) 0;
  white-space: nowrap;
  display: block;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width var(--transition-normal);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  width: 100%;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background var(--transition-normal), color var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
}

.theme-toggle:hover {
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: all var(--transition-normal);
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1100;
}

.mobile-menu-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(80vw, 320px);
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

.mm-footer {
  margin-top: auto;
  padding: var(--space-md) var(--space-md) var(--space-lg);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.mm-resume-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 0.75rem var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.mm-resume-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

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

@media (max-width: 992px) {
  .navbar-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 56px;
  }

  .theme-toggle {
    width: 32px;
    height: 32px;
  }

  .navbar-container {
    padding: 0 var(--space-md);
    max-width: 100%;
  }

  .navbar-brand {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 var(--space-sm);
  }

  .navbar-brand {
    font-size: 1rem;
  }

  .theme-toggle {
    width: 28px;
    height: 28px;
  }
}
</style>
