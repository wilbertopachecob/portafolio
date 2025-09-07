import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe, toHaveNoViolations } from 'jest-axe'
import Experience from '@/components/Experience.vue'

expect.extend(toHaveNoViolations)

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
          achievements: 'Key achievements and responsibilities'
        }
      },
      es: {
        experience: {
          period: 'Período',
          location: 'Ubicación',
          achievements: 'Logros clave y responsabilidades'
        }
      }
    }
  })
}

describe('Experience.vue', () => {
  it('renders the experience section', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const section = screen.getByRole('region', { name: /work experience/i })
    expect(section).toBeInTheDocument()
  })

  it('renders the section title', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Work Experience/)).toBeInTheDocument()
  })

  it('renders the section subtitle', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    // The component renders "Work Experience Timeline" as the heading
    expect(screen.getByText(/Work Experience Timeline/)).toBeInTheDocument()
  })

  it('renders experience timeline', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const timeline = screen.getByRole('region')
    expect(timeline).toBeInTheDocument()
    expect(timeline).toHaveClass('timeline')
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
    expect(screen.getByText('Responsibility 1')).toBeInTheDocument()
    expect(screen.getByText('Responsibility 2')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby')
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveAttribute('id')
  })

  it('has proper semantic structure', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const experienceSection = screen.getByRole('region')
    expect(experienceSection).toHaveAttribute('aria-labelledby', 'experience-heading')
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'experience-heading')
  })

  it('renders timeline with proper styling', () => {
    const i18n = createTestI18n()
    render(Experience, {
      global: {
        plugins: [i18n]
      }
    })
    const timeline = screen.getByRole('region')
    expect(timeline).toHaveClass('timeline')
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
    expect(screen.getByText('Responsibility 1')).toBeInTheDocument()
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
    expect(screen.getByText('Responsabilidad 1')).toBeInTheDocument()
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