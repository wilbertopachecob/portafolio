/**
 * Observe an element entering the viewport and invoke a callback once.
 * Respects prefers-reduced-motion by firing immediately.
 * @param {Element} element
 * @param {(visible: boolean) => void} onVisible
 * @param {IntersectionObserverInit} [options]
 * @returns {() => void} cleanup
 */
export function observeInView(element, onVisible, options = {}) {
  if (!element) {
    return () => {}
  }

  if (
    typeof window.IntersectionObserver === 'undefined'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onVisible(true)
    return () => {}
  }

  const observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onVisible(true)
        observer.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px', ...options },
  )

  observer.observe(element)
  return () => observer.disconnect()
}
