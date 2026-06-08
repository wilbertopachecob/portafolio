import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Credentials from '@/components/Credentials.vue'

vi.mock('@/i18n/content', () => ({
  getCredentials: vi.fn(() => ({
    education: [
      {
        institution: 'University of Informatic Sciences',
        degree: 'Computer Science Engineer',
        period: '2005 - 2010',
        link: 'https://www.uci.cu/',
      },
    ],
    languages: [
      {
        name: 'Spanish',
        level: 'Native',
        description: 'Primary language.',
        flag: 'spanish_flag.png',
      },
      {
        name: 'English',
        level: 'Professional / bilingual',
        description: 'Professional language.',
        flag: 'english_flag.png',
      },
    ],
    certifications: [
      {
        issuer: 'Amazon Web Services (AWS)',
        title: 'AWS Certified Cloud Practitioner',
        date: '14/12/2020',
        link: 'https://www.credly.com/',
        conciseDescription: 'Cloud foundation.',
      },
    ],
  })),
}))

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      sections: {
        credentials: {
          title: 'Credentials',
        },
      },
      credentials: {
        educationTitle: 'Education',
        languagesTitle: 'Languages applied to product',
        certificationsTitle: 'Certifications',
        languageNote: 'I build in Spanish and English.',
      },
      education: {
        period: 'Period',
        visitWebsite: 'Visit {institution} website',
      },
      certifications: {
        issued: 'Issued',
        visitWebsite: 'Visit {issuer} website',
      },
      languages: {
        flagAlt: 'Flag of {language}',
      },
    },
  },
})

describe('Credentials.vue', () => {
  it('renders compact education, languages, and certifications', () => {
    render(Credentials, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('region', { name: 'Credentials' })).toBeInTheDocument()
    expect(screen.getByText('University of Informatic Sciences')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('Professional / bilingual')).toBeInTheDocument()
    expect(screen.getByText('AWS Certified Cloud Practitioner')).toBeInTheDocument()
  })

  it('keeps credential links accessible', () => {
    render(Credentials, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('link', { name: /University of Informatic Sciences/ })).toHaveAttribute('href', 'https://www.uci.cu/')
    expect(screen.getByRole('link', { name: /Amazon Web Services/ })).toHaveAttribute('href', 'https://www.credly.com/')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(Credentials, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
