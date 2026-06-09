import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { withSetup } from '../helpers/withSetup'
import { useMobileMenu } from '@/composables/useMobileMenu'

describe('useMobileMenu', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    document.body.innerHTML = `
      <button class="mobile-menu-toggle"></button>
      <aside id="mobile-menu" class="mobile-menu-drawer">
        <button class="mm-close">Close</button>
        <a href="#impact" class="mm-link">Impact</a>
        <a href="/resume.pdf" class="mm-resume-btn">Resume</a>
      </aside>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('toggles drawer open state', () => {
    const { result, wrapper } = withSetup(useMobileMenu)

    expect(result.isMobileMenuOpen.value).toBe(false)

    result.toggleMobileMenu()
    expect(result.isMobileMenuOpen.value).toBe(true)

    result.toggleMobileMenu()
    expect(result.isMobileMenuOpen.value).toBe(false)

    wrapper.unmount()
  })

  it('locks body scroll while the drawer is open', async () => {
    const { result, wrapper } = withSetup(useMobileMenu)

    result.toggleMobileMenu()
    await flushPromises()
    expect(document.body.style.overflow).toBe('hidden')

    result.closeMobileMenu()
    await flushPromises()
    expect(document.body.style.overflow).toBe('')

    wrapper.unmount()
  })

  it('closes when clicking outside the drawer and toggle', async () => {
    const { result, wrapper } = withSetup(useMobileMenu)

    result.toggleMobileMenu()
    await flushPromises()
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(result.isMobileMenuOpen.value).toBe(false)

    wrapper.unmount()
  })

  it('keeps the drawer open when clicking inside it', async () => {
    const { result, wrapper } = withSetup(useMobileMenu)
    const drawer = document.querySelector('.mobile-menu-drawer')

    result.toggleMobileMenu()
    await flushPromises()
    drawer.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(result.isMobileMenuOpen.value).toBe(true)

    wrapper.unmount()
  })

  it('closes on Escape and returns focus to the toggle', () => {
    const { result, wrapper } = withSetup(useMobileMenu)
    const toggle = document.querySelector('.mobile-menu-toggle')
    const focusSpy = vi.spyOn(toggle, 'focus')

    result.toggleMobileMenu()
    result.handleEscape({ key: 'Escape' })

    expect(result.isMobileMenuOpen.value).toBe(false)
    expect(focusSpy).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('moves focus to the first drawer control when opened', async () => {
    const { result, wrapper } = withSetup(useMobileMenu)

    result.toggleMobileMenu()
    await flushPromises()
    await new Promise((resolve) => window.requestAnimationFrame(resolve))

    expect(document.querySelector('.mm-close')).toHaveFocus()

    wrapper.unmount()
  })

  it('traps Tab focus inside the drawer', () => {
    const { result, wrapper } = withSetup(useMobileMenu)
    const closeButton = document.querySelector('.mm-close')
    const resumeLink = document.querySelector('.mm-resume-btn')

    result.toggleMobileMenu()
    closeButton.focus()

    const shiftTab = { key: 'Tab', shiftKey: true, preventDefault: vi.fn() }
    result.handleMenuKeydown(shiftTab)

    expect(shiftTab.preventDefault).toHaveBeenCalled()
    expect(resumeLink).toHaveFocus()

    const tab = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() }
    result.handleMenuKeydown(tab)

    expect(tab.preventDefault).toHaveBeenCalled()
    expect(closeButton).toHaveFocus()

    wrapper.unmount()
  })

  it('restores body scroll and removes listeners on unmount', () => {
    const removeListener = vi.spyOn(document, 'removeEventListener')
    const { result, wrapper } = withSetup(useMobileMenu)

    result.toggleMobileMenu()
    wrapper.unmount()

    expect(document.body.style.overflow).toBe('')
    expect(removeListener).toHaveBeenCalledWith('click', expect.any(Function))
  })
})
