import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import About from '@/components/About.vue'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        hero: {
          title: 'Wilberto Pacheco',
          subtitle: 'Software Engineer focused on product, modernization, and end-to-end delivery',
          description: 'Bilingual software engineer with 15+ years building full stack products, modernizing legacy platforms, and leading technical initiatives across health tech, web, and mobile.',
          viewImpact: 'View professional impact',
          viewProducts: 'View shipped products',
          downloadResume: 'Download Resume'
        }
      },
      es: {
        hero: {
          title: 'Wilberto Pacheco',
          subtitle: 'Software Engineer enfocado en producto, modernización y entrega end-to-end',
          description: 'Ingeniero de software bilingüe con 15+ años construyendo productos full stack, modernizando plataformas heredadas y liderando iniciativas técnicas.',
          viewImpact: 'Ver impacto profesional',
          viewProducts: 'Ver productos construidos',
          downloadResume: 'Descargar CV'
        }
      }
    }
  })
}

describe('About.vue', () => {
  it('renders the hero title', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Wilberto Pacheco/)).toBeInTheDocument()
    expect(screen.getByText(/Batista/)).toBeInTheDocument()
  })

  it('renders the hero subtitle', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Software Engineer focused on product, modernization, and end-to-end delivery')).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Bilingual software engineer with 15\+ years/)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    const emailLink = screen.getByRole('link', { name: /wilbertopachecob@gmail.com/ })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:wilbertopachecob@gmail.com')
  })

  it('renders social links', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /X \(Twitter\)/ })).toBeInTheDocument()
  })

  it('renders call to action buttons', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('link', { name: /View professional impact/ })).toHaveAttribute('href', '#impact')
    expect(screen.getByRole('link', { name: /View shipped products/ })).toHaveAttribute('href', '#portfolio')
    expect(screen.getByRole('link', { name: /Download Resume/ })).toHaveAttribute('href', getPublicAssetUrl(RESUME_FILENAME))
  })

  it('has proper accessibility attributes', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    const section = screen.getByRole('banner')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title')
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveAttribute('id', 'hero-title')
  })

  it('has proper semantic structure', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const i18n = createTestI18n()
    const { container } = render(About, {
      global: {
        plugins: [i18n]
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
