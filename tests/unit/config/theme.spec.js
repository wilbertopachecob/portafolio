import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  Theme,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  isDarkTheme,
  readInitialDarkMode,
  themeFromBoolean,
} from '@/config/theme'

describe('theme config', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockImplementation(() => null)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('exports stable theme enum values', () => {
    expect(Theme.LIGHT).toBe('light')
    expect(Theme.DARK).toBe('dark')
    expect(THEME_STORAGE_KEY).toBe('theme')
    expect(THEME_ATTRIBUTE).toBe('data-theme')
    expect(Object.isFrozen(Theme)).toBe(true)
  })

  it('maps boolean flags to theme enum values', () => {
    expect(themeFromBoolean(false)).toBe(Theme.LIGHT)
    expect(themeFromBoolean(true)).toBe(Theme.DARK)
  })

  it('detects dark theme values', () => {
    expect(isDarkTheme(Theme.DARK)).toBe(true)
    expect(isDarkTheme(Theme.LIGHT)).toBe(false)
    expect(isDarkTheme(null)).toBe(false)
  })

  it('reads dark mode from localStorage when present', () => {
    localStorage.getItem.mockImplementation((key) =>
      key === THEME_STORAGE_KEY ? Theme.DARK : null,
    )

    expect(readInitialDarkMode()).toBe(true)
  })

  it('falls back to system preference when localStorage is empty', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
    }))

    expect(readInitialDarkMode()).toBe(true)
  })
})
