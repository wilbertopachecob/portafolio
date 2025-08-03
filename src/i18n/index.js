import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

// Get user's preferred language from localStorage or browser
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'es'].includes(savedLocale)) {
    return savedLocale
  }

  // Fallback to browser language
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'es'].includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
  globalInjection: true, // Inject $t globally
  silentTranslationWarn: process.env.NODE_ENV === 'production',
})

export default i18n
