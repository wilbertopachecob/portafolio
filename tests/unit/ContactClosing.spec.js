import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import ContactClosing from '@/components/ContactClosing.vue'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      hero: {
        downloadResume: 'Download Resume',
      },
      contact: {
        headline: 'I help teams turn complex systems into clear products.',
        letsTalk: "Let's talk",
        viewLinkedIn: 'View LinkedIn',
        linkedInUrl: 'https://www.linkedin.com/in/wilberto-pacheco-batista/',
        actions: 'Contact actions',
      },
    },
  },
})

describe('ContactClosing.vue', () => {
  it('renders the closing headline and contact actions', () => {
    render(ContactClosing, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    expect(screen.getByRole('heading', { level: 2, name: /complex systems/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: "Let's talk" })).toHaveAttribute('href', 'mailto:wilbertopachecob@gmail.com')
    expect(screen.getByRole('link', { name: 'View LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/wilberto-pacheco-batista/')
    expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('href', getPublicAssetUrl(RESUME_FILENAME))
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(ContactClosing, {
      global: {
        plugins: [createTestI18n()],
      },
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
