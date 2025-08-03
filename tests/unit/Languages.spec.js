import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Languages from '@/components/Languages.vue'

describe('Languages.vue', () => {
  it('renders language names', () => {
    render(Languages)
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('renders flag images with proper alt text', () => {
    render(Languages)
    const spanishFlag = screen.getByAltText('Flag of Spanish')
    const englishFlag = screen.getByAltText('Flag of English')
    
    expect(spanishFlag).toBeInTheDocument()
    expect(englishFlag).toBeInTheDocument()
    expect(spanishFlag).toHaveAttribute('aria-label', 'Flag representing Spanish language')
    expect(englishFlag).toHaveAttribute('aria-label', 'Flag representing English language')
  })

  it('has proper accessibility attributes', () => {
    render(Languages)
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'languages-heading')
    expect(section).toHaveAttribute('id', 'languages')
  })

  it('has proper semantic structure', () => {
    render(Languages)
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders language cards with proper styling classes', () => {
    render(Languages)
    const languageCards = screen.getAllByRole('listitem')
    
    languageCards.forEach(card => {
      expect(card).toHaveClass('language-card')
    })
  })

  it('renders flag images with proper styling classes', () => {
    render(Languages)
    const flagImages = screen.getAllByRole('img')
    
    flagImages.forEach(img => {
      expect(img).toHaveClass('flag-image')
    })
  })

  it('displays languages in a list format', () => {
    render(Languages)
    const list = screen.getByRole('list')
    expect(list).toHaveAttribute('aria-label', 'Language proficiency')
  })
}) 