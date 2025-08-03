import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import SkillItem from '@/components/SkillItem.vue'

describe('SkillItem.vue', () => {
  const mockSkill = {
    name: 'JavaScript',
    level: 'Advanced',
    icon: 'fab,js'
  }

  it('renders the skill item', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toBeInTheDocument()
  })

  it('renders skill name', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders skill level', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('renders skill icon', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    // Look for icon element
    const icon = screen.getByRole('img') || screen.getByText(/🔧|⚡|💻/)
    expect(icon).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    const skillItem = screen.getByRole('listitem')
    expect(skillItem).toHaveAttribute('aria-label')
  })

  it('has proper semantic structure', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('renders with different skill data', () => {
    const differentSkill = {
      name: 'Vue.js',
      level: 'Expert',
      icon: 'fab,vuejs'
    }
    
    render(SkillItem, {
      props: { skill: differentSkill }
    })
    
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('Expert')).toBeInTheDocument()
  })

  it('renders skill level with proper styling', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    const levelElement = screen.getByText('Advanced')
    expect(levelElement).toHaveClass('skill-level')
  })

  it('renders skill name with proper styling', () => {
    render(SkillItem, {
      props: { skill: mockSkill }
    })
    const nameElement = screen.getByText('JavaScript')
    expect(nameElement).toHaveClass('skill-name')
  })
}) 