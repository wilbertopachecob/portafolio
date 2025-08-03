import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import Certifications from '@/components/Certifications.vue'

// Mock the content module
vi.mock('@/i18n/content', () => ({
  getCertifications: vi.fn((locale) => {
    if (locale === 'en') {
      return [
        {
          issuer: 'Amazon Web Services (AWS)',
          title: 'AWS Certified Cloud Practitioner',
          date: '12/14/2020',
          link: 'https://www.youracclaim.com/users/wilberto-pacheco-batista',
          description: 'Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.',
          skills: [
            'Amazon Web Services',
            'Cloud Computing',
            'Cloud Platform',
            'Cloud Services'
          ]
        },
        {
          issuer: 'Centre for Development of Advanced Computing',
          title: 'Specialized Training Programme in Multimedia and Web Design Technology',
          date: '6/10/2016',
          link: 'https://www.cdac.in/',
          certificateNumber: 'Certificate No. CDAC(M)/16-17/ITEC-MWDT/7725',
          description: 'This was an intensive 3 months program in the Centre for Development of Advanced Computing in Mohali, Chandigarh, India to master different tools to create multimedia like:',
          skills: [
            'Adobe Photoshop',
            'HTML5',
            'CSS3',
            'JavaScript',
            'jQuery',
            'Wordpress'
          ]
        }
      ]
    } else {
      return [
        {
          issuer: 'Amazon Web Services (AWS)',
          title: 'AWS Certified Cloud Practitioner',
          date: '12/14/2020',
          link: 'https://www.youracclaim.com/users/wilberto-pacheco-batista',
          description: 'Los titulares de esta certificación tienen una comprensión fundamental de los servicios de TI y sus usos en AWS Cloud. Demostraron fluidez en la nube y conocimiento fundamental de AWS. Los propietarios de insignias pueden identificar servicios esenciales de AWS necesarios para configurar proyectos enfocados en AWS.',
          skills: [
            'Amazon Web Services',
            'Cloud Computing',
            'Cloud Platform',
            'Cloud Services'
          ]
        },
        {
          issuer: 'Centre for Development of Advanced Computing',
          title: 'Specialized Training Programme in Multimedia and Web Design Technology',
          date: '6/10/2016',
          link: 'https://www.cdac.in/',
          certificateNumber: 'Certificate No. CDAC(M)/16-17/ITEC-MWDT/7725',
          description: 'Este fue un programa intensivo de 3 meses en el Centre for Development of Advanced Computing en Mohali, Chandigarh, India para dominar diferentes herramientas para crear multimedia como:',
          skills: [
            'Adobe Photoshop',
            'HTML5',
            'CSS3',
            'JavaScript',
            'jQuery',
            'Wordpress'
          ]
        }
      ]
    }
  })
}))

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        certifications: {
          issued: 'Issued',
          skillsCovered: 'Skills Covered',
          visitWebsite: 'Visit {issuer} website',
          badgeAlt: '{issuer} certification badge',
          badgeLabel: 'Badge for {title} certification from {issuer}'
        }
      },
      es: {
        certifications: {
          issued: 'Emitido',
          skillsCovered: 'Habilidades Cubiertas',
          visitWebsite: 'Visitar sitio web de {issuer}',
          badgeAlt: 'Insignia de certificación de {issuer}',
          badgeLabel: 'Insignia para certificación {title} de {issuer}'
        }
      }
    }
  })
}

describe('Certifications.vue', () => {
  it('renders certifications section', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    const certificationsSection = screen.getByRole('region')
    expect(certificationsSection).toBeInTheDocument()
    expect(certificationsSection).toHaveAttribute('aria-labelledby', 'certifications-heading')
  })

  it('renders certifications heading', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('sr-only')
    expect(heading).toHaveAttribute('id', 'certifications-heading')
  })

  it('renders certifications container', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    // Use getAllByRole and check the first one (main certifications container)
    const containers = screen.getAllByRole('list')
    const mainContainer = containers[0] // First list is the main certifications container
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('certifications-container')
  })

  it('renders certification cards', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    const certificationCards = screen.getAllByRole('listitem')
    expect(certificationCards.length).toBeGreaterThan(0)
  })

  it('renders certification issuer names', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Centre for Development of Advanced Computing')).toBeInTheDocument()
  })

  it('renders certification titles', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Specialized Training Programme in Multimedia and Web Design Technology')).toBeInTheDocument()
  })

  it('renders certification dates', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Issued: 6\/10\/2016/)).toBeInTheDocument()
  })

  it('renders certification descriptions', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/This was an intensive 3 months program/)).toBeInTheDocument()
  })

  it('renders skills covered section', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    // Use getAllByText and check that at least one exists
    const skillsHeaders = screen.getAllByText('Skills Covered:')
    expect(skillsHeaders.length).toBeGreaterThan(0)
  })

  it('renders skills list', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('Adobe Photoshop')).toBeInTheDocument()
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    expect(screen.getByText('CSS3')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('jQuery')).toBeInTheDocument()
    expect(screen.getByText('Wordpress')).toBeInTheDocument()
  })

  it('renders certificate number', () => {
    const i18n = createTestI18n()
    render(Certifications, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(/Certificate No\. CDAC\(M\)\/16-17\/ITEC-MWDT\/7725/)).toBeInTheDocument()
  })
}) 