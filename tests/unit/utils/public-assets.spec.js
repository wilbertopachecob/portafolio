import { describe, it, expect } from 'vitest'
import { getPublicAssetUrl, resolveCredentialLink } from '@/utils/public-assets'

describe('public-assets', () => {
  it('prefixes public filenames with the Vite base URL', () => {
    expect(getPublicAssetUrl('certificates/cdac-itec-mwdt-2016.webp')).toMatch(
      /certificates\/cdac-itec-mwdt-2016\.webp$/
    )
  })

  it('keeps absolute credential URLs unchanged', () => {
    expect(resolveCredentialLink('https://www.credly.com/badges/example')).toBe(
      'https://www.credly.com/badges/example'
    )
  })

  it('resolves local credential files through the public asset helper', () => {
    expect(resolveCredentialLink('certificates/cdac-itec-mwdt-2016.webp')).toBe(
      getPublicAssetUrl('certificates/cdac-itec-mwdt-2016.webp')
    )
  })

  it('returns an empty string when the credential link is missing', () => {
    expect(resolveCredentialLink()).toBe('')
    expect(resolveCredentialLink('')).toBe('')
  })
})
