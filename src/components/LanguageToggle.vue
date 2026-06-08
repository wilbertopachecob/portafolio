<template>
  <div
    class="language-toggle"
    role="group"
    :aria-label="$t('accessibility.languageToggle')"
  >
    <button
      type="button"
      class="language-option"
      :class="{ 'language-option--active': currentLocale === 'es' }"
      :aria-pressed="currentLocale === 'es'"
      @click="setLocale('es')"
    >
      ES
    </button>
    <span class="language-divider" aria-hidden="true">|</span>
    <button
      type="button"
      class="language-option"
      :class="{ 'language-option--active': currentLocale === 'en' }"
      :aria-pressed="currentLocale === 'en'"
      @click="setLocale('en')"
    >
      EN
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

    const setLocale = (newLocale) => {
      if (currentLocale.value === newLocale) return

      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
      document.documentElement.lang = newLocale
    }

    return {
      currentLocale,
      setLocale,
    }
  },
}
</script>

<style scoped>
.language-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.45rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.language-option {
  min-width: 2rem;
  padding: 0.2rem 0.35rem;
  border: none;
  border-radius: calc(var(--radius-md) - 2px);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
}

.language-option:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-tertiary) 70%, transparent);
}

.language-option--active {
  color: var(--text-primary);
  background: var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.language-option:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.language-divider {
  color: var(--border-light);
  font-size: 0.75rem;
  line-height: 1;
  user-select: none;
}

@media (max-width: 768px) {
  .language-toggle {
    padding: 0.15rem 0.35rem;
  }

  .language-option {
    min-width: 1.75rem;
    font-size: 0.75rem;
  }
}
</style>
