/**
 * Resolve a navigation label, preferring short labels when defined in i18n.
 * @param {(key: string) => boolean} te
 * @param {(key: string) => string} t
 * @param {string} itemId
 * @returns {string}
 */
export function getNavLabel(te, t, itemId) {
  const shortKey = `navShort.${itemId}`
  return te(shortKey) ? t(shortKey) : t(`nav.${itemId}`)
}
