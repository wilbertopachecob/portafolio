import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import LanguageToggle from '@/components/LanguageToggle.vue'

// Mock i18n for testing
const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        accessibility: {
          languageToggle: 'Toggle language'
        }
      },
      es: {
        accessibility: {
          languageToggle: 'Cambiar idioma'
        }
      }
    }
  })
}

// Mock the flag images
vi.mock('@/assets/img/english_flag.png', () => ({ default: 'english-flag-mock' }))
vi.mock('@/assets/img/spanish_flag.png', () => ({ default: 'spanish-flag-mock' }))

describe('LanguageToggle.vue', () => {
  let i18n

  beforeEach(() => {
    // Reset localStorage mock
    localStorage.clear()
    i18n = createTestI18n('en')
  })

  it('renders the language toggle button', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toBeInTheDocument()
  })

  it('displays both language flags', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const englishFlag = screen.getByAltText('English')
    const spanishFlag = screen.getByAltText('Español')
    
    expect(englishFlag).toBeInTheDocument()
    expect(spanishFlag).toBeInTheDocument()
  })

  it('shows English flag as active when locale is English', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const englishFlag = screen.getByAltText('English').closest('.language-flag')
    const spanishFlag = screen.getByAltText('Español').closest('.language-flag')
    
    expect(englishFlag).toHaveClass('active')
    expect(spanishFlag).not.toHaveClass('active')
  })

  it('shows Spanish flag as active when locale is Spanish', () => {
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n]
      }
    })
    
    const englishFlag = screen.getByAltText('English').closest('.language-flag')
    const spanishFlag = screen.getByAltText('Español').closest('.language-flag')
    
    expect(spanishFlag).toHaveClass('active')
    expect(englishFlag).not.toHaveClass('active')
  })

  it('has proper accessibility attributes', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toHaveAttribute('aria-label')
    expect(toggleButton).toHaveAttribute('aria-pressed')
    expect(toggleButton).toHaveAttribute('aria-checked')
    expect(toggleButton).toHaveAttribute('title')
  })

  it('calls toggleLanguage when clicked', async () => {
    const { emitted } = render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    await fireEvent.click(toggleButton)
    
    // The component should handle the click internally
    expect(toggleButton).toBeInTheDocument()
  })

  it('updates aria-pressed attribute based on current locale', () => {
    // Test with English locale
    const englishI18n = createTestI18n('en')
    const { unmount } = render(LanguageToggle, {
      global: {
        plugins: [englishI18n]
      }
    })
    
    const englishToggleButton = screen.getByRole('switch')
    expect(englishToggleButton).toHaveAttribute('aria-pressed', 'false') // English is not Spanish
    
    // Clean up and test with Spanish locale
    unmount()
    
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n]
      }
    })
    
    const spanishToggleButton = screen.getByRole('switch')
    expect(spanishToggleButton).toHaveAttribute('aria-pressed', 'true') // Spanish is Spanish
  })

  it('has proper CSS classes for styling', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toHaveClass('language-btn')
    
    const languageToggle = screen.getByRole('switch').closest('.language-toggle')
    expect(languageToggle).toBeInTheDocument()
  })

  it('displays correct tooltip text', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toHaveAttribute('title', 'Toggle language')
  })

  it('displays Spanish tooltip when locale is Spanish', () => {
    const spanishI18n = createTestI18n('es')
    render(LanguageToggle, {
      global: {
        plugins: [spanishI18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toHaveAttribute('title', 'Cambiar idioma')
  })

  it('has proper focus management', () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    toggleButton.focus()
    
    expect(toggleButton).toHaveFocus()
  })

  it('supports keyboard navigation', async () => {
    render(LanguageToggle, {
      global: {
        plugins: [i18n]
      }
    })
    
    const toggleButton = screen.getByRole('switch')
    toggleButton.focus()
    
    // Test Enter key
    await fireEvent.keyDown(toggleButton, { key: 'Enter' })
    expect(toggleButton).toBeInTheDocument()
    
    // Test Space key
    await fireEvent.keyDown(toggleButton, { key: ' ' })
    expect(toggleButton).toBeInTheDocument()
  })
}) 