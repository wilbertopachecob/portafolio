import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Education from '@/components/Education.vue'

describe('Education.vue', () => {
  it('renders education section', () => {
    render(Education)
    const educationSection = screen.getByRole('region')
    expect(educationSection).toBeInTheDocument()
    expect(educationSection).toHaveAttribute('aria-labelledby', 'education-heading')
  })

  it('renders education heading', () => {
    render(Education)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('sr-only')
    expect(heading).toHaveAttribute('id', 'education-heading')
  })

  it('renders education container', () => {
    render(Education)
    const container = screen.getByRole('list')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('education-container')
  })

  it('renders education cards', () => {
    render(Education)
    const educationCards = screen.getAllByRole('listitem')
    expect(educationCards.length).toBeGreaterThan(0)
  })

  it('renders institution names', () => {
    render(Education)
    expect(screen.getByText('University of Informatic Sciences')).toBeInTheDocument()
  })

  it('renders degree titles', () => {
    render(Education)
    expect(screen.getByText('Computer Science Engineer')).toBeInTheDocument()
  })

  it('renders education periods', () => {
    render(Education)
    expect(screen.getByText(/Period: 2005 - 2010/)).toBeInTheDocument()
  })

  it('renders institution links', () => {
    render(Education)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.uci.cu/')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders institution logos', () => {
    render(Education)
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('alt', 'University of Informatic Sciences logo')
  })
}) 