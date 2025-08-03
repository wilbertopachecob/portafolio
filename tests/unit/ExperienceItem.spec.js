import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ExperienceItem from '@/components/ExperienceItem.vue'

describe('ExperienceItem.vue', () => {
  const mockExperience = {
    company: 'Tech Company Inc.',
    position: 'Senior Software Engineer',
    period: '2020-01 - 2023-12',
    location: 'San Francisco, CA',
    responsibilities: [
      'Developed and maintained web applications using Vue.js and Node.js.',
      'Led team of 5 developers',
      'Improved performance by 40%'
    ]
  }

  it('renders the experience item', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    // Use getAllByRole and check the first one (main experience item)
    const experienceItems = screen.getAllByRole('listitem')
    expect(experienceItems.length).toBeGreaterThan(0)
  })

  it('renders company name', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    expect(screen.getByText('Tech Company Inc.')).toBeInTheDocument()
  })

  it('renders job position', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
  })

  it('renders period', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    expect(screen.getByText('2020-01 - 2023-12')).toBeInTheDocument()
  })

  it('renders location', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  it('renders responsibilities', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    expect(screen.getByText(/Developed and maintained web applications/)).toBeInTheDocument()
    expect(screen.getByText(/Led team of 5 developers/)).toBeInTheDocument()
    expect(screen.getByText(/Improved performance by 40%/)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    const experienceItems = screen.getAllByRole('listitem')
    expect(experienceItems.length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders with different experience data', () => {
    const differentExperience = {
      company: 'Startup XYZ',
      position: 'Frontend Developer',
      period: '2018-06 - 2020-01',
      location: 'New York, NY',
      responsibilities: [
        'Built responsive web applications using React and TypeScript.',
        'Reduced bundle size by 30%',
        'Implemented CI/CD pipeline'
      ]
    }
    
    render(ExperienceItem, {
      props: differentExperience
    })
    
    expect(screen.getByText('Startup XYZ')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText(/Built responsive web applications/)).toBeInTheDocument()
  })

  it('renders company with proper styling', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    const companyElement = screen.getByText('Tech Company Inc.')
    expect(companyElement).toHaveClass('timeline-title')
  })

  it('renders position with proper styling', () => {
    render(ExperienceItem, {
      props: mockExperience
    })
    const positionElement = screen.getByText('Senior Software Engineer')
    expect(positionElement).toHaveClass('badge', 'p-2', 'title-heading')
  })

  it('renders current job indicator', () => {
    const currentJob = {
      ...mockExperience,
      period: '2020-01 - Present'
    }
    
    render(ExperienceItem, {
      props: currentJob
    })
    
    expect(screen.getByText('2020-01 - Present')).toBeInTheDocument()
  })

  it('renders without location', () => {
    const experienceWithoutLocation = {
      ...mockExperience,
      location: null
    }
    
    render(ExperienceItem, {
      props: experienceWithoutLocation
    })
    
    expect(screen.getByText('Tech Company Inc.')).toBeInTheDocument()
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument()
  })
}) 