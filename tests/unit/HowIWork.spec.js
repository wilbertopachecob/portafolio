import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import HowIWork from '@/components/HowIWork.vue'

vi.mock('@/i18n/content', () => ({
  getHowIWorkPrinciples: vi.fn(() => [
    {
      title: 'Ship small, learn fast',
      description: 'Validate with real users before adding complexity.',
    },
    {
      title: 'Simple, observable systems',
      description: 'Prefer maintainable systems over clever abstractions.',
    },
    {
      title: 'Modernize without breaking the business',
      description: 'Reduce risk while improving platforms.',
    },
    {
      title: 'Bilingual product context',
      description: 'Design for real Spanish/English users.',
    },
    {
      title: 'Automation with purpose',
      description: 'Use AI when it removes real friction.',
    },
  ]),
}))

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      sections: {
        howIWork: {
          title: 'How I work',
        },
      },
    },
  },
})

describe('HowIWork.vue', () => {
  it('renders engineering principles', () => {
    render(HowIWork, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getByText('Ship small, learn fast')).toBeInTheDocument()
    expect(screen.getByText('Modernize without breaking the business')).toBeInTheDocument()
  })

  it('renders a native principles list', () => {
    const { container } = render(HowIWork, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(container.querySelector('.how-i-work')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(HowIWork, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
