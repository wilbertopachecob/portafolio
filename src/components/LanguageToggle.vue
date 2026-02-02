<template>
  <div class="language-toggle">
    <button
      class="language-btn"
      @click="toggleLanguage"
      :title="$t('accessibility.languageToggle')"
      :aria-label="$t('accessibility.languageToggle')"
      role="switch"
      :aria-checked="currentLocale === 'es'"
    >
      <font-awesome-icon 
        :icon="['fas', 'globe']" 
        class="globe-icon"
        aria-hidden="true"
      />
      <span class="language-code">{{ currentLocale.toUpperCase() }}</span>
    </button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'LanguageToggle',
  setup() {
    const { locale } = useI18n()
    
    const currentLocale = computed(() => locale.value)
    
    const toggleLanguage = () => {
      const newLocale = currentLocale.value === 'en' ? 'es' : 'en'
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
      
      // Update document language attribute
      document.documentElement.lang = newLocale
      
      // Update document title
      const title = newLocale === 'en' 
        ? 'Wilberto Pacheco Batista | Software Engineer'
        : 'Wilberto Pacheco Batista | Ingeniero de Software'
      document.title = title
    }
    
    return {
      currentLocale,
      toggleLanguage
    }
  }
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--bg-secondary);
  border: 1px solid var(--primary-color);
  border-radius: 9999px;
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: fit-content;
  height: auto;
  font-family: var(--font-primary);
}

.language-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.language-btn:active {
  transform: translateY(0);
}

.language-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.globe-icon {
  color: var(--text-secondary);
  font-size: 1rem;
  width: 1rem;
  height: 1rem;
  transition: color var(--transition-normal);
}

.language-code {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  transition: color var(--transition-normal);
}

.language-btn:hover .globe-icon,
.language-btn:hover .language-code {
  color: var(--text-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .language-btn {
    padding: var(--space-xs) var(--space-sm);
    gap: var(--space-xs);
  }
  
  .globe-icon {
    font-size: 0.875rem;
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .language-code {
    font-size: 0.8125rem;
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .language-btn {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
}

[data-theme="dark"] .language-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-dark);
}

[data-theme="dark"] .globe-icon,
[data-theme="dark"] .language-code {
  color: var(--text-secondary);
}

[data-theme="dark"] .language-btn:hover .globe-icon,
[data-theme="dark"] .language-btn:hover .language-code {
  color: var(--text-primary);
}
</style> 