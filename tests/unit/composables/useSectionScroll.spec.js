import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withSetup } from '../helpers/withSetup'
import { useSectionScroll } from '@/composables/useSectionScroll'

describe('useSectionScroll', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <section id="experience">
        <div class="section-header">
          <h2 id="experience-heading">Experience</h2>
        </div>
      </section>
    `

    const navbar = document.querySelector('.navbar')
    Object.defineProperty(navbar, 'offsetHeight', {
      configurable: true,
      get: () => 64,
    })

    const section = document.getElementById('experience')
    const header = section.querySelector('.section-header')
    header.getBoundingClientRect = () => ({ top: 200 })
    Object.defineProperty(window, 'pageYOffset', { configurable: true, writable: true, value: 0 })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('scrolls to a section with navbar offset and invalidates cache', () => {
    vi.useFakeTimers()
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const invalidateSectionCache = vi.fn()

    const { result, wrapper } = withSetup(useSectionScroll, invalidateSectionCache)

    result.scrollToSection('experience')

    expect(scrollTo).toHaveBeenCalledWith({
      top: 136,
      behavior: 'smooth',
    })
    expect(invalidateSectionCache).toHaveBeenCalled()

    const heading = document.getElementById('experience-heading')
    const focusSpy = vi.spyOn(heading, 'focus')
    expect(heading.getAttribute('tabindex')).toBe('-1')

    vi.runAllTimers()
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })

    wrapper.unmount()
  })

  it('does nothing when the target section is missing', () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const invalidateSectionCache = vi.fn()

    const { result, wrapper } = withSetup(useSectionScroll, invalidateSectionCache)

    result.scrollToSection('missing')

    expect(scrollTo).not.toHaveBeenCalled()
    expect(invalidateSectionCache).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  it('uses instant scroll and focus timing when reduced motion is preferred', () => {
    vi.useFakeTimers()
    window.matchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const invalidateSectionCache = vi.fn()

    const { result, wrapper } = withSetup(useSectionScroll, invalidateSectionCache)
    const heading = document.getElementById('experience-heading')
    const focusSpy = vi.spyOn(heading, 'focus')

    result.scrollToSection('experience')

    expect(scrollTo).toHaveBeenCalledWith({
      top: 136,
      behavior: 'auto',
    })

    vi.runAllTimers()
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })

    wrapper.unmount()
  })

  it('closes the mobile menu before navigating', async () => {
    vi.useFakeTimers()
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const invalidateSectionCache = vi.fn()
    const closeMobileMenu = vi.fn()

    const { result, wrapper } = withSetup(useSectionScroll, invalidateSectionCache)

    result.goToSection('experience', closeMobileMenu)

    expect(closeMobileMenu).toHaveBeenCalled()

    await vi.runAllTimersAsync()
    expect(scrollTo).toHaveBeenCalled()

    wrapper.unmount()
  })
})
