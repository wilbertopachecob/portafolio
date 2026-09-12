/**
 * Builds a public asset URL that respects Vite's configured base path.
 *
 * Use this for files in `public/` that are linked from templates, especially
 * when the site is deployed under `/portafolio/` on GitHub Pages.
 *
 * @param {string} filename - Public asset filename or relative path.
 * @returns {string} Base-prefixed public asset URL.
 */
export function getPublicAssetUrl(filename) {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const normalizedFilename = filename.replace(/^\/+/, '')
  return `${normalizedBase}${normalizedFilename}`
}

/**
 * Resolves a credential link that may be an external URL or a file in `public/`.
 *
 * @param {string} [link] - Absolute http(s) URL or public-relative path.
 * @returns {string} Link ready for an href, or an empty string when missing.
 */
export function resolveCredentialLink(link) {
  if (!link) {
    return ''
  }

  if (/^https?:\/\//i.test(link)) {
    return link
  }

  return getPublicAssetUrl(link)
}

export const RESUME_FILENAME = 'Senior_Engineer_Wilberto_Pacheco_Batista.pdf'
