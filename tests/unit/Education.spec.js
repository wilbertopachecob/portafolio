import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe, toHaveNoViolations } from 'jest-axe'
import Education from '@/components/Education.vue'

expect.extend(toHaveNoViolations)

// Mock the content module
vi.mock('@/i18n/content', () => ({
  getEducation: vi.fn((locale) => {
    if (locale === 'en') {
      return [
        {
          institution: 'University of Informatic Sciences',
          degree: 'Computer Science Engineer',
          period: '2005 - 2010',
          link: 'https://www.uci.cu/'
        }
      ]
    } else {
      return [
        {
          institution: 'Universidad de las Ciencias Informáticas',
          degree: 'Ingeniero en Ciencias de la Computación',
          period: '2005 - 2010',
          link: 'https://www.uci.cu/'
        }
      ]
    }
  })
}))

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        education: {
          period: 'Period',
          visitWebsite: 'Visit {institution} website'
        }
      },
      es: {
        education: {
          period: 'Período',
          visitWebsite: 'Visitar sitio web de {institution}'
        }
      }
    }
  })
}

describe('Education.vue', () => {
  it('renders education section', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const educationSection = screen.getByRole('region')
    expect(educationSection).toBeInTheDocument()
    expect(educationSection).toHaveAttribute('aria-labelledby', 'education-heading')
  })

  it('renders education heading', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('sr-only')
    expect(heading).toHaveAttribute('id', 'education-heading')
  })

  it('renders education container', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const container = screen.getByRole('list')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('education-container')
  })

  it('renders education cards', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const educationCards = screen.getAllByRole('listitem')
    expect(educationCards.length).toBeGreaterThan(0)
  })

  it('renders institution names', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('University of Informatic Sciences')).toBeInTheDocument()
  })

  it('renders degree titles', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Computer Science Engineer')).toBeInTheDocument()
  })

  it('renders education periods', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Period: 2005 - 2010/)).toBeInTheDocument()
  })

  it('renders institution links', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.uci.cu/')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders institution logos', () => {
    const i18n = createTestI18n()
    render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('alt', 'University of Informatic Sciences logo')
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(Education, {
      global: {
        plugins: [i18n]
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 