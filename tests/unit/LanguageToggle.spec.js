import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import LanguageToggle from '@/components/LanguageToggle.vue'

const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        accessibility: {
          languageToggle: 'Toggle language',
          switchToSpanish: 'ES - Switch to Spanish',
          switchToEnglish: 'EN - Switch to English',
        },
      },
      es: {
        accessibility: {
          languageToggle: 'Cambiar idioma',
          switchToSpanish: 'ES - Cambiar a español',
          switchToEnglish: 'EN - Cambiar a inglés',
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
    expect(screen.getByRole('button', { name: 'ES - Switch to Spanish' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN - Switch to English' })).toBeInTheDocument()
  })

  it('marks EN as active when locale is English', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    expect(screen.getByRole('button', { name: 'EN - Switch to English' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'ES - Switch to Spanish' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('marks ES as active when locale is Spanish', () => {
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n],
      },
    })

    expect(screen.getByRole('button', { name: 'ES - Cambiar a español' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN - Cambiar a inglés' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches locale when ES is clicked', async () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    await fireEvent.click(screen.getByRole('button', { name: 'ES - Switch to Spanish' }))

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

    await fireEvent.click(screen.getByRole('button', { name: 'EN - Cambiar a inglés' }))

    expect(spanishI18n.global.locale.value).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('supports keyboard focus on language options', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    const englishButton = screen.getByRole('button', { name: 'EN - Switch to English' })
    englishButton.focus()
    expect(englishButton).toHaveFocus()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(LanguageToggle, {
      global: {
        plugins: [i18n],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
