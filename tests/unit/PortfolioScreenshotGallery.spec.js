import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import PortfolioScreenshotGallery from '@/components/PortfolioScreenshotGallery.vue'

const screenshots = [
  {
    src: 'portfolio/ciudadanousa-home.webp',
    alt: 'CiudadanoUSA home screen',
  },
  {
    src: 'portfolio/ciudadanousa-n400.webp',
    alt: 'CiudadanoUSA N-400 screen',
  },
]

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      portfolio: {
        screenshotControls: '{name} screenshot navigation',
        previousScreenshot: 'Previous screenshot',
        nextScreenshot: 'Next screenshot',
        goToScreenshot: 'Go to screenshot {current} of {total}',
      },
    },
  },
})

const renderGallery = (props = {}) => render(PortfolioScreenshotGallery, {
  props: {
    projectName: 'CiudadanoUSA',
    projectType: 'mobile',
    screenshots,
    ariaLabel: 'CiudadanoUSA screenshots',
    ...props,
  },
  global: {
    plugins: [createTestI18n()],
  },
})

describe('PortfolioScreenshotGallery.vue', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollTo = vi.fn()
  })

  it('labels the screenshot list and images', () => {
    renderGallery()

    expect(screen.getByLabelText('CiudadanoUSA screenshots')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'CiudadanoUSA home screen' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'CiudadanoUSA N-400 screen' })).toBeInTheDocument()
  })

  it('exposes carousel controls for multi-screenshot mobile projects', async () => {
    renderGallery()
    Object.defineProperty(screen.getByLabelText('CiudadanoUSA screenshots'), 'clientWidth', {
      configurable: true,
      value: 320,
    })

    expect(screen.getByRole('group', { name: 'CiudadanoUSA screenshot navigation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous screenshot' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Go to screenshot 1 of 2' })).toHaveAttribute('aria-current', 'true')

    await fireEvent.click(screen.getByRole('button', { name: 'Go to screenshot 2 of 2' }))

    expect(screen.getByRole('button', { name: 'Go to screenshot 2 of 2' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('button', { name: 'Next screenshot' })).toBeDisabled()
  })

  it('does not render carousel controls for single screenshots', () => {
    renderGallery({ screenshots: screenshots.slice(0, 1) })

    expect(screen.queryByRole('group', { name: 'CiudadanoUSA screenshot navigation' })).not.toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderGallery()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

