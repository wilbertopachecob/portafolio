import { nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * Mobile drawer open state, scroll lock, and dismiss handlers.
 */
export function useMobileMenu() {
  const isMobileMenuOpen = ref(false)
  const restoreFocusTarget = ref(null)

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  const getDrawer = () => document.getElementById('mobile-menu')

  const getFocusableDrawerElements = () => {
    const drawer = getDrawer()
    return drawer
      ? [...drawer.querySelectorAll(focusableSelector)].filter((element) => !element.hasAttribute('disabled'))
      : []
  }

  const focusFirstDrawerControl = () => {
    const [firstFocusable] = getFocusableDrawerElements()
    firstFocusable?.focus({ preventScroll: true })
  }

  const restoreFocus = () => {
    const target = restoreFocusTarget.value || document.querySelector('.mobile-menu-toggle')
    target?.focus?.()
    restoreFocusTarget.value = null
  }

  watch(isMobileMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''

    if (open) {
      nextTick(() => {
        const scheduleFocus = window.requestAnimationFrame || window.setTimeout
        scheduleFocus(focusFirstDrawerControl)
      })
    }
  })

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen.value) {
      closeMobileMenu()
      return
    }

    restoreFocusTarget.value = document.activeElement === document.body
      ? null
      : document.activeElement
    isMobileMenuOpen.value = true
  }

  const closeMobileMenu = ({ restoreFocus: shouldRestoreFocus = true } = {}) => {
    if (!isMobileMenuOpen.value) {
      return
    }

    isMobileMenuOpen.value = false

    if (shouldRestoreFocus) {
      restoreFocus()
    }
  }

  const handleClickOutside = (event) => {
    if (!isMobileMenuOpen.value) {
      return
    }

    const insideToggle = event.target.closest('.mobile-menu-toggle')
    const insideDrawer = event.target.closest('.mobile-menu-drawer')
    if (!insideToggle && !insideDrawer) {
      closeMobileMenu()
    }
  }

  const handleEscape = (event) => {
    if (event.key !== 'Escape' || !isMobileMenuOpen.value) {
      return false
    }

    closeMobileMenu()
    return true
  }

  const trapDrawerFocus = (event) => {
    if (event.key !== 'Tab' || !isMobileMenuOpen.value) {
      return false
    }

    const focusableElements = getFocusableDrawerElements()
    if (!focusableElements.length) {
      event.preventDefault()
      return true
    }

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement

    if (!getDrawer()?.contains(activeElement)) {
      event.preventDefault()
      firstFocusable.focus()
      return true
    }

    if (event.shiftKey && activeElement === firstFocusable) {
      event.preventDefault()
      lastFocusable.focus()
      return true
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault()
      firstFocusable.focus()
      return true
    }

    return false
  }

  const handleMenuKeydown = (event) => {
    return handleEscape(event) || trapDrawerFocus(event)
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = ''
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    handleEscape,
    handleMenuKeydown,
  }
}
