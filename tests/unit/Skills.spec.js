import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
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
        skills: {
          programmingLanguages: 'Programming Languages',
          frameworksLibraries: 'Frameworks & Libraries',
          databasesTools: 'Databases & Tools',
          cloudDevops: 'Cloud & DevOps',
          contentManagement: 'Content Management',
          developmentTools: 'Development Tools'
        }
      },
      es: {
        skills: {
          programmingLanguages: 'Lenguajes de Programación',
          frameworksLibraries: 'Frameworks y Librerías',
          databasesTools: 'Bases de Datos y Herramientas',
          cloudDevops: 'Cloud y DevOps',
          contentManagement: 'Gestión de Contenido',
          developmentTools: 'Herramientas de Desarrollo'
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
    const section = screen.getByRole('region', { name: /technical skills/i })
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
    expect(screen.getByText(/Technical Skills/)).toBeInTheDocument()
  })

  it('renders skills container', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    const container = screen.getByRole('region', { name: /technical skills/i })
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

  it('renders programming languages category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Programming Languages/)).toBeInTheDocument()
  })

  it('renders frameworks category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Frameworks & Libraries/)).toBeInTheDocument()
  })

  it('renders databases category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Databases & Tools/)).toBeInTheDocument()
  })

  it('renders cloud category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Cloud & DevOps/)).toBeInTheDocument()
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
    const techNames = screen.getAllByText(/JavaScript|Vue\.js|React|Node\.js|MySQL|AWS/i)
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

  it('renders specific programming languages', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
  })

  it('renders specific frameworks', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders specific databases', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('MySQL')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
  })

  it('renders specific cloud services', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
}) 