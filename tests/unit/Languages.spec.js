import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Languages from '@/components/Languages.vue'

describe('Languages.vue', () => {
  it('renders language names', () => {
    render(Languages)
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  test('Languages component contains i18n translation keys', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('$t(\'languages.spanish\')')
    expect(content).toContain('$t(\'languages.english\')')
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

  test('Languages component contains i18n alt text for images', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('$t(\'languages.flagAlt\'')
    expect(content).toContain('$t(\'languages.flagLabel\'')
  })

  test('Languages component has proper computed structure', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('languages() {')
    expect(content).toContain('this.$t(\'languages.spanish\')')
    expect(content).toContain('this.$t(\'languages.english\')')
  })
}) 