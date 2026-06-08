import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

export const SUPPORTED_LOCALES = ['en', 'es']
export const DEFAULT_LOCALE = 'en'

/**
 * Resolves the visitor's preferred locale (localStorage > browser language),
 * falling back to {@link DEFAULT_LOCALE}.
 *
 * Returns the default during SSR/prerender (no `window`) so the server render is
 * deterministic and hydration-safe. The resolved locale is applied on the
 * client only, after hydration (see App.vue), to avoid markup mismatches.
 *
 * @returns {string} A supported locale code.
 */
export function resolveClientLocale() {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  try {
    const saved = window.localStorage.getItem('locale')
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      return saved
    }
  } catch {
    // localStorage can throw in private mode; fall back to browser language.
  }

  const browserLang = (window.navigator.language || DEFAULT_LOCALE).split('-')[0]
  return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false, // Use Composition API
  // Deterministic locale for SSR + first client render; the visitor's preferred
  // locale is applied after hydration to keep prerendered markup matching.
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    es,
  },
  globalInjection: true, // Inject $t globally
  silentTranslationWarn: import.meta.env.PROD,
})

export default i18n
