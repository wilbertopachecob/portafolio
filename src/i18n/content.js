// Import translation files directly
import en from './locales/en.json'
import es from './locales/es.json'

// Helper function to get content based on locale
export function getContent(locale = 'en') {
  const translations = locale === 'es' ? es : en
  return translations.content || {}
}

// Export specific content getters
export function getWorkExperience(locale = 'en') {
  return getContent(locale).workExperience || []
}

export function getEducation(locale = 'en') {
  return getContent(locale).education || []
}

export function getCertifications(locale = 'en') {
  return getContent(locale).certifications || []
}
