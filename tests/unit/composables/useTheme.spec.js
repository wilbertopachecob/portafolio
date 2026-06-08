import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withSetup } from '../helpers/withSetup'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockImplementation(() => null)
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('initializes light mode from system preference when localStorage is empty', () => {
    const { result, wrapper } = withSetup(useTheme)

    expect(result.isDarkMode.value).toBe(false)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    wrapper.unmount()
  })

  it('initializes dark mode from localStorage', () => {
    localStorage.getItem.mockImplementation((key) => (key === 'theme' ? 'dark' : null))

    const { result, wrapper } = withSetup(useTheme)

    expect(result.isDarkMode.value).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    wrapper.unmount()
  })

  it('toggles theme and persists the preference', () => {
    const { result, wrapper } = withSetup(useTheme)

    result.toggleTheme()

    expect(result.isDarkMode.value).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')

    result.toggleTheme()

    expect(result.isDarkMode.value).toBe(false)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')

    wrapper.unmount()
  })
})
