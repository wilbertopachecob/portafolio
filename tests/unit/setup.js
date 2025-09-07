// Vitest setup file
import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

// Extend vitest expect with jest-axe matchers
expect.extend(toHaveNoViolations)

// Configure global stubs for FontAwesome components
config.global.stubs = {
  'font-awesome-icon': {
    template: '<span data-testid="font-awesome-icon" v-bind="$attrs"></span>',
    inheritAttrs: false
  },
  'font-awesome-layers': true,
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock 