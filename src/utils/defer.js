/** Run callback when the browser is idle, falling back to setTimeout */
export function deferWhenIdle(callback, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout })
  } else {
    window.setTimeout(callback, timeout)
  }
}
