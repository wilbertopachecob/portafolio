import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Skills from '@/components/Skills.vue'

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
        },
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
        },
      },
    },
  })
}

describe('Skills.vue', () => {
  it('renders the skills container', () => {
    const i18n = createTestI18n()
    const { container } = render(Skills, {
      global: {
        plugins: [i18n],
      },
    })

    expect(container.querySelector('.cap-wrap')).toBeInTheDocument()
  })

  it('renders multiple skill categories', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })

    const skillCategories = screen.getAllByRole('listitem')
    expect(skillCategories.length).toBeGreaterThan(1)
  })

  it('renders product engineering category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    expect(screen.getByText(/Product engineering/)).toBeInTheDocument()
  })

  it('renders mobile product delivery category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    expect(screen.getByText(/Mobile and product delivery/)).toBeInTheDocument()
  })

  it('renders modernization category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    expect(screen.getByText(/Modernization and architecture/)).toBeInTheDocument()
  })

  it('renders platform category', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    expect(screen.getByText(/Platform, data, and cloud/)).toBeInTheDocument()
  })

  it('renders skill names', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })

    const techNames = screen.getAllByText(/JavaScript|TypeScript|Vue\.js|React|Node\.js|AWS/i)
    expect(techNames.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure with native lists', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })

    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(0)
  })

  it('renders capability index labels', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
  })

  it('renders specific product engineering capabilities', () => {
    const i18n = createTestI18n()
    render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(Skills, {
      global: {
        plugins: [i18n],
      },
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
