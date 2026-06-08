import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withSetup } from '../helpers/withSetup'
import { useTheme } from '@/composables/useTheme'
import { Theme, THEME_ATTRIBUTE, THEME_STORAGE_KEY } from '@/config/theme'

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockImplementation(() => null)
    document.documentElement.removeAttribute(THEME_ATTRIBUTE)
  })

  afterEach(() => {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE)
  })

  it('initializes light mode from system preference when localStorage is empty', () => {
    const { result, wrapper } = withSetup(useTheme)

    expect(result.isDarkMode.value).toBe(false)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(Theme.LIGHT)

    wrapper.unmount()
  })

  it('initializes dark mode from localStorage', () => {
    localStorage.getItem.mockImplementation((key) =>
      key === THEME_STORAGE_KEY ? Theme.DARK : null,
    )

    const { result, wrapper } = withSetup(useTheme)

    expect(result.isDarkMode.value).toBe(true)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(Theme.DARK)

    wrapper.unmount()
  })

  it('toggles theme and persists the preference', () => {
    const { result, wrapper } = withSetup(useTheme)

    result.toggleTheme()

    expect(result.isDarkMode.value).toBe(true)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(Theme.DARK)
    expect(localStorage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, Theme.DARK)

    result.toggleTheme()

    expect(result.isDarkMode.value).toBe(false)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(Theme.LIGHT)
    expect(localStorage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, Theme.LIGHT)

    wrapper.unmount()
  })
})
