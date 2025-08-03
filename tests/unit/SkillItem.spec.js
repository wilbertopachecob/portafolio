import { render, screen } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import SkillItem from '@/components/SkillItem.vue'

// Mock FontAwesome components
vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span data-testid="font-awesome-icon" :aria-label="$attrs[\'aria-label\']" :aria-hidden="$attrs[\'aria-hidden\']"></span>',
    props: ['icon', 'aria-label', 'aria-hidden']
  }
}))

describe('SkillItem.vue', () => {
  it('renders the skill item', () => {
    render(SkillItem, {
      props: { 
        name: 'JavaScript',
        icon: ['fab', 'js'],
        iconColor: '#F7DF1E'
      }
    })
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toBeInTheDocument()
  })

  it('renders skill name', () => {
    render(SkillItem, {
      props: { 
        name: 'JavaScript',
        icon: ['fab', 'js'],
        iconColor: '#F7DF1E'
      }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders skill name without icon', () => {
    render(SkillItem, {
      props: { 
        name: 'JavaScript'
      }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders skill icon', () => {
    render(SkillItem, {
      props: { 
        name: 'JavaScript',
        icon: ['fab', 'js'],
        iconColor: '#F7DF1E'
      }
    })
    // Look for font-awesome icon element
    const icon = document.querySelector('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(SkillItem, {
      props: { 
        name: 'JavaScript',
        icon: ['fab', 'js'],
        iconColor: '#F7DF1E'
      }
    })
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('renders with different skill data', () => {
    render(SkillItem, {
      props: { 
        name: 'Vue.js',
        icon: ['fab', 'vuejs'],
        iconColor: '#41B883'
      }
    })
    
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })

  it('renders skill with custom icon color', () => {
    render(SkillItem, {
      props: { 
        name: 'React',
        icon: ['fab', 'react'],
        iconColor: '#61DAFB'
      }
    })
    
    expect(screen.getByText('React')).toBeInTheDocument()
    const icon = document.querySelector('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders skill without icon color', () => {
    render(SkillItem, {
      props: { 
        name: 'Node.js',
        icon: ['fab', 'node']
      }
    })
    
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    const icon = document.querySelector('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })
}) 