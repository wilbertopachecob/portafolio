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

describe('Footer.vue', () => {
  it('renders the footer', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(Footer)
    const copyright = screen.getByText(/Copyright © \d{4} Wilberto Pacheco Batista/)
    expect(copyright).toBeInTheDocument()
  })

  it('renders rights reserved text', () => {
    render(Footer)
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders scroll to top button', () => {
    render(Footer)
    const scrollButton = document.querySelector('font-awesome-icon')
    expect(scrollButton).toBeInTheDocument()
    expect(scrollButton).toHaveAttribute('title', 'Scroll to Top')
  })

  it('has proper semantic structure', () => {
    render(Footer)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    render(Footer)
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(`Copyright © ${currentYear}`))
    expect(copyright).toBeInTheDocument()
  })

  it('renders footer with proper styling classes', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-primary', 'f-container')
  })

  it('renders scroll to top button with proper styling', () => {
    render(Footer)
    const scrollButton = document.querySelector('font-awesome-icon')
    expect(scrollButton).toHaveClass('mt-3', 'to-top-button', 'bounce')
  })
}) 