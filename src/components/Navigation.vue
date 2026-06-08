<template>
  <nav
    class="navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="navbar-container">
      <button
        type="button"
        class="mobile-menu-toggle"
        :class="{ active: isMobileMenuOpen }"
        :aria-label="menuToggleLabel"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-menu"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">{{ menuToggleLabel }}</span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <a href="#about" class="navbar-brand" aria-label="Go to about section">
        <span class="brand-main">Wilberto Pacheco</span>
        <span class="brand-suffix" aria-hidden="true">// SWE</span>
      </a>

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

      <div class="navbar-controls">
        <LanguageToggle />

        <button
          type="button"
          class="theme-toggle"
          role="switch"
          :title="themeToggleLabel"
          :aria-label="themeToggleLabel"
          :aria-checked="isDarkMode"
          @click="toggleTheme"
        >
          <app-icon
            :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']"
            :aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <MobileMenuDrawer
      :open="isMobileMenuOpen"
      :items="primaryNavItems"
      :active-section="activeSection"
      :resume-url="resumeUrl"
      :resume-filename="resumeFilename"
      :label-for="navLabel"
      @close="closeMobileMenu"
      @navigate="goToSection"
    />
  </nav>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageToggle from './LanguageToggle.vue'
import MobileMenuDrawer from './MobileMenuDrawer.vue'
import { NAV_ITEMS, PRIMARY_NAV_IDS } from '@/config/sections'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'
import { getNavLabel } from '@/utils/nav-label'
import { useTheme } from '@/composables/useTheme'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSectionScroll } from '@/composables/useSectionScroll'
import { useMobileMenu } from '@/composables/useMobileMenu'

defineOptions({ name: 'Navigation' })

const { t, te } = useI18n()

const primaryNavItems = computed(() =>
  PRIMARY_NAV_IDS
    .map((id) => NAV_ITEMS.find((item) => item.id === id))
    .filter(Boolean),
)

const resumeFilename = RESUME_FILENAME
const resumeUrl = getPublicAssetUrl(RESUME_FILENAME)

const navLabel = (itemId) => getNavLabel(te, t, itemId)

const { isDarkMode, toggleTheme } = useTheme()
const { isScrolled, activeSection, sectionPositions, invalidateSectionCache } =
  useScrollSpy(primaryNavItems)
const { scrollToSection, goToSection: navigateAfterClose } =
  useSectionScroll(invalidateSectionCache)
const {
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
  handleEscape,
} = useMobileMenu()

const menuToggleLabel = computed(() =>
  isMobileMenuOpen.value
    ? t('accessibility.closeMenu')
    : t('accessibility.openMenu'),
)

const themeToggleLabel = computed(() =>
  isDarkMode.value
    ? t('accessibility.lightMode')
    : t('accessibility.darkMode'),
)

const goToSection = (sectionId) => {
  navigateAfterClose(sectionId, closeMobileMenu)
}

const handleKeydown = (event) => {
  handleEscape(event)

  if ((event.ctrlKey || event.metaKey) && event.key === 't') {
    event.preventDefault()
    toggleTheme()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({
  isDarkMode,
  activeSection,
  sectionPositions,
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: color-mix(in srgb, var(--bg-primary) 84%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  transition: all var(--transition-normal);
  height: 64px;
  width: 100%;
}

[data-theme="dark"] .navbar {
  background: color-mix(in srgb, var(--bg-primary) 84%, transparent);
  border-bottom-color: var(--border-color);
}

.navbar-scrolled {
  background: color-mix(in srgb, var(--bg-primary) 90%, transparent);
}

[data-theme="dark"] .navbar-scrolled {
  background: color-mix(in srgb, var(--bg-primary) 90%, transparent);
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
  display: inline-flex;
  align-items: baseline;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
  letter-spacing: -0.012em;
  white-space: nowrap;
}

.navbar-brand:hover {
  color: var(--text-primary);
}

.brand-suffix {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.69rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: translateY(-1px);
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
  font-size: 0.9rem;
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.4rem 0.72rem;
  white-space: nowrap;
  display: block;
}

.nav-link:hover {
  color: var(--text-primary);
  border-color: var(--border-color);
  background: color-mix(in srgb, var(--bg-secondary) 70%, transparent);
}

.nav-link.active {
  color: var(--primary-color);
  border-color: color-mix(in srgb, var(--primary-color) 30%, var(--border-light));
  background: var(--accent-tint);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal), transform var(--transition-normal);
}

.theme-toggle:hover {
  background: var(--accent-tint);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-1px);
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
    width: 34px;
    height: 34px;
  }

  .navbar-container {
    padding: 0 var(--space-md);
    max-width: 100%;
  }

  .navbar-brand {
    font-size: 1rem;
  }

  .brand-suffix {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 var(--space-sm);
  }

  .navbar-brand {
    font-size: 0.95rem;
  }

  .theme-toggle {
    width: 28px;
    height: 28px;
  }
}
</style>
