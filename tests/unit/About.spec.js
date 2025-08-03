import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
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
          subtitle: 'Software Engineer',
          description: 'Bilingual Full Stack Web Developer with a degree in Computer Science (2010) and a passion for solving complex technical challenges. My goal is to excel at my job by delivering impactful solutions that increase company performance and contribute to my personal growth.',
          viewExperience: 'View Experience',
          viewSkills: 'View Skills'
        }
      },
      es: {
        hero: {
          title: 'Wilberto Pacheco',
          subtitle: 'Ingeniero de Software',
          description: 'Desarrollador Web Full Stack Bilingüe con un título en Ciencias de la Computación (2010) y una pasión por resolver desafíos técnicos complejos. Mi objetivo es sobresalir en mi trabajo entregando soluciones impactantes que aumenten el rendimiento de la empresa y contribuyan a mi crecimiento personal.',
          viewExperience: 'Ver Experiencia',
          viewSkills: 'Ver Habilidades'
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
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    const i18n = createTestI18n()
    render(About, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Bilingual Full Stack Web Developer/)).toBeInTheDocument()
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
    expect(screen.getByRole('link', { name: /View Experience/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View Skills/ })).toBeInTheDocument()
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
}) 