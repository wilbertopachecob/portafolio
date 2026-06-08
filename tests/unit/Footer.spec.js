import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import Footer from '@/components/Footer.vue'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

// Mock FontAwesome components
vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span data-testid="font-awesome-icon" :title="$attrs.title" @click="$emit(\'click\')"></span>',
    props: ['icon', 'title'],
    emits: ['click']
  }
}))

// Helper function to render Footer with i18n mock
const renderFooter = (options = {}) => {
  return render(Footer, {
    global: {
      mocks: {
        $t: (msg) => msg // Simple passthrough mock
      }
    },
    ...options
  })
}

describe('Footer.vue', () => {
  it('renders copyright information', () => {
    renderFooter()
    const copyright = screen.getByText(/Copyright © \d{4} Wilberto Pacheco Batista/)
    expect(copyright).toBeInTheDocument()
  })

  it('renders rights reserved text', () => {
    renderFooter()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders scroll to top button', () => {
    renderFooter()
    const icons = screen.getAllByTestId('font-awesome-icon')
    const scrollButton = icons[0] // First icon is the scroll-to-top button
    expect(scrollButton).toBeInTheDocument()
    expect(scrollButton).toHaveAttribute('title', 'Scroll to Top')
  })

  it('has proper semantic structure', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    renderFooter()
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(`Copyright © ${currentYear}`))
    expect(copyright).toBeInTheDocument()
  })

  it('renders footer with proper styling classes', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-primary', 'f-container')
  })

  it('renders scroll to top button with proper styling', () => {
    renderFooter()
    const icons = screen.getAllByTestId('font-awesome-icon')
    const scrollButton = icons[0] // First icon is the scroll-to-top button
    expect(scrollButton).toHaveClass('mt-3', 'to-top-button', 'bounce')
  })

  it('renders download resume link with translation', () => {
    renderFooter()
    const downloadLink = screen.getByText('hero.downloadResume')
    expect(downloadLink).toBeInTheDocument()
    expect(downloadLink.closest('a')).toHaveAttribute('href', getPublicAssetUrl(RESUME_FILENAME))
    expect(downloadLink.closest('a')).toHaveAttribute('download', 'Engineer_Wilberto_Pacheco_Batista.pdf')
  })

  it('renders download icon', () => {
    renderFooter()
    const icons = screen.getAllByTestId('font-awesome-icon')
    const downloadIcon = icons[1] // Second icon is the download icon
    expect(downloadIcon).toBeInTheDocument()
  })

  it('scrolls to about section when scroll-to-top button is clicked', async () => {
    const scrollIntoView = vi.fn()
    const aboutSection = document.createElement('section')
    aboutSection.id = 'about'
    aboutSection.scrollIntoView = scrollIntoView
    document.body.appendChild(aboutSection)

    renderFooter()
    const scrollButton = screen.getAllByTestId('font-awesome-icon')[0]
    await fireEvent.click(scrollButton)

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })

    aboutSection.remove()
  })

  it('does not throw when about section is missing', async () => {
    const existingAbout = document.getElementById('about')
    if (existingAbout) existingAbout.remove()

    renderFooter()
    const scrollButton = screen.getAllByTestId('font-awesome-icon')[0]
    await expect(fireEvent.click(scrollButton)).resolves.not.toThrow()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderFooter()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
