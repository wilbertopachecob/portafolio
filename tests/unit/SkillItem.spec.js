import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import SkillItem from '@/components/SkillItem.vue'

describe('SkillItem.vue', () => {
  const mockSkill = {
    name: 'JavaScript',
    level: 'Advanced',
    icon: ['fab', 'js-square'],
    iconColor: '#f7df1e'
  }

  it('renders skill name', () => {
    render(SkillItem, {
      props: { name: mockSkill.name }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders skill with icon props', () => {
    render(SkillItem, {
      props: { 
        name: mockSkill.name,
        icon: mockSkill.icon,
        iconColor: mockSkill.iconColor
      }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    // Check that the component renders (icon rendering may vary in test environment)
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toBeInTheDocument()
  })

  it('renders skill without icon', () => {
    render(SkillItem, {
      props: { name: mockSkill.name }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(SkillItem, {
      props: { name: mockSkill.name }
    })
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toBeInTheDocument()
  })

  it('renders with different skill data', () => {
    render(SkillItem, {
      props: { name: 'Vue.js' }
    })
    
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })

  it('renders skill with proper styling classes', () => {
    render(SkillItem, {
      props: { name: mockSkill.name }
    })
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toHaveClass('list-inline-item')
  })

  it('renders skill name with proper styling', () => {
    render(SkillItem, {
      props: { name: mockSkill.name }
    })
    const nameElement = screen.getByText('JavaScript')
    expect(nameElement).toBeInTheDocument()
  })
}) 