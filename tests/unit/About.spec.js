import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import About from '@/components/About.vue'

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
          profileAlt: 'Wilberto Pacheco Batista profile photo'
        },
        contact: {
          letsTalk: "Let's talk"
        }
      },
      es: {
        hero: {
          title: 'Wilberto Pacheco',
          subtitle: 'Software Engineer enfocado en producto, modernización y entrega end-to-end',
          description: 'Ingeniero de software bilingüe con 15+ años construyendo productos full stack, modernizando plataformas heredadas y liderando iniciativas técnicas.',
          viewImpact: 'Ver impacto profesional',
          viewProducts: 'Ver productos construidos',
          profileAlt: 'Foto de perfil de Wilberto Pacheco Batista'
        },
        contact: {
          letsTalk: 'Hablemos'
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

  it('renders the profile photo', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    const profilePhoto = screen.getByRole('img', { name: /Wilberto Pacheco Batista profile photo/ })
    expect(profilePhoto).toBeInTheDocument()
    expect(profilePhoto).toHaveAttribute('width', '128')
    expect(profilePhoto).toHaveAttribute('height', '128')
    expect(profilePhoto).toHaveAttribute('loading', 'eager')
  })

  it('does not render contact information in the hero', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.queryByRole('link', { name: /wilbertopachecob@gmail.com/ })).not.toBeInTheDocument()
    expect(screen.queryByText('Broken Arrow, OK')).not.toBeInTheDocument()
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

  it('renders two call to action buttons', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByRole('link', { name: /View professional impact/ })).toHaveAttribute('href', '#impact')
    expect(screen.getByRole('link', { name: /Let's talk/ })).toHaveAttribute('href', 'mailto:wilbertopachecob@gmail.com')
    expect(screen.queryByRole('link', { name: /View shipped products/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Download Resume/ })).not.toBeInTheDocument()
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
