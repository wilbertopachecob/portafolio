import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Experience from '@/components/Experience.vue'

describe('Experience.vue', () => {
  it('renders the experience section', () => {
    render(Experience)
    const section = screen.getByRole('region', { name: /work experience/i })
    expect(section).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(Experience)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Work Experience/)).toBeInTheDocument()
  })

  it('renders the section subtitle', () => {
    render(Experience)
    expect(screen.getByText(/My professional journey/)).toBeInTheDocument()
  })

  it('renders experience timeline', () => {
    render(Experience)
    const timeline = screen.getByRole('list')
    expect(timeline).toBeInTheDocument()
    expect(timeline).toHaveClass('timeline')
  })

  it('renders multiple experience items', () => {
    render(Experience)
    const experienceItems = screen.getAllByRole('listitem')
    expect(experienceItems.length).toBeGreaterThan(0)
  })

  it('renders job titles', () => {
    render(Experience)
    // Look for common job titles that should be present
    const jobTitles = screen.getAllByRole('heading', { level: 3 })
    expect(jobTitles.length).toBeGreaterThan(0)
  })

  it('renders company names', () => {
    render(Experience)
    // Look for company information
    const companyElements = screen.getAllByText(/Company|Corporation|Inc|LLC/i)
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it('renders job dates', () => {
    render(Experience)
    // Look for date patterns
    const dateElements = screen.getAllByText(/\d{4}/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('renders job descriptions', () => {
    render(Experience)
    // Look for description content
    const descriptions = screen.getAllByText(/Developed|Implemented|Managed|Created/i)
    expect(descriptions.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    render(Experience)
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby')
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveAttribute('id')
  })

  it('has proper semantic structure', () => {
    render(Experience)
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
}) 