import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('renders the footer', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(Footer)
    expect(screen.getByText(/© \d{4}/)).toBeInTheDocument()
    expect(screen.getByText(/Wilberto Pacheco/)).toBeInTheDocument()
  })

  it('renders rights reserved text', () => {
    render(Footer)
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(Footer)
    // Look for social media links
    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  it('renders LinkedIn link', () => {
    render(Footer)
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/)
  })

  it('renders GitHub link', () => {
    render(Footer)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', /github\.com/)
  })

  it('renders contact information', () => {
    render(Footer)
    // Look for contact information
    const contactElements = screen.getAllByText(/Contact|Email|Phone/i)
    expect(contactElements.length).toBeGreaterThan(0)
  })

  it('renders email link', () => {
    render(Footer)
    const emailLink = screen.getByRole('link', { name: /wilbertopachecob@gmail\.com/ })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:wilbertopachecob@gmail.com')
  })

  it('renders back to top link', () => {
    render(Footer)
    const backToTopLink = screen.getByRole('link', { name: /Back to top/i })
    expect(backToTopLink).toBeInTheDocument()
    expect(backToTopLink).toHaveAttribute('href', '#top')
  })

  it('has proper accessibility attributes', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(Footer)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders footer navigation', () => {
    render(Footer)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(Footer)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(2) // At least copyright, social, and back to top
  })

  it('renders footer icons', () => {
    render(Footer)
    // Look for social media icons
    const icons = screen.getAllByRole('img') || screen.getAllByText(/🔗|📧|⬆️/)
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders current year in copyright', () => {
    render(Footer)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })
}) 