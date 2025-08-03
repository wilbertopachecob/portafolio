<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="navbar-container">
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
      
      <!-- Language Toggle -->
      <LanguageToggle />
      
      <!-- Dark Mode Toggle -->
      <button 
        class="theme-toggle"
        @click="toggleTheme"
        :title="isDarkMode ? $t('accessibility.lightMode') : $t('accessibility.darkMode')"
        :aria-label="isDarkMode ? $t('accessibility.lightMode') : $t('accessibility.darkMode')"
        :aria-pressed="isDarkMode"
        role="switch"
        aria-checked="isDarkMode"
      >
        <font-awesome-icon 
          :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" 
          :aria-hidden="true"
        />
      </button>
      
      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :class="{ 'active': isMobileMenuOpen }"
        :aria-label="isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'"
        :aria-expanded="isMobileMenuOpen"
        :aria-controls="'mobile-menu'"
      >
        <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
        <span></span>
        <span></span>
        <span></span>
      </button>
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
      
      <!-- Mobile Language Toggle -->
      <div class="mobile-language-toggle">
        <LanguageToggle />
      </div>
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
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeydown);
    
    // Clean up timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
      
      // Throttle the active section update for better performance
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      
      this.scrollTimeout = setTimeout(() => {
        this.updateActiveSection();
      }, 50);
    },
    
    updateActiveSection() {
      const sections = ['about', 'experience', 'skills', 'education', 'languages', 'certifications'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height and some buffer
      
      // Find the section that is currently in view
      let currentSection = 'about';
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      // If we're at the very top, default to about section
      if (scrollPosition < 200) {
        currentSection = 'about';
      }
      
      this.activeSection = currentSection;
    },
    
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Focus the section for screen readers
        element.focus();
      }
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
  border-bottom: 1px solid #e2e8f0 !important;
  z-index: 1000 !important;
  transition: all 0.25s ease-in-out;
  height: 64px !important;
  width: 100% !important;
}

[data-theme="dark"] .navbar {
  background: rgba(15, 23, 42, 0.9) !important;
  border-bottom-color: #334155 !important;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
}

[data-theme="dark"] .navbar-scrolled {
  background: rgba(15, 23, 42, 0.95) !important;
}

.navbar-container {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 100% !important;
  padding: 0 1.5rem !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  width: 100% !important;
}

.navbar-brand {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  text-decoration: none !important;
  transition: color 0.15s ease-in-out !important;
  white-space: nowrap !important;
}

[data-theme="dark"] .navbar-brand {
  color: #f8fafc !important;
}

.navbar-brand:hover {
  color: #2563eb !important;
}

.navbar-nav {
  display: flex !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: 1.5rem !important;
  align-items: center !important;
  flex-direction: row !important;
}

.nav-item {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.nav-link {
  color: #475569 !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  transition: color 0.15s ease-in-out !important;
  position: relative !important;
  padding: 0.5rem 0 !important;
  white-space: nowrap !important;
  display: block !important;
}

[data-theme="dark"] .nav-link {
  color: #cbd5e1 !important;
}

.nav-link:hover {
  color: #2563eb !important;
}

.nav-link::after {
  content: '' !important;
  position: absolute !important;
  bottom: -4px !important;
  left: 0 !important;
  width: 0 !important;
  height: 2px !important;
  background: #2563eb !important;
  transition: width 0.25s ease-in-out !important;
}

.nav-link:hover::after {
  width: 100% !important;
}

/* Active Navigation Link Styles */
.nav-link.active {
  color: #2563eb !important;
}

[data-theme="dark"] .nav-link.active {
  color: #3b82f6 !important;
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
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.5rem !important;
  color: #475569 !important;
  cursor: pointer !important;
  transition: all 0.25s ease-in-out !important;
  margin-left: 0.75rem !important;
}

[data-theme="dark"] .theme-toggle {
  background: #1e293b !important;
  border-color: #334155 !important;
  color: #cbd5e1 !important;
}

.theme-toggle:hover {
  background: #2563eb !important;
  color: white !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
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
  background: #0f172a !important;
  border-radius: 1px !important;
  transition: all 0.25s ease-in-out !important;
  transform-origin: center !important;
}

[data-theme="dark"] .mobile-menu-toggle span {
  background: #f8fafc !important;
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
  position: fixed !important;
  top: 64px !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: #ffffff !important;
  z-index: 999 !important;
  transform: translateX(-100%) !important;
  transition: transform 0.25s ease-in-out !important;
  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
  padding-top: 3rem !important;
}

[data-theme="dark"] .mobile-menu {
  background: #0f172a !important;
}

.mobile-menu.active {
  transform: translateX(0) !important;
}

.mobile-nav {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: center !important;
  width: 100% !important;
}

.mobile-nav-item {
  margin: 1.5rem 0 !important;
  list-style: none !important;
}

.mobile-nav-link {
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  color: #0f172a !important;
  text-decoration: none !important;
  transition: color 0.15s ease-in-out !important;
  padding: 1rem !important;
  display: block !important;
}

[data-theme="dark"] .mobile-nav-link {
  color: #f8fafc !important;
}

.mobile-nav-link:hover {
  color: #2563eb !important;
}

/* Active Mobile Navigation Link Styles */
.mobile-nav-link.active {
  color: #2563eb !important;
  font-weight: 600 !important;
}

[data-theme="dark"] .mobile-nav-link.active {
  color: #3b82f6 !important;
}

.mobile-language-toggle {
  margin-top: 2rem !important;
  display: flex !important;
  justify-content: center !important;
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
    margin-left: 1rem !important;
  }
  
  .theme-toggle {
    margin-left: 0.5rem !important;
    width: 32px !important;
    height: 32px !important;
  }
  
  .mobile-menu-toggle {
    display: flex !important;
  }
  
  .navbar-container {
    padding: 0 1rem !important;
  }
  
  .navbar-brand {
    font-size: 1.125rem !important;
  }
  
  .mobile-menu {
    top: 56px !important;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.5rem !important;
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