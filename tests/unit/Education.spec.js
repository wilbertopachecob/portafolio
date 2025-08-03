import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Education from '@/components/Education.vue'

describe('Education.vue', () => {
  it('renders the education section', () => {
    render(Education)
    const section = screen.getByRole('region', { name: /education/i })
    expect(section).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(Education)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Education/)).toBeInTheDocument()
  })

  it('renders the section subtitle', () => {
    render(Education)
    expect(screen.getByText(/Academic background/)).toBeInTheDocument()
  })

  it('renders education container', () => {
    render(Education)
    const container = screen.getByRole('region', { name: /education timeline/i })
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('education-container')
  })

  it('renders multiple education items', () => {
    render(Education)
    const educationItems = screen.getAllByRole('listitem')
    expect(educationItems.length).toBeGreaterThan(0)
  })

  it('renders degree information', () => {
    render(Education)
    // Look for degree-related text
    const degreeElements = screen.getAllByText(/Bachelor|Master|PhD|Computer Science|Engineering/i)
    expect(degreeElements.length).toBeGreaterThan(0)
  })

  it('renders university names', () => {
    render(Education)
    // Look for university information
    const universityElements = screen.getAllByText(/University|College|Institute/i)
    expect(universityElements.length).toBeGreaterThan(0)
  })

  it('renders graduation dates', () => {
    render(Education)
    // Look for date patterns
    const dateElements = screen.getAllByText(/\d{4}/)
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('renders GPA information', () => {
    render(Education)
    // Look for GPA-related text
    const gpaElements = screen.getAllByText(/GPA|Grade|Score/i)
    expect(gpaElements.length).toBeGreaterThan(0)
  })

  it('renders academic achievements', () => {
    render(Education)
    // Look for achievement-related text
    const achievementElements = screen.getAllByText(/Honors|Dean|Dean's List|Magna Cum Laude|Summa Cum Laude/i)
    expect(achievementElements.length).toBeGreaterThan(0)
  })

  it('renders course information', () => {
    render(Education)
    // Look for course-related text
    const courseElements = screen.getAllByText(/Course|Class|Subject|Curriculum/i)
    expect(courseElements.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    render(Education)
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby')
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveAttribute('id')
  })

  it('has proper semantic structure', () => {
    render(Education)
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders education timeline', () => {
    render(Education)
    const timeline = screen.getByRole('list')
    expect(timeline).toHaveClass('education-timeline')
  })

  it('renders education icons', () => {
    render(Education)
    // Look for education-related icons
    const icons = screen.getAllByRole('img') || screen.getAllByText(/🎓|📚|🏫/)
    expect(icons.length).toBeGreaterThan(0)
  })
}) 