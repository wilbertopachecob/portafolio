import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Navigation from '@/components/Navigation.vue'

describe('Navigation.vue', () => {
  it('renders the navigation bar', () => {
    render(Navigation)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders the brand/logo', () => {
    render(Navigation)
    const brand = screen.getByRole('link', { name: /Go to about section/ })
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveTextContent('Wilberto Pacheco')
  })

  it('renders navigation links', () => {
    render(Navigation)
    expect(screen.getByRole('menuitem', { name: /Go to about section/ })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Go to experience section/ })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Go to skills section/ })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Go to education section/ })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Go to languages section/ })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Go to certifications section/ })).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(Navigation)
    const themeToggle = screen.getByRole('switch')
    expect(themeToggle).toBeInTheDocument()
    expect(themeToggle).toHaveAttribute('aria-label', 'Switch to Dark Mode')
  })

  it('renders mobile menu toggle', () => {
    render(Navigation)
    const mobileToggle = screen.getByRole('button', { name: /Open mobile menu/ })
    expect(mobileToggle).toBeInTheDocument()
    expect(mobileToggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('has proper navigation menu structure', () => {
    render(Navigation)
    const navMenu = screen.getByRole('menubar')
    expect(navMenu).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(Navigation)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    
    const navMenu = screen.getByRole('menubar')
    expect(navMenu).toBeInTheDocument()
  })
}) 