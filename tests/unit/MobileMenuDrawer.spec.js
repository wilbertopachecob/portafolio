import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { axe } from 'jest-axe'
import MobileMenuDrawer from '@/components/MobileMenuDrawer.vue'
import { NAV_ITEMS, PRIMARY_NAV_IDS } from '@/config/sections'
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

const navItems = PRIMARY_NAV_IDS
  .map((id) => NAV_ITEMS.find((item) => item.id === id))
  .filter(Boolean)

const labelFor = (itemId) => ({
  impact: 'Impact',
  portfolio: 'Products',
  experience: 'Experience',
  skills: 'Skills',
  howIWork: 'Process',
  contact: 'Contact',
}[itemId])

const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      hero: { downloadResume: 'Download Resume' },
      accessibility: {
        closeMenu: 'Close mobile menu',
        mobileNavigation: 'Mobile navigation',
      },
    },
  },
})

const renderDrawer = (props = {}) => {
  const i18n = createTestI18n()
  return render(MobileMenuDrawer, {
    props: {
      open: true,
      items: navItems,
      activeSection: 'experience',
      resumeUrl: getPublicAssetUrl(RESUME_FILENAME),
      resumeFilename: RESUME_FILENAME,
      labelFor,
      ...props,
    },
    global: { plugins: [i18n] },
  })
}

describe('MobileMenuDrawer.vue', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.querySelectorAll('.mobile-menu-backdrop, .mobile-menu-drawer').forEach((el) => {
      el.remove()
    })
  })

  it('renders drawer navigation when open', () => {
    renderDrawer()

    expect(screen.getByRole('dialog', { name: 'Mobile navigation' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    expect(document.querySelectorAll('.mm-nav .mm-link')).toHaveLength(navItems.length)
    expect(screen.getByText('Process')).toBeInTheDocument()
  })

  it('does not render drawer content when closed', () => {
    renderDrawer({ open: false })

    expect(document.querySelector('.mobile-menu-drawer')).toBeNull()
    expect(document.querySelector('.mobile-menu-backdrop')).toBeNull()
  })

  it('highlights the active section link', () => {
    renderDrawer({ activeSection: 'howIWork' })

    const activeLink = document.querySelector('.mm-link[href="#howIWork"]')
    expect(activeLink).toHaveClass('active')
    expect(activeLink).toHaveAttribute('aria-current', 'location')
  })

  it('renders the resume download action', () => {
    renderDrawer()

    const resumeLink = document.querySelector('.mm-resume-btn')
    expect(resumeLink).toHaveAttribute('href', getPublicAssetUrl(RESUME_FILENAME))
    expect(resumeLink).toHaveAttribute('download', RESUME_FILENAME)
    expect(resumeLink).toHaveTextContent('Download Resume')
  })

  it('emits close when backdrop or close button is clicked', async () => {
    const { emitted } = renderDrawer()

    await fireEvent.click(document.querySelector('.mobile-menu-backdrop'))
    expect(emitted().close).toHaveLength(1)

    await fireEvent.click(document.querySelector('.mm-close'))
    expect(emitted().close).toHaveLength(2)
  })

  it('emits navigate with the section id when a link is clicked', async () => {
    const { emitted } = renderDrawer()

    await fireEvent.click(document.querySelector('.mm-link[href="#skills"]'))

    expect(emitted().navigate).toEqual([['skills']])
  })

  it('should have no accessibility violations when open', async () => {
    renderDrawer()

    const results = await axe(document.body)
    expect(results).toHaveNoViolations()
  })
})
