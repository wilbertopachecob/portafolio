import { describe, it, expect, vi } from 'vitest'
import { getNavLabel } from '@/utils/nav-label'

describe('getNavLabel', () => {
  it('returns the short label when navShort is defined', () => {
    const te = vi.fn((key) => key === 'navShort.skills')
    const t = vi.fn((key) => ({
      'navShort.skills': 'Skills',
      'nav.skills': 'Technical capabilities',
    }[key]))

    expect(getNavLabel(te, t, 'skills')).toBe('Skills')
    expect(t).toHaveBeenCalledWith('navShort.skills')
  })

  it('falls back to the full nav label when no short label exists', () => {
    const te = vi.fn(() => false)
    const t = vi.fn((key) => ({
      'nav.impact': 'Impact',
    }[key]))

    expect(getNavLabel(te, t, 'impact')).toBe('Impact')
    expect(t).toHaveBeenCalledWith('nav.impact')
  })
})
