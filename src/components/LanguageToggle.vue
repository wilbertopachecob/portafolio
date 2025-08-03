<template>
  <div class="language-toggle">
    <button
      class="language-btn"
      @click="toggleLanguage"
      :title="$t('accessibility.languageToggle')"
      :aria-label="$t('accessibility.languageToggle')"
      :aria-pressed="currentLocale === 'es'"
      role="switch"
      aria-checked="currentLocale === 'es'"
    >
      <span class="language-flag" :class="{ active: currentLocale === 'en' }">
        <img src="@/assets/img/english_flag.png" alt="English" class="flag-icon" />
      </span>
      <span class="language-flag" :class="{ active: currentLocale === 'es' }">
        <img src="@/assets/img/spanish_flag.png" alt="Español" class="flag-icon" />
      </span>
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
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-xs);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 80px;
  height: 40px;
}

.language-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.language-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.language-flag {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 24px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  opacity: 0.5;
  transform: scale(0.8);
}

.language-flag.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}

.language-flag:first-child {
  left: var(--space-xs);
}

.language-flag:last-child {
  right: var(--space-xs);
}

.flag-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

/* Animation for language switch */
.language-btn:hover .language-flag {
  opacity: 0.8;
}

.language-btn:hover .language-flag.active {
  opacity: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .language-btn {
    min-width: 70px;
    height: 36px;
  }
  
  .language-flag {
    width: 28px;
    height: 20px;
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .language-btn {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme="dark"] .language-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
}
</style> 