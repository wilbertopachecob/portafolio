/**
 * Lightweight, provider-agnostic, SSR-safe analytics helper.
 *
 * It is always safe to call: it no-ops during SSR/prerender (no `window`) and
 * when no analytics provider is wired up. To enable conversion tracking, load a
 * provider in `index.html` — a Plausible-compatible global (`window.plausible`)
 * is forwarded automatically, with no cookies and no PII.
 *
 * Regardless of provider, every call dispatches a `portfolio:track` CustomEvent
 * on `window`, so tooling (or tests) can observe CTA conversions without
 * coupling the app to any specific vendor.
 *
 * @param {string} event - Event name, e.g. `'cta_email'`.
 * @param {Record<string, string|number|boolean>} [props] - Optional event props.
 * @returns {void}
 */
export function track(event, props = {}) {
  if (typeof window === 'undefined' || !event) {
    return
  }

  // Plausible-compatible providers expose a global function.
  if (typeof window.plausible === 'function') {
    window.plausible(event, { props })
  }

  // Vendor-agnostic hook: anything can listen without depending on a provider.
  window.dispatchEvent(new window.CustomEvent('portfolio:track', { detail: { event, props } }))
}
