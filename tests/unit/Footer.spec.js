import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('renders copyright information', () => {
    render(Footer)
    expect(screen.getByText(/Copyright ©/)).toBeInTheDocument()
    expect(screen.getByText(/Wilberto Pacheco Batista/)).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders current year', () => {
    render(Footer)
    const currentYear = new Date().getFullYear().toString()
    const copyrightText = screen.getByText(/Copyright ©/)
    expect(copyrightText.textContent).toContain(currentYear)
  })

  it('renders scroll to top button', () => {
    render(Footer)
    const scrollButton = screen.getByTitle('Scroll to Top')
    expect(scrollButton).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(Footer)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('has proper styling classes', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-primary', 'f-container')
  })

  it('scroll to top button has proper styling', () => {
    render(Footer)
    const scrollButton = screen.getByTitle('Scroll to Top')
    expect(scrollButton).toHaveClass('mt-3', 'to-top-button', 'bounce')
  })

  it('copyright text has proper styling', () => {
    render(Footer)
    const copyrightText = screen.getByText(/Copyright ©/)
    expect(copyrightText).toHaveClass('mb-0')
  })
}) 