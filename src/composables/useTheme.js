import { ref, onMounted } from 'vue'
import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  readInitialDarkMode,
  themeFromBoolean,
} from '@/config/theme'

/**
 * Theme preference synced to `data-theme` on `<html>` and localStorage.
 * @returns {{ isDarkMode: import('vue').Ref<boolean>, toggleTheme: () => void }}
 */
export function useTheme() {
  const isDarkMode = ref(false)

  const applyTheme = () => {
    document.documentElement.setAttribute(
      THEME_ATTRIBUTE,
      themeFromBoolean(isDarkMode.value),
    )
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
    localStorage.setItem(THEME_STORAGE_KEY, themeFromBoolean(isDarkMode.value))
  }

  onMounted(() => {
    isDarkMode.value = readInitialDarkMode()
    applyTheme()
  })

  return { isDarkMode, toggleTheme }
}
