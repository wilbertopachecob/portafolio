import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Experience from '@/components/Experience.vue'

describe('Experience.vue', () => {
  it('renders experience section', () => {
    render(Experience)
    const experienceSection = screen.getByRole('region')
    expect(experienceSection).toBeInTheDocument()
    expect(experienceSection).toHaveAttribute('aria-labelledby', 'experience-heading')
  })

  it('renders experience heading', () => {
    render(Experience)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('sr-only')
    expect(heading).toHaveAttribute('id', 'experience-heading')
  })

  it('renders experience timeline', () => {
    render(Experience)
    // Use getAllByRole and check that we have multiple lists (timeline and achievement lists)
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('renders company names', () => {
    render(Experience)
    expect(screen.getByText('Included Health')).toBeInTheDocument()
    expect(screen.getByText('Velocigo Inc')).toBeInTheDocument()
  })

  it('renders job positions', () => {
    render(Experience)
    expect(screen.getByText('Software Engineer II')).toBeInTheDocument()
    expect(screen.getByText('Software Developer')).toBeInTheDocument()
  })

  it('renders timeline items', () => {
    render(Experience)
    const timelineItems = screen.getAllByRole('listitem')
    expect(timelineItems.length).toBeGreaterThan(0)
  })

  it('renders timeline content', () => {
    render(Experience)
    expect(screen.getByText(/May 2021 - Present/)).toBeInTheDocument()
    expect(screen.getByText(/March 2020 - February 2021/)).toBeInTheDocument()
  })

  it('renders location information', () => {
    render(Experience)
    expect(screen.getByText(/San Francisco, California/)).toBeInTheDocument()
  })

  it('renders achievements', () => {
    render(Experience)
    expect(screen.getByText(/Lead role in Dependabot campaigns/)).toBeInTheDocument()
    expect(screen.getByText(/Chrome extension development/)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(Experience)
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    render(Experience)
    const experienceSection = screen.getByRole('region')
    expect(experienceSection).toHaveAttribute('aria-labelledby', 'experience-heading')
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'experience-heading')
  })

  it('renders timeline with proper styling', () => {
    render(Experience)
    const timeline = screen.getByRole('region')
    expect(timeline).toHaveClass('timeline')
  })
}) 