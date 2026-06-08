import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        accessibility: {
          languageToggle: 'Toggle language',
        },
      },
      es: {
        accessibility: {
          languageToggle: 'Cambiar idioma',
        },
      },
    },
  })
}

describe('LanguageToggle.vue', () => {
  let i18n

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'en'
    i18n = createTestI18n('en')
  })

  it('renders ES and EN options', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    expect(screen.getByRole('group', { name: 'Toggle language' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
  })

  it('marks EN as active when locale is English', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('marks ES as active when locale is Spanish', () => {
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n],
      },
    })

    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches locale when ES is clicked', async () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    await fireEvent.click(screen.getByRole('button', { name: 'ES' }))

    expect(i18n.global.locale.value).toBe('es')
    expect(document.documentElement.lang).toBe('es')
  })

  it('switches locale when EN is clicked from Spanish', async () => {
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n],
      },
    })

    await fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    expect(spanishI18n.global.locale.value).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('supports keyboard focus on language options', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    const englishButton = screen.getByRole('button', { name: 'EN' })
    englishButton.focus()
    expect(englishButton).toHaveFocus()
  })
})
