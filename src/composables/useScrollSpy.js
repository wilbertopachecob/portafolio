import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SECTION_IDS } from '@/config/sections'

const SCROLL_OFFSET = 150
const TOP_SECTION_THRESHOLD = 200
const SCROLLED_THRESHOLD = 50
const RESIZE_DEBOUNCE_MS = 150

/**
 * Tracks navbar scroll state and the active in-page section.
 * @param {import('vue').ComputedRef<Array<{ id: string }>>} primaryNavItems
 */
export function useScrollSpy(primaryNavItems) {
  const isScrolled = ref(false)
  const activeSection = ref('about')
  const sectionPositions = ref(null)

  let rafId = null
  let resizeTimeout = null

  const cacheSectionPositions = () => {
    sectionPositions.value = SECTION_IDS.reduce((positions, sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        positions[sectionId] = {
          top: section.offsetTop,
          height: section.offsetHeight,
        }
      }
      return positions
    }, {})
  }

  const getNavigationSectionId = (sectionId) => {
    return primaryNavItems.value.some((item) => item.id === sectionId)
      ? sectionId
      : 'about'
  }

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + SCROLL_OFFSET

    if (!sectionPositions.value) {
      cacheSectionPositions()
    }

    if (scrollPosition < TOP_SECTION_THRESHOLD) {
      activeSection.value = 'about'
      return
    }

    const currentSection = SECTION_IDS.find((sectionId) => {
      const position = sectionPositions.value[sectionId]
      return position
        && scrollPosition >= position.top
        && scrollPosition < position.top + position.height
    }) ?? 'about'

    activeSection.value = getNavigationSectionId(currentSection)
  }

  const handleScroll = () => {
    isScrolled.value = window.scrollY > SCROLLED_THRESHOLD

    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      updateActiveSection()
      rafId = null
    })
  }

  const handleResize = () => {
    sectionPositions.value = null

    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      cacheSectionPositions()
      updateActiveSection()
    }, RESIZE_DEBOUNCE_MS)
  }

  const invalidateSectionCache = () => {
    sectionPositions.value = null
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    updateActiveSection()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)

    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })

  return {
    isScrolled,
    activeSection,
    sectionPositions,
    invalidateSectionCache,
  }
}
