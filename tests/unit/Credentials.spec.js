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
    certifications: [
      {
        issuer: 'Amazon Web Services (AWS)',
        title: 'AWS Certified Cloud Practitioner',
        date: 'December 2020',
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
          title: 'Education and certifications',
        },
      },
      credentials: {
        educationTitle: 'Education',
        languagesTitle: 'Languages applied to product',
        certificationsTitle: 'Certifications',
        languageNote: 'Native Spanish and professional / bilingual English. I build and write products in both languages.',
      },
      education: {
        period: 'Period',
        visitWebsite: 'Visit {institution} website',
      },
      certifications: {
        issued: 'Issued',
        visitWebsite: 'Visit {issuer} website',
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

    expect(screen.getByRole('region', { name: 'Education and certifications' })).toBeInTheDocument()
    expect(screen.getByText('University of Informatic Sciences')).toBeInTheDocument()
    expect(screen.getByText(/Native Spanish and professional \/ bilingual English/)).toBeInTheDocument()
    expect(screen.getByText('AWS Certified Cloud Practitioner')).toBeInTheDocument()
    expect(screen.getByText('Issued: December 2020')).toBeInTheDocument()
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
