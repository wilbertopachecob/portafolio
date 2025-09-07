import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Navigation from '@/components/Navigation.vue'

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        nav: {
          about: 'About',
          experience: 'Experience',
          skills: 'Skills',
          education: 'Education',
          languages: 'Languages',
          certifications: 'Certifications'
        },
        accessibility: {
          lightMode: 'Switch to Light Mode',
          darkMode: 'Switch to Dark Mode'
        }
      },
      es: {
        nav: {
          about: 'Acerca de',
          experience: 'Experiencia',
          skills: 'Habilidades',
          education: 'Educación',
          languages: 'Idiomas',
          certifications: 'Certificaciones'
        },
        accessibility: {
          lightMode: 'Cambiar a Modo Claro',
          darkMode: 'Cambiar a Modo Oscuro'
        }
      }
    }
  })
}

describe('Navigation.vue', () => {
  it('renders the navigation bar', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders the brand/logo', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const brand = screen.getByRole('link', { name: /Go to about section/ })
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveTextContent('Wilberto Pacheco')
  })

  it('renders navigation links', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    // Use getAllByText to handle multiple instances (desktop and mobile)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Education').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Languages').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Certifications').length).toBeGreaterThan(0)
  })

  it('renders theme toggle button', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const themeToggle = screen.getByRole('switch', { name: /Switch to Dark Mode/ })
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders mobile menu toggle', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const mobileToggle = screen.getByRole('button', { name: /Open mobile menu/ })
    expect(mobileToggle).toBeInTheDocument()
    expect(mobileToggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('has proper navigation menu structure', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const navMenu = screen.getByRole('menubar')
    expect(navMenu).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    
    const navMenu = screen.getByRole('menubar')
    expect(navMenu).toBeInTheDocument()
  })

  it('has active section highlighting functionality', () => {
    const i18n = createTestI18n()
    render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    
    // Check that navigation links have active class binding
    const aboutLink = screen.getByRole('menuitem', { name: 'About' })
    expect(aboutLink).toHaveClass('nav-link')
    expect(aboutLink).toHaveClass('active')
    
    // The active class should be applied based on activeSection data property
    // This is tested through the Vue component's reactivity system
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(Navigation, {
      global: {
        plugins: [i18n]
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 