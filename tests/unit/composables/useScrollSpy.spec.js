import { computed } from 'vue'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { withSetup } from '../helpers/withSetup'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { NAV_ITEMS, PRIMARY_NAV_IDS } from '@/config/sections'
import { setupNavigationDom, teardownNavigationDom } from '../helpers/navigationDom'

const primaryNavItems = computed(() =>
  PRIMARY_NAV_IDS
    .map((id) => NAV_ITEMS.find((item) => item.id === id))
    .filter(Boolean),
)

describe('useScrollSpy', () => {
  beforeEach(() => {
    setupNavigationDom()
  })

  afterEach(() => {
    teardownNavigationDom()
    vi.useRealTimers()
  })

  it('marks the navbar as scrolled after threshold', async () => {
    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 100 })
    window.dispatchEvent(new Event('scroll'))

    await vi.waitFor(() => {
      expect(result.isScrolled.value).toBe(true)
    })

    wrapper.unmount()
  })

  it('updates the active section from scroll position', async () => {
    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 1550 })
    window.dispatchEvent(new Event('scroll'))

    await vi.waitFor(() => {
      expect(result.activeSection.value).toBe('experience')
    })

    wrapper.unmount()
  })

  it('defaults to about near the top of the page', async () => {
    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 })
    window.dispatchEvent(new Event('scroll'))

    await vi.waitFor(() => {
      expect(result.activeSection.value).toBe('about')
    })

    wrapper.unmount()
  })

  it('maps non-primary sections back to about', async () => {
    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 3100 })
    window.dispatchEvent(new Event('scroll'))

    await vi.waitFor(() => {
      expect(result.activeSection.value).toBe('about')
    })

    wrapper.unmount()
  })

  it('invalidates cached section positions', () => {
    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    expect(result.sectionPositions.value).not.toBeNull()
    result.invalidateSectionCache()
    expect(result.sectionPositions.value).toBeNull()

    wrapper.unmount()
  })

  it('recalculates section positions after resize', async () => {
    vi.useFakeTimers()
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 1550 })

    const { result, wrapper } = withSetup(useScrollSpy, primaryNavItems)

    expect(result.activeSection.value).toBe('experience')

    result.sectionPositions.value = { about: { top: 0, height: 10000 } }
    window.dispatchEvent(new Event('resize'))
    vi.advanceTimersByTime(150)

    expect(result.activeSection.value).toBe('experience')
    expect(result.sectionPositions.value.experience).toEqual({
      top: 1500,
      height: 400,
    })

    wrapper.unmount()
  })
})
