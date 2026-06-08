/** Local storage key for persisted theme preference. */
export const THEME_STORAGE_KEY = 'theme'

/** HTML attribute used to activate theme-specific CSS. */
export const THEME_ATTRIBUTE = 'data-theme'

/**
 * Supported document themes.
 * @readonly
 * @enum {string}
 */
export const Theme = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
})

/** @typedef {typeof Theme[keyof typeof Theme]} ThemeValue */

/**
 * Map a boolean dark-mode flag to a theme enum value.
 * @param {boolean} isDarkMode
 * @returns {ThemeValue}
 */
export function themeFromBoolean(isDarkMode) {
  return isDarkMode ? Theme.DARK : Theme.LIGHT
}

/**
 * Check whether a stored or DOM theme value represents dark mode.
 * @param {string | null | undefined} value
 * @returns {boolean}
 */
export function isDarkTheme(value) {
  return value === Theme.DARK
}

/**
 * Read the persisted or system theme preference.
 * @returns {boolean}
 */
export function readInitialDarkMode() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme) {
    return isDarkTheme(savedTheme)
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
