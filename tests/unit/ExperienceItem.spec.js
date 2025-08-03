import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ExperienceItem from '@/components/ExperienceItem.vue'

describe('ExperienceItem.vue', () => {
  const mockExperience = {
    title: 'Senior Software Engineer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    startDate: '2020-01',
    endDate: '2023-12',
    description: 'Developed and maintained web applications using Vue.js and Node.js.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    achievements: ['Led team of 5 developers', 'Improved performance by 40%']
  }

  it('renders the experience item', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    const experienceItem = screen.getByRole('listitem')
    expect(experienceItem).toBeInTheDocument()
  })

  it('renders job title', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
  })

  it('renders company name', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText('Tech Company Inc.')).toBeInTheDocument()
  })

  it('renders location', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  it('renders date range', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText(/2020.*2023/)).toBeInTheDocument()
  })

  it('renders job description', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText(/Developed and maintained web applications/)).toBeInTheDocument()
  })

  it('renders technologies used', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
  })

  it('renders achievements', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByText(/Led team of 5 developers/)).toBeInTheDocument()
    expect(screen.getByText(/Improved performance by 40%/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    const experienceItem = screen.getByRole('listitem')
    expect(experienceItem).toHaveAttribute('aria-label')
  })

  it('has proper semantic structure', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders with different experience data', () => {
    const differentExperience = {
      title: 'Frontend Developer',
      company: 'Startup XYZ',
      location: 'New York, NY',
      startDate: '2018-06',
      endDate: '2020-01',
      description: 'Built responsive web applications using React and TypeScript.',
      technologies: ['React', 'TypeScript', 'Redux'],
      achievements: ['Reduced bundle size by 30%', 'Implemented CI/CD pipeline']
    }
    
    render(ExperienceItem, {
      props: { experience: differentExperience }
    })
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Startup XYZ')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders job title with proper styling', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    const titleElement = screen.getByText('Senior Software Engineer')
    expect(titleElement).toHaveClass('job-title')
  })

  it('renders company with proper styling', () => {
    render(ExperienceItem, {
      props: { experience: mockExperience }
    })
    const companyElement = screen.getByText('Tech Company Inc.')
    expect(companyElement).toHaveClass('company-name')
  })

  it('renders current job indicator', () => {
    const currentJob = {
      ...mockExperience,
      endDate: 'Present'
    }
    
    render(ExperienceItem, {
      props: { experience: currentJob }
    })
    
    expect(screen.getByText('Present')).toBeInTheDocument()
  })
}) 