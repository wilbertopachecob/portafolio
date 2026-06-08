import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Experience from '@/components/Experience.vue'
import { getWorkExperience } from '@/i18n/content'

// Mock the content helper
vi.mock('@/i18n/content', () => ({
  getWorkExperience: vi.fn((locale) => {
    if (locale === 'es') {
      return [
        {
          company: 'Test Company ES',
          position: 'Ingeniero de Software',
          period: '2020 - Presente',
          location: 'Test Location ES',
          summary: 'Resumen senior del rol en español.',
          scopeTags: ['Liderazgo', 'Modernización'],
          achievements: ['Logro principal ES', 'Logro secundario ES', 'Logro tercero ES'],
          stack: ['Vue.js', 'Node.js'],
          responsibilities: ['Responsabilidad 1', 'Responsabilidad 2']
        }
      ]
    }
    return [
      {
        company: 'Test Company',
        position: 'Software Engineer',
        period: '2020 - Present',
        location: 'Test Location',
        summary: 'Senior role summary for the test.',
        scopeTags: ['Leadership', 'Modernization'],
        achievements: ['Primary achievement', 'Secondary achievement', 'Third achievement'],
        stack: ['Vue.js', 'Node.js'],
        responsibilities: ['Responsibility 1', 'Responsibility 2']
      }
    ]
  })
}))

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        experience: {
          period: 'Period',
          location: 'Location',
          achievements: 'Key achievements',
          scope: 'Scope',
          stack: 'Stack'
        }
      },
      es: {
        experience: {
          period: 'Período',
          location: 'Ubicación',
          achievements: 'Logros clave',
          scope: 'Alcance',
          stack: 'Stack'
        }
      }
    }
  })
}

describe('Experience.vue', () => {
  it('renders the experience timeline container', () => {
    const i18n = createTestI18n()
    const { container } = render(Experience, {
      global: {
        plugins: [i18n],
      },
    })

    expect(container.querySelector('.timeline')).toBeInTheDocument()
  })

  it('renders experience timeline', () => {
    const i18n = createTestI18n()
    const { container } = render(Experience, {
      global: {
        plugins: [i18n],
      },
    })

    expect(container.querySelector('.timeline-list')).toBeInTheDocument()
  })

  it('renders multiple experience items', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const experienceItems = screen.getAllByRole('listitem')
    expect(experienceItems.length).toBeGreaterThan(0)
  })

  it('renders job titles', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for common job titles that should be present
    const jobTitles = screen.getAllByRole('heading', { level: 3 })
    expect(jobTitles.length).toBeGreaterThan(0)
  })

  it('renders company names', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for company information
    const companyElements = screen.getAllByText(/Company|Corporation|Inc|LLC/i)
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it('renders job dates', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for date patterns
    const dateElements = screen.getAllByText(/\d{4}/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('renders job descriptions', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for responsibility content from mock data
    expect(screen.getByText('Primary achievement')).toBeInTheDocument()
    expect(screen.getByText('Secondary achievement')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n],
      },
    })

    expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('list').length).toBeGreaterThan(0)
  })

  it('renders timeline with proper styling', () => {
    const i18n = createTestI18n()
    const { container } = render(Experience, {
      global: {
        plugins: [i18n],
      },
    })

    expect(container.querySelector('.timeline')).toHaveClass('timeline')
  })

  it('displays English content when locale is English', () => {
    const i18n = createTestI18n('en')
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('Senior role summary for the test.')).toBeInTheDocument()
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Primary achievement')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })

  it('displays Spanish content when locale is Spanish', () => {
    const i18n = createTestI18n('es')
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(screen.getByText('Ingeniero de Software')).toBeInTheDocument()
    expect(screen.getByText('Test Company ES')).toBeInTheDocument()
    expect(screen.getByText('Resumen senior del rol en español.')).toBeInTheDocument()
    expect(screen.getByText('Liderazgo')).toBeInTheDocument()
    expect(screen.getByText('Logro principal ES')).toBeInTheDocument()
  })

  it('falls back to responsibilities when curated achievements are not present', () => {
    getWorkExperience.mockReturnValueOnce([
      {
        company: 'Legacy Company',
        position: 'Legacy Engineer',
        period: '2018 - 2019',
        responsibilities: ['Legacy responsibility 1', 'Legacy responsibility 2', 'Legacy responsibility 3', 'Legacy responsibility 4']
      }
    ])

    const i18n = createTestI18n('en')
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })

    expect(screen.getByText('Legacy responsibility 1')).toBeInTheDocument()
    expect(screen.getByText('Legacy responsibility 3')).toBeInTheDocument()
    expect(screen.queryByText('Legacy responsibility 4')).not.toBeInTheDocument()
  })

  it('displays translated labels in English', () => {
    const i18n = createTestI18n('en')
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(screen.getByText(/Period:/)).toBeInTheDocument()
    expect(screen.getByText(/Location:/)).toBeInTheDocument()
  })

  it('displays translated labels in Spanish', () => {
    const i18n = createTestI18n('es')
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    
    expect(screen.getByText(/Período:/)).toBeInTheDocument()
    expect(screen.getByText(/Ubicación:/)).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
