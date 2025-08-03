import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import About from '@/components/About.vue'

describe('About.vue', () => {
  it('renders the hero title', () => {
    render(About)
    expect(screen.getByText(/Wilberto Pacheco/)).toBeInTheDocument()
    expect(screen.getByText(/Batista/)).toBeInTheDocument()
  })

  it('renders the hero subtitle', () => {
    render(About)
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(About)
    expect(screen.getByText(/Bilingual Full Stack Web Developer/)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(About)
    const emailLink = screen.getByRole('link', { name: /wilbertopachecob@gmail.com/ })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:wilbertopachecob@gmail.com')
  })

  it('renders social links', () => {
    render(About)
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /X \(Twitter\)/ })).toBeInTheDocument()
  })

  it('renders call to action buttons', () => {
    render(About)
    expect(screen.getByRole('link', { name: /View work experience/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View technical skills/ })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(About)
    const section = screen.getByRole('banner')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title')
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveAttribute('id', 'hero-title')
  })

  it('has proper semantic structure', () => {
    render(About)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
}) 