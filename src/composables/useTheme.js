import { ref, onMounted } from 'vue'

function readInitialDarkMode() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    return savedTheme === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Theme preference synced to `data-theme` on `<html>` and localStorage.
 */
export function useTheme() {
  const isDarkMode = ref(false)

  const applyTheme = () => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode.value ? 'dark' : 'light',
    )
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }

  onMounted(() => {
    isDarkMode.value = readInitialDarkMode()
    applyTheme()
  })

  return { isDarkMode, toggleTheme }
}
