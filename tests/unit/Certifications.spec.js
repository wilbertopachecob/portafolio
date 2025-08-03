import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Certifications from '@/components/Certifications.vue'

describe('Certifications.vue', () => {
  it('renders certifications section', () => {
    render(Certifications)
    const certificationsSection = screen.getByRole('region')
    expect(certificationsSection).toBeInTheDocument()
    expect(certificationsSection).toHaveAttribute('aria-labelledby', 'certifications-heading')
  })

  it('renders certifications heading', () => {
    render(Certifications)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('sr-only')
    expect(heading).toHaveAttribute('id', 'certifications-heading')
  })

  it('renders certifications container', () => {
    render(Certifications)
    // Use getAllByRole and check the first one (main certifications container)
    const containers = screen.getAllByRole('list')
    const mainContainer = containers[0] // First list is the main certifications container
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('certifications-container')
  })

  it('renders certification cards', () => {
    render(Certifications)
    const certificationCards = screen.getAllByRole('listitem')
    expect(certificationCards.length).toBeGreaterThan(0)
  })

  it('renders certification issuer names', () => {
    render(Certifications)
    expect(screen.getByText('Centre for Development of Advanced Computing')).toBeInTheDocument()
  })

  it('renders certification titles', () => {
    render(Certifications)
    expect(screen.getByText('Specialized Training Programme in Multimedia and Web Design Technology')).toBeInTheDocument()
  })

  it('renders certification dates', () => {
    render(Certifications)
    expect(screen.getByText(/Issued: 6\/10\/2016/)).toBeInTheDocument()
  })

  it('renders certification descriptions', () => {
    render(Certifications)
    expect(screen.getByText(/This was an intensive 3 months program/)).toBeInTheDocument()
  })

  it('renders skills covered section', () => {
    render(Certifications)
    // Use getAllByText and check that at least one exists
    const skillsHeaders = screen.getAllByText('Skills Covered:')
    expect(skillsHeaders.length).toBeGreaterThan(0)
  })

  it('renders skills list', () => {
    render(Certifications)
    expect(screen.getByText('Adobe Photoshop')).toBeInTheDocument()
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    expect(screen.getByText('CSS3')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('jQuery')).toBeInTheDocument()
    expect(screen.getByText('Wordpress')).toBeInTheDocument()
  })

  it('renders certificate number', () => {
    render(Certifications)
    expect(screen.getByText(/Certificate No\. CDAC\(M\)\/16-17\/ITEC-MWDT\/7725/)).toBeInTheDocument()
  })
}) 