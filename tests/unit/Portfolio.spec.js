import { render, screen, within } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Portfolio from '@/components/Portfolio.vue'

vi.mock('@/i18n/content', () => ({
  getPortfolioProjects: vi.fn(() => [
    {
      name: 'CiudadanoUSA',
      url: 'https://ciudadanousa.com/es/home',
      featured: true,
      type: 'mobile',
      description: 'Featured citizenship product.',
      problem: 'Citizenship prep is fragmented.',
      user: 'Spanish-speaking immigrants.',
      solution: 'A bilingual mobile app.',
      role: 'Product, design, mobile, backend.',
      outcome: 'Published on iOS and Android.',
      highlights: ['USCIS-aligned study banks'],
      tags: ['React Native', 'Supabase'],
      screenshots: [
        {
          src: 'portfolio/ciudadanousa-home.png',
          alt: 'CiudadanoUSA home screen with study progress.',
        },
        {
          src: 'portfolio/ciudadanousa-n400.png',
          alt: 'N-400 practice screen.',
        },
      ],
    },
    {
      name: 'Renderlog',
      url: 'https://renderlog.dev/en/about',
      featured: true,
      type: 'blog',
      description: 'Featured technical writing product.',
      problem: 'Frontend content lacks production context.',
      user: 'Frontend developers.',
      solution: 'A bilingual technical blog.',
      role: 'Writing, frontend, i18n.',
      outcome: 'Self-hosted publishing platform.',
      highlights: ['Real production topics'],
      tags: ['Next.js', 'i18n'],
      screenshots: [
        {
          src: 'portfolio/renderlog-home.png',
          alt: 'Renderlog home page preview.',
        },
      ],
    },
    {
      name: 'paint.wilbertopachecob.dev',
      url: 'https://paint.wilbertopachecob.dev',
      featured: false,
      type: 'web',
      description: 'Canvas experiment.',
      highlights: [],
      tags: ['Canvas API'],
    },
  ]),
}))

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      sections: {
        portfolio: {
          title: 'Products',
        },
      },
      portfolio: {
        intro: 'Products and experiments intro.',
        featured: 'Featured product',
        experiments: 'Experiments and smaller projects',
        caseStudy: 'Product case study',
        problem: 'Problem',
        user: 'User',
        solution: 'Solution',
        role: 'My role',
        outcome: 'Outcome',
        highlights: 'Key highlights',
        technologies: 'Technologies',
        visitProject: 'Visit {name}',
        screenshots: '{name} screenshots',
        infrastructure: 'Self-hosted infrastructure note.',
        types: {
          mobile: 'Mobile app',
          blog: 'Blog',
          web: 'Web app',
        },
      },
    },
  },
})

describe('Portfolio.vue', () => {
  it('renders featured projects as product case studies', () => {
    render(Portfolio, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByText('CiudadanoUSA')).toBeInTheDocument()
    expect(screen.getByText('Renderlog')).toBeInTheDocument()
    expect(screen.getAllByText('Problem')).toHaveLength(2)
    expect(screen.getByText('Citizenship prep is fragmented.')).toBeInTheDocument()
    expect(screen.getByText('Published on iOS and Android.')).toBeInTheDocument()
  })

  it('separates experiments from featured products', () => {
    render(Portfolio, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const experiments = screen.getByRole('region', { name: 'Experiments and smaller projects' })
    expect(within(experiments).getByText('paint.wilbertopachecob.dev')).toBeInTheDocument()
    expect(within(experiments).queryByText('Problem')).not.toBeInTheDocument()
  })

  it('renders product screenshots for featured projects', () => {
    render(Portfolio, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('list', { name: 'CiudadanoUSA screenshots' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'CiudadanoUSA home screen with study progress.' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Renderlog home page preview.' })).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: /Canvas experiment/ })).not.toBeInTheDocument()
  })

  it('keeps project links accessible', () => {
    render(Portfolio, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('link', { name: /Visit CiudadanoUSA/ })).toHaveAttribute('href', 'https://ciudadanousa.com/es/home')
    expect(screen.getByRole('link', { name: /Visit paint/ })).toHaveAttribute('href', 'https://paint.wilbertopachecob.dev')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(Portfolio, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
