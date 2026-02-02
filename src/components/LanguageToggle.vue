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
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #3b82f6;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: fit-content;
  height: auto;
  font-family: var(--font-primary);
}

.language-btn:hover {
  background: #f1f5f9;
  border-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.language-btn:active {
  transform: translateY(0);
}

.language-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.globe-icon {
  color: #475569;
  font-size: 1rem;
  width: 1rem;
  height: 1rem;
  transition: color var(--transition-normal);
}

.language-code {
  color: #475569;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  transition: color var(--transition-normal);
}

.language-btn:hover .globe-icon,
.language-btn:hover .language-code {
  color: #334155;
}

/* Responsive design */
@media (max-width: 768px) {
  .language-btn {
    padding: 0.375rem 0.75rem;
    gap: 0.375rem;
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
  background: #1e293b;
  border-color: #3b82f6;
}

[data-theme="dark"] .language-btn:hover {
  background: #334155;
  border-color: #2563eb;
}

[data-theme="dark"] .globe-icon,
[data-theme="dark"] .language-code {
  color: #cbd5e1;
}

[data-theme="dark"] .language-btn:hover .globe-icon,
[data-theme="dark"] .language-btn:hover .language-code {
  color: #f8fafc;
}
</style> 