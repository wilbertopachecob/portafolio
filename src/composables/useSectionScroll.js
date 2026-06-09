import { nextTick } from 'vue'

const DEFAULT_NAVBAR_HEIGHT = 64

/**
 * Smooth in-page section scrolling with navbar offset and focus management.
 * @param {() => void} invalidateSectionCache
 */
export function useSectionScroll(invalidateSectionCache) {
  const getNavbarOffset = () => {
    const navbar = document.querySelector('.navbar')
    return navbar ? navbar.offsetHeight : DEFAULT_NAVBAR_HEIGHT
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) {
      return
    }

    const offset = getNavbarOffset()
    const scrollTarget =
      section.querySelector('.section-header, .hero-content, h1, h2') || section
    const top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })

    const focusTarget =
      section.querySelector('[id$="-heading"], h1, h2') || section
    if (!focusTarget.hasAttribute('tabindex')) {
      focusTarget.setAttribute('tabindex', '-1')
    }

    const focusDelay = prefersReducedMotion ? 0 : 500

    setTimeout(() => {
      focusTarget.focus({ preventScroll: true })
    }, focusDelay)

    invalidateSectionCache()
  }

  const goToSection = (sectionId, closeMobileMenu) => {
    closeMobileMenu()
    nextTick(() => {
      requestAnimationFrame(() => {
        scrollToSection(sectionId)
      })
    })
  }

  return { scrollToSection, goToSection }
}
