import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import Languages from '@/components/Languages.vue'

// Mock require for image assets
vi.mock('@/assets/img/english_flag.png', () => ({ default: 'english-flag-mock' }))
vi.mock('@/assets/img/spanish_flag.png', () => ({ default: 'spanish-flag-mock' }))

// Mock require function globally for test environment
const originalRequire = require
vi.stubGlobal('require', (path) => {
  if (path.includes('@/assets/img/')) {
    return 'mock-image-path'
  }
  return originalRequire(path)
})

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        languages: {
          spanish: 'Spanish',
          english: 'English',
          flagAlt: 'Flag of {language}',
          flagLabel: 'Flag representing {language} language'
        }
      },
      es: {
        languages: {
          spanish: 'Español',
          english: 'Inglés',
          flagAlt: 'Bandera de {language}',
          flagLabel: 'Bandera que representa el idioma {language}'
        }
      }
    }
  })
}

describe('Languages.vue', () => {
  it('renders language names', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('renders flag images', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    const flagImages = screen.getAllByRole('img')
    expect(flagImages.length).toBe(2)
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'languages-heading')
    expect(section).toHaveAttribute('id', 'languages')
  })

  it('has proper semantic structure', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders language cards with proper styling classes', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    const languageCards = screen.getAllByRole('listitem')
    
    languageCards.forEach(card => {
      expect(card).toHaveClass('language-card')
    })
  })

  it('renders flag images with proper styling classes', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    const flagImages = screen.getAllByRole('img')
    
    flagImages.forEach(img => {
      expect(img).toHaveClass('flag-image')
    })
  })

  it('displays languages in a list format', () => {
    const i18n = createTestI18n()
    render(Languages, {
      global: {
        plugins: [i18n]
      }
    })
    const list = screen.getByRole('list')
    expect(list).toHaveAttribute('aria-label', 'Language proficiency')
  })
}) 