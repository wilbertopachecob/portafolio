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
    
    <!-- Mobile Menu -->
    <div 
      class="mobile-menu" 
      :class="{ 'active': isMobileMenuOpen }"
      id="mobile-menu"
      role="menu"
      :aria-hidden="!isMobileMenuOpen"
    >
      <ul class="mobile-nav" role="menubar">
        <li class="mobile-nav-item" role="none">
          <a href="#about" class="mobile-nav-link" :class="{ 'active': activeSection === 'about' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.about')">
            {{ $t('nav.about') }}
          </a>
        </li>
        <li class="mobile-nav-item" role="none">
          <a href="#experience" class="mobile-nav-link" :class="{ 'active': activeSection === 'experience' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.experience')">
            {{ $t('nav.experience') }}
          </a>
        </li>
        <li class="mobile-nav-item" role="none">
          <a href="#skills" class="mobile-nav-link" :class="{ 'active': activeSection === 'skills' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.skills')">
            {{ $t('nav.skills') }}
          </a>
        </li>
        <li class="mobile-nav-item" role="none">
          <a href="#education" class="mobile-nav-link" :class="{ 'active': activeSection === 'education' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.education')">
            {{ $t('nav.education') }}
          </a>
        </li>
        <li class="mobile-nav-item" role="none">
          <a href="#languages" class="mobile-nav-link" :class="{ 'active': activeSection === 'languages' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.languages')">
            {{ $t('nav.languages') }}
          </a>
        </li>
        <li class="mobile-nav-item" role="none">
          <a href="#certifications" class="mobile-nav-link" :class="{ 'active': activeSection === 'certifications' }" @click="closeMobileMenu" role="menuitem" :aria-label="$t('nav.certifications')">
            {{ $t('nav.certifications') }}
          </a>
        </li>

      </ul>
    </div>
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
    };
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
    
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Focus the section for screen readers (make focusable if needed)
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1');
        }
        element.focus();
        // Invalidate cache after scrolling to ensure accurate positions
        this.sectionPositions = null;
      }
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
    
    handleClickOutside(event) {
      const navbar = event.target.closest('.navbar');
      const mobileToggle = event.target.closest('.mobile-menu-toggle');
      
      if (!navbar && !mobileToggle && this.isMobileMenuOpen) {
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

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  background-color: var(--bg-primary);
  z-index: 999;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: var(--space-xl);
  box-shadow: var(--shadow-md);
}

[data-theme="dark"] .mobile-menu {
  background: var(--bg-primary);
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
}

.mobile-menu.active {
  display: flex;
}

.mobile-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.mobile-nav-item {
  margin: var(--radius-lg) 0;
  list-style: none;
}

.mobile-nav-link {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--transition-fast);
  padding: 0.875rem var(--space-lg);
  display: block;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  margin: var(--space-xs) var(--space-sm);
  border: 1px solid var(--border-color);
}

[data-theme="dark"] .mobile-nav-link {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.mobile-nav-link:hover {
  color: var(--primary-color);
  background: var(--bg-secondary);
  border-color: var(--border-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .mobile-nav-link:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
}

/* Active Mobile Navigation Link Styles */
.mobile-nav-link.active {
  color: var(--primary-color);
  font-weight: 600;
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
}

[data-theme="dark"] .mobile-nav-link.active {
  color: var(--primary-color);
  background: var(--primary-dark);
  border-color: var(--primary-color);
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
  
  .mobile-menu {
    top: 56px;
    background: var(--bg-primary);
    background-color: var(--bg-primary);
  }
  
  [data-theme="dark"] .mobile-menu {
    background: var(--bg-primary);
    background-color: var(--bg-primary);
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
  
  .mobile-nav-link {
    font-size: 1.125rem !important;
  }
  
  .theme-toggle {
    width: 28px !important;
    height: 28px !important;
  }
}
</style> 