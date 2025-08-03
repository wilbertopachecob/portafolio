import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Footer from '@/components/Footer.vue'

// Mock FontAwesome components
vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span data-testid="font-awesome-icon" :title="$attrs.title" @click="$emit(\'click\')"></span>',
    props: ['icon', 'title'],
    emits: ['click']
  }
}))

// Helper function to render Footer with i18n mock
const renderFooter = (options = {}) => {
  return render(Footer, {
    global: {
      mocks: {
        $t: (msg) => msg // Simple passthrough mock
      }
    },
    ...options
  })
}

describe('Footer.vue', () => {
  it('renders copyright information', () => {
    renderFooter()
    const copyright = screen.getByText(/Copyright © \d{4} Wilberto Pacheco Batista/)
    expect(copyright).toBeInTheDocument()
  })

  it('renders rights reserved text', () => {
    renderFooter()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders scroll to top button', () => {
    renderFooter()
    const scrollButton = screen.getByTestId('font-awesome-icon')
    expect(scrollButton).toBeInTheDocument()
    expect(scrollButton).toHaveAttribute('title', 'Scroll to Top')
  })

  it('has proper semantic structure', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    renderFooter()
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(`Copyright © ${currentYear}`))
    expect(copyright).toBeInTheDocument()
  })

  it('renders footer with proper styling classes', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-primary', 'f-container')
  })

  it('renders scroll to top button with proper styling', () => {
    renderFooter()
    const scrollButton = screen.getByTestId('font-awesome-icon')
    expect(scrollButton).toHaveClass('mt-3', 'to-top-button', 'bounce')
  })

  it('renders download resume link with translation', () => {
    renderFooter()
    const downloadLink = screen.getByText('hero.downloadResume')
    expect(downloadLink).toBeInTheDocument()
    expect(downloadLink.closest('a')).toHaveAttribute('href', '/Engineer_Wilberto_Pacheco_Batista.pdf')
    expect(downloadLink.closest('a')).toHaveAttribute('download', 'Engineer_Wilberto_Pacheco_Batista.pdf')
  })
}) 