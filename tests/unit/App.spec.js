import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import App from '@/App.vue'
import en from '@/i18n/locales/en.json'
import es from '@/i18n/locales/es.json'

const createTestI18n = (locale = 'en') => createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { en, es },
})

const renderApp = (locale = 'en') => render(App, {
  global: {
    plugins: [createTestI18n(locale)],
  },
})

describe('App.vue', () => {
  beforeEach(() => {
    localStorage.getItem.mockReturnValue(null)
    document.documentElement.lang = 'en'
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the skip link and main landmark', () => {
    renderApp()

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    const main = screen.getByRole('main')

    expect(skipLink).toHaveAttribute('href', '#main-content')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('tabindex', '-1')
  })

  it('moves focus to main content when the skip link is activated', async () => {
    renderApp()

    await fireEvent.click(screen.getByRole('link', { name: 'Skip to main content' }))

    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('exposes the primary page landmarks and one h1', () => {
    renderApp()

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('syncs the document language and title from the active locale', () => {
    localStorage.getItem.mockImplementation((key) => (key === 'locale' ? 'es' : null))
    renderApp('es')

    expect(document.documentElement.lang).toBe('es')
    expect(document.title).toBe('Wilberto Pacheco Batista - Software Engineer de Producto y Modernización')
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderApp()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

