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
  gap: 0.25rem;
  padding: 0.2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 999px;
}

.language-option {
  min-width: 2.2rem;
  padding: 0.28rem 0.45rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.language-option:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-tertiary) 72%, transparent);
}

.language-option--active {
  color: var(--primary-color);
  background: var(--accent-tint);
}

.language-option:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .language-toggle {
    padding: 0.18rem;
  }

  .language-option {
    min-width: 2rem;
    font-size: 0.68rem;
  }
}
</style>
