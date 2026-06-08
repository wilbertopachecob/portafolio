import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Impact from '@/components/Impact.vue'

vi.mock('@/i18n/content', () => ({
  getImpactHighlights: vi.fn(() => [
    {
      metric: '15+ years',
      title: 'Building full stack software',
      description: 'Senior proof point description.',
    },
    {
      metric: 'Lead scope',
      title: 'Technical leadership',
      description: 'Leadership proof point description.',
    },
    {
      metric: 'Modernization',
      title: 'Migrations and technical debt reduction',
      description: 'Modernization proof point description.',
    },
    {
      metric: 'Shipped',
      title: 'Personal products',
      description: 'Product proof point description.',
    },
  ]),
}))

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      sections: {
        impact: {
          title: 'Impact',
        },
      },
    },
  },
})

describe('Impact.vue', () => {
  it('renders four senior proof points', () => {
    render(Impact, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByText('15+ years')).toBeInTheDocument()
    expect(screen.getByText('Technical leadership')).toBeInTheDocument()
    expect(screen.getByText('Personal products')).toBeInTheDocument()
  })

  it('uses the impact label for the proof point list', () => {
    render(Impact, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('list', { name: 'Impact' })).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(Impact, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
