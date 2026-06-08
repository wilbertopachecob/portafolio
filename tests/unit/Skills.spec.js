import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Skills from '@/components/Skills.vue'

// Mock FontAwesome components
vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span data-testid="font-awesome-icon" :aria-label="$attrs[\'aria-label\']" :aria-hidden="$attrs[\'aria-hidden\']"></span>',
    props: ['icon', 'aria-label', 'aria-hidden']
  }
}))

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        sections: {
          skills: {
            title: 'Technical capabilities',
          },
        },
          skills: {
            productEngineering: 'Product engineering',
            mobileProductDelivery: 'Mobile and product delivery',
            modernizationArchitecture: 'Modernization and architecture',
            platformData: 'Platform, data, and cloud',
          }
      },
      es: {
        sections: {
          skills: {
            title: 'Capacidades técnicas',
          },
        },
          skills: {
            productEngineering: 'Ingeniería de producto',
            mobileProductDelivery: 'Mobile y entrega de producto',
            modernizationArchitecture: 'Modernización y arquitectura',
            platformData: 'Plataforma, datos y cloud',
          }
      }
    }
  })
}

describe('Skills.vue', () => {
  it('renders the skills section', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const section = screen.getByRole('region', { name: /technical capabilities/i })
    expect(section).toBeInTheDocument()
  })

  it('renders the section title', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Technical capabilities/)).toBeInTheDocument()
  })

  it('renders skills container', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const container = screen.getByRole('region', { name: /technical capabilities/i })
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('skills-container')
  })

  it('renders multiple skill categories', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const skillCategories = screen.getAllByRole('listitem')
    expect(skillCategories.length).toBeGreaterThan(1) // At least 2 categories
  })

  it('renders product engineering category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Product engineering/)).toBeInTheDocument()
  })

  it('renders mobile product delivery category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Mobile and product delivery/)).toBeInTheDocument()
  })

  it('renders modernization category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Modernization and architecture/)).toBeInTheDocument()
  })

  it('renders platform category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Platform, data, and cloud/)).toBeInTheDocument()
  })

  it('renders skill items', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const skillItems = screen.getAllByRole('listitem')
    expect(skillItems.length).toBeGreaterThan(0)
  })

  it('renders skill names', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for common technology names
    const techNames = screen.getAllByText(/JavaScript|TypeScript|Vue\.js|React|Node\.js|AWS/i)
    expect(techNames.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(Skills, {
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
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('renders skill icons', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    // Look for font-awesome icons using test ID
    const icons = screen.getAllByTestId('font-awesome-icon')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders specific product engineering capabilities', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders specific mobile product delivery capabilities', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('React Native')).toBeInTheDocument()
    expect(screen.getByText('Expo')).toBeInTheDocument()
    expect(screen.getByText('i18n')).toBeInTheDocument()
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
  })

  it('renders specific modernization capabilities', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Go')).toBeInTheDocument()
    expect(screen.getByText('REST APIs')).toBeInTheDocument()
    expect(screen.getByText('Legacy migrations')).toBeInTheDocument()
  })

  it('renders specific platform capabilities', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('SQL / MySQL')).toBeInTheDocument()
    expect(screen.getByText('Redis')).toBeInTheDocument()
    expect(screen.getByText('Elasticsearch')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 
