import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * Mobile drawer open state, scroll lock, and dismiss handlers.
 */
export function useMobileMenu() {
  const isMobileMenuOpen = ref(false)

  watch(isMobileMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
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
      return
    }

    closeMobileMenu()

    const toggleButton = document.querySelector('.mobile-menu-toggle')
    toggleButton?.focus()
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
  }
}
