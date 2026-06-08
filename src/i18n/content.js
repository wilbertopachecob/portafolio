import en from './locales/en.json'
import es from './locales/es.json'

/**
 * Returns the content namespace for the requested locale.
 *
 * The portfolio keeps Spanish and English locale files structurally aligned.
 * Unknown locales intentionally fall back to English so tests, previews, and
 * crawlers always receive a complete content model.
 *
 * @param {string} locale - Vue i18n locale code.
 * @returns {Record<string, unknown>} Locale-specific content namespace.
 */
export function getContent(locale = 'en') {
  const translations = locale === 'es' ? es : en
  return translations.content || {}
}

/**
 * Returns work history entries.
 *
 * Preferred senior-facing fields are:
 * - summary: one-sentence role context.
 * - scopeTags: short proof tags for scope and ownership.
 * - achievements: curated, scannable outcomes.
 * - stack: technologies used in the role.
 *
 * Legacy `responsibilities` remains supported as a fallback for older tests
 * and components.
 *
 * @param {string} locale - Vue i18n locale code.
 * @returns {Array<Record<string, unknown>>} Work experience entries.
 */
export function getWorkExperience(locale = 'en') {
  return getContent(locale).workExperience || []
}

/**
 * @param {string} locale - Vue i18n locale code.
 * @returns {Array<Record<string, unknown>>} Portfolio product/project entries.
 */
export function getPortfolioProjects(locale = 'en') {
  return getContent(locale).portfolioProjects || []
}

/**
 * @param {string} locale - Vue i18n locale code.
 * @returns {Array<Record<string, string>>} Senior proof points for the impact section.
 */
export function getImpactHighlights(locale = 'en') {
  return getContent(locale).impactHighlights || []
}

/**
 * @param {string} locale - Vue i18n locale code.
 * @returns {Array<Record<string, string>>} Engineering principles for the how-I-work section.
 */
export function getHowIWorkPrinciples(locale = 'en') {
  return getContent(locale).howIWorkPrinciples || []
}

/**
 * Returns compact credential data for the support-level credentials section.
 *
 * @param {string} locale - Vue i18n locale code.
 * @returns {{education: Array<Record<string, unknown>>, certifications: Array<Record<string, unknown>>}} Aggregated credentials.
 */
export function getCredentials(locale = 'en') {
  const content = getContent(locale)
  return {
    education: content.education || [],
    certifications: content.certifications || [],
  }
}
