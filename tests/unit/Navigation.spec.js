import { render, screen, fireEvent } from '@testing-library/vue'
import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import Navigation from '@/components/Navigation.vue'
import { NAV_ITEMS } from '@/config/sections'
import { setupNavigationDom, teardownNavigationDom } from './helpers/navigationDom'

const createTestI18n = (locale = 'en') => {
  return createI18n({
    legacy: false,
    locale,
    messages: {
      en: {
        nav: {
          about: 'About',
          impact: 'Impact',
          experience: 'Experience',
          portfolio: 'Products',
          skills: 'Capabilities',
          credentials: 'Credentials',
          education: 'Education',
          languages: 'Languages',
          certifications: 'Certifications'
        },
        accessibility: {
          lightMode: 'Switch to Light Mode',
          darkMode: 'Switch to Dark Mode',
          openMenu: 'Open mobile menu',
          closeMenu: 'Close mobile menu',
          languageToggle: 'Toggle language'
        }
      },
      es: {
        nav: {
          about: 'Acerca de',
          impact: 'Impacto',
          experience: 'Experiencia',
          portfolio: 'Productos',
          skills: 'Capacidades',
          credentials: 'Credenciales',
          education: 'Educación',
          languages: 'Idiomas',
          certifications: 'Certificaciones'
        },
        accessibility: {
          lightMode: 'Cambiar a Modo Claro',
          darkMode: 'Cambiar a Modo Oscuro',
          openMenu: 'Abrir menú móvil',
          closeMenu: 'Cerrar menú móvil',
          languageToggle: 'Cambiar idioma'
        }
      }
    }
  })
}

const renderNavigation = (locale = 'en') => {
  const i18n = createTestI18n(locale)
  return render(Navigation, {
    global: {
      plugins: [i18n]
    }
  })
}

const getMobileToggle = () => document.querySelector('.mobile-menu-toggle')
const getMainNavbar = () => document.querySelector('nav.navbar')
const getDesktopNavLink = (section) =>
  document.querySelector(`.navbar-nav .nav-link[href="#${section}"]`)

describe('Navigation.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.getItem.mockImplementation(() => null)
    document.documentElement.removeAttribute('data-theme')
    document.body.style.overflow = ''
    setupNavigationDom()
  })

  afterEach(() => {
    document.querySelectorAll('.mobile-menu-backdrop, .mobile-menu-drawer').forEach((el) => {
      el.remove()
    })
    teardownNavigationDom()
    document.body.style.overflow = ''
    document.documentElement.removeAttribute('data-theme')
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  describe('rendering', () => {
    it('renders the navigation bar', () => {
      renderNavigation()
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('renders the brand/logo', () => {
      renderNavigation()
      const brand = screen.getByRole('link', { name: /Go to about section/ })
      expect(brand).toBeInTheDocument()
      expect(brand).toHaveTextContent('Wilberto Pacheco')
    })

    it('renders navigation links', () => {
      renderNavigation()
      expect(screen.getAllByText('About').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Impact').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Experience').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Products').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Capabilities').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Credentials').length).toBeGreaterThan(0)
      expect(screen.queryByText('Education')).not.toBeInTheDocument()
      expect(screen.queryByText('Languages')).not.toBeInTheDocument()
      expect(screen.queryByText('Certifications')).not.toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
      renderNavigation()
      const themeToggle = screen.getByRole('switch', { name: /Switch to Dark Mode/ })
      expect(themeToggle).toBeInTheDocument()
    })

    it('renders mobile menu toggle', () => {
      renderNavigation()
      const mobileToggle = getMobileToggle()
      expect(mobileToggle).not.toBeNull()
      expect(mobileToggle).toHaveAttribute('aria-expanded', 'false')
    })

    it('has proper navigation menu structure', () => {
      renderNavigation()
      expect(screen.getByRole('menubar')).toBeInTheDocument()
    })

    it('has proper accessibility attributes', () => {
      renderNavigation()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
      expect(screen.getByRole('menubar')).toBeInTheDocument()
    })

    it('has active section highlighting functionality', () => {
      renderNavigation()
      const aboutLink = screen.getByRole('menuitem', { name: 'About' })
      expect(aboutLink).toHaveClass('nav-link')
      expect(aboutLink).toHaveClass('active')
    })

    it('should have no accessibility violations', async () => {
      const { container } = renderNavigation()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('theme', () => {
    it('initializes light mode by default', () => {
      renderNavigation()
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(screen.getByRole('switch', { name: /Switch to Dark Mode/ })).toBeInTheDocument()
    })

    it('initializes dark mode from localStorage', async () => {
      localStorage.getItem.mockImplementation((key) => (key === 'theme' ? 'dark' : null))
      const wrapper = mount(Navigation, {
        global: { plugins: [createTestI18n()] },
      })
      await flushPromises()

      expect(wrapper.vm.isDarkMode).toBe(true)
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(wrapper.find('.theme-toggle').attributes('aria-label')).toBe('Switch to Light Mode')
    })

    it('toggles theme on button click', async () => {
      renderNavigation()
      const themeToggle = screen.getByRole('switch', { name: /Switch to Dark Mode/ })

      await fireEvent.click(themeToggle)

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
      expect(themeToggle).toHaveAttribute('aria-checked', 'true')

      await fireEvent.click(themeToggle)

      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
    })

    it('toggles theme on Ctrl+T keyboard shortcut', async () => {
      renderNavigation()

      await fireEvent.keyDown(document, { key: 't', ctrlKey: true })

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('toggles theme on Meta+T keyboard shortcut', async () => {
      renderNavigation()

      await fireEvent.keyDown(document, { key: 't', metaKey: true })

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })
  })

  describe('mobile menu', () => {
    it('opens and closes the mobile drawer', async () => {
      renderNavigation()
      const toggle = getMobileToggle()

      await fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      expect(document.body.style.overflow).toBe('hidden')
      expect(document.querySelector('.mobile-menu-drawer')).toBeTruthy()

      await fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(document.body.style.overflow).toBe('')
    })

    it('closes the drawer when the backdrop is clicked', async () => {
      renderNavigation()
      await fireEvent.click(getMobileToggle())

      const backdrop = document.querySelector('.mobile-menu-backdrop')
      expect(backdrop).toBeTruthy()
      await fireEvent.click(backdrop)

      expect(getMobileToggle()).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes the drawer when the close button is clicked', async () => {
      renderNavigation()
      await fireEvent.click(getMobileToggle())

      await fireEvent.click(document.querySelector('.mm-close'))

      expect(getMobileToggle()).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes the drawer on Escape and returns focus to the toggle', async () => {
      renderNavigation()
      const toggle = getMobileToggle()
      const focusSpy = vi.spyOn(toggle, 'focus')

      await fireEvent.click(toggle)
      await fireEvent.keyDown(document, { key: 'Escape' })

      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(focusSpy).toHaveBeenCalled()
    })

    it('closes the drawer when clicking outside the drawer and toggle', async () => {
      renderNavigation()
      await fireEvent.click(getMobileToggle())

      await fireEvent.click(document.body)

      expect(getMobileToggle()).toHaveAttribute('aria-expanded', 'false')
    })

    it('keeps the drawer open when clicking inside it', async () => {
      renderNavigation()
      await fireEvent.click(getMobileToggle())

      const drawer = document.querySelector('.mobile-menu-drawer')
      await fireEvent.click(drawer)

      expect(getMobileToggle()).toHaveAttribute('aria-expanded', 'true')
    })

    it('renders all drawer navigation links', async () => {
      renderNavigation()
      await fireEvent.click(getMobileToggle())

      const drawerLinks = document.querySelectorAll('.mm-link')
      expect(drawerLinks).toHaveLength(NAV_ITEMS.length)
    })
  })

  describe('scroll and active section', () => {
    it('applies scrolled class when page is scrolled', async () => {
      renderNavigation()
      const nav = getMainNavbar()

      Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 100 })
      window.dispatchEvent(new Event('scroll'))
      await vi.waitFor(() => {
        expect(nav).toHaveClass('navbar-scrolled')
      })
    })

    it('updates the active section based on scroll position', async () => {
      renderNavigation()

      Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 1050 })
      window.dispatchEvent(new Event('scroll'))

      await vi.waitFor(() => {
        expect(getDesktopNavLink('experience')).toHaveClass('active')
      })
    })

    it('scrolls to a section when a desktop nav link is clicked', async () => {
      vi.useFakeTimers()
      const scrollTo = vi.fn()
      vi.stubGlobal('scrollTo', scrollTo)

      const experienceSection = document.getElementById('experience')
      experienceSection.getBoundingClientRect = () => ({ top: 200 })
      Object.defineProperty(window, 'pageYOffset', { configurable: true, writable: true, value: 0 })

      renderNavigation()
      await fireEvent.click(getDesktopNavLink('experience'))

      expect(scrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth',
      })

      vi.runAllTimers()
    })

    it('navigates from a drawer link and closes the menu', async () => {
      vi.useFakeTimers()
      const scrollTo = vi.fn()
      vi.stubGlobal('scrollTo', scrollTo)

      const skillsSection = document.getElementById('skills')
      skillsSection.getBoundingClientRect = () => ({ top: 300 })
      Object.defineProperty(window, 'pageYOffset', { configurable: true, writable: true, value: 0 })

      renderNavigation()
      await fireEvent.click(getMobileToggle())

      const skillsDrawerLink = document.querySelector('.mm-link[href="#skills"]')
      await fireEvent.click(skillsDrawerLink)

      expect(getMobileToggle()).toHaveAttribute('aria-expanded', 'false')

      await vi.runAllTimersAsync()

      expect(scrollTo).toHaveBeenCalled()
    })

    it('recalculates section positions on resize', async () => {
      vi.useFakeTimers()
      Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 1050 })

      const wrapper = mount(Navigation, {
        global: { plugins: [createTestI18n()] },
      })

      expect(wrapper.vm.activeSection).toBe('experience')

      wrapper.vm.sectionPositions = { about: { top: 0, height: 10000 } }
      window.dispatchEvent(new Event('resize'))
      vi.advanceTimersByTime(150)

      expect(wrapper.vm.activeSection).toBe('experience')
      expect(wrapper.vm.sectionPositions.experience).toEqual({
        top: 1000,
        height: 400,
      })
    })
  })

  describe('lifecycle', () => {
    it('restores body scroll and removes listeners on unmount', async () => {
      const removeWindowListener = vi.spyOn(window, 'removeEventListener')
      const removeDocumentListener = vi.spyOn(document, 'removeEventListener')

      const { unmount } = renderNavigation()
      await fireEvent.click(getMobileToggle())
      expect(document.body.style.overflow).toBe('hidden')

      unmount()

      expect(document.body.style.overflow).toBe('')
      expect(removeWindowListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function))
      expect(removeDocumentListener).toHaveBeenCalledWith('click', expect.any(Function))
      expect(removeDocumentListener).toHaveBeenCalledWith('keydown', expect.any(Function))
    })
  })
})
