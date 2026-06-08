import { SECTION_IDS } from '@/config/sections'

export function setupNavigationDom() {
  SECTION_IDS.forEach((id, index) => {
    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const section = document.createElement('section')
    section.id = id

    const header = document.createElement('h2')
    header.id = `${id}-heading`
    section.appendChild(header)

    Object.defineProperty(section, 'offsetTop', {
      configurable: true,
      get: () => index * 500,
    })
    Object.defineProperty(section, 'offsetHeight', {
      configurable: true,
      get: () => 400,
    })

    section.getBoundingClientRect = () => ({ top: index * 500 })
    document.body.appendChild(section)
  })

  const existingNavbar = document.querySelector('.navbar')
  if (existingNavbar && !existingNavbar.closest('[data-testid="navigation-root"]')) {
    Object.defineProperty(existingNavbar, 'offsetHeight', {
      configurable: true,
      get: () => 64,
    })
  }
}

export function teardownNavigationDom() {
  SECTION_IDS.forEach((id) => {
    const section = document.getElementById(id)
    if (section) section.remove()
  })
}
