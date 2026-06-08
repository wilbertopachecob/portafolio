import { describe, it, expect, vi, afterEach } from 'vitest'
import { track } from '@/utils/analytics'

describe('analytics.track', () => {
  afterEach(() => {
    delete window.plausible
    vi.restoreAllMocks()
  })

  it('does nothing when the event name is empty', () => {
    const listener = vi.fn()
    window.addEventListener('portfolio:track', listener)
    track('')
    window.removeEventListener('portfolio:track', listener)
    expect(listener).not.toHaveBeenCalled()
  })

  it('forwards to a Plausible-compatible provider when present', () => {
    window.plausible = vi.fn()
    track('cta_email', { location: 'hero' })
    expect(window.plausible).toHaveBeenCalledWith('cta_email', { props: { location: 'hero' } })
  })

  it('always dispatches a vendor-agnostic CustomEvent', () => {
    const listener = vi.fn()
    window.addEventListener('portfolio:track', listener)
    track('cta_cv_download', { location: 'contact' })
    window.removeEventListener('portfolio:track', listener)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener.mock.calls[0][0].detail).toEqual({
      event: 'cta_cv_download',
      props: { location: 'contact' },
    })
  })
})
