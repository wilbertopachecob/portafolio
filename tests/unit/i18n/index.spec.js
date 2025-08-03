import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import es from '@/i18n/locales/es.json'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'en-US',
  writable: true
})

describe('i18n Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('Translation Files', () => {
    it('has English translations with all required keys', () => {
      expect(en).toBeDefined()
      expect(en.nav).toBeDefined()
      expect(en.hero).toBeDefined()
      expect(en.sections).toBeDefined()
      expect(en.content).toBeDefined()
      
      // Check navigation keys
      expect(en.nav.about).toBe('About')
      expect(en.nav.experience).toBe('Experience')
      expect(en.nav.skills).toBe('Skills')
      expect(en.nav.education).toBe('Education')
      expect(en.nav.languages).toBe('Languages')
      expect(en.nav.certifications).toBe('Certifications')
    })

    it('has Spanish translations with all required keys', () => {
      expect(es).toBeDefined()
      expect(es.nav).toBeDefined()
      expect(es.hero).toBeDefined()
      expect(es.sections).toBeDefined()
      expect(es.content).toBeDefined()
      
      // Check navigation keys
      expect(es.nav.about).toBe('Acerca de')
      expect(es.nav.experience).toBe('Experiencia')
      expect(es.nav.skills).toBe('Habilidades')
      expect(es.nav.education).toBe('Educación')
      expect(es.nav.languages).toBe('Idiomas')
      expect(es.nav.certifications).toBe('Certificaciones')
    })

    it('has consistent structure between English and Spanish', () => {
      const enKeys = Object.keys(en)
      const esKeys = Object.keys(es)
      
      expect(enKeys).toEqual(esKeys)
      
      // Check that all nested objects have the same structure
      enKeys.forEach(key => {
        if (typeof en[key] === 'object' && en[key] !== null) {
          expect(Object.keys(en[key])).toEqual(Object.keys(es[key]))
        }
      })
    })
  })

  describe('Content Arrays', () => {
    it('has work experience content in English', () => {
      expect(en.content.workExperience).toBeDefined()
      expect(Array.isArray(en.content.workExperience)).toBe(true)
      expect(en.content.workExperience.length).toBeGreaterThan(0)
      
      const firstJob = en.content.workExperience[0]
      expect(firstJob).toHaveProperty('company')
      expect(firstJob).toHaveProperty('position')
      expect(firstJob).toHaveProperty('period')
      expect(firstJob).toHaveProperty('location')
      expect(firstJob).toHaveProperty('responsibilities')
      expect(Array.isArray(firstJob.responsibilities)).toBe(true)
    })

    it('has work experience content in Spanish', () => {
      expect(es.content.workExperience).toBeDefined()
      expect(Array.isArray(es.content.workExperience)).toBe(true)
      expect(es.content.workExperience.length).toBeGreaterThan(0)
      
      const firstJob = es.content.workExperience[0]
      expect(firstJob).toHaveProperty('company')
      expect(firstJob).toHaveProperty('position')
      expect(firstJob).toHaveProperty('period')
      expect(firstJob).toHaveProperty('location')
      expect(firstJob).toHaveProperty('responsibilities')
      expect(Array.isArray(firstJob.responsibilities)).toBe(true)
    })

    it('has education content in both languages', () => {
      expect(en.content.education).toBeDefined()
      expect(es.content.education).toBeDefined()
      expect(Array.isArray(en.content.education)).toBe(true)
      expect(Array.isArray(es.content.education)).toBe(true)
      
      expect(en.content.education.length).toBe(es.content.education.length)
    })

    it('has certifications content in both languages', () => {
      expect(en.content.certifications).toBeDefined()
      expect(es.content.certifications).toBeDefined()
      expect(Array.isArray(en.content.certifications)).toBe(true)
      expect(Array.isArray(es.content.certifications)).toBe(true)
      
      expect(en.content.certifications.length).toBe(es.content.certifications.length)
    })
  })

  describe('i18n Instance Creation', () => {
    it('creates a valid i18n instance with English locale', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages: { en, es }
      })
      
      expect(i18n).toBeDefined()
      expect(i18n.global.locale.value).toBe('en')
      expect(i18n.global.fallbackLocale.value).toBe('en')
    })

    it('creates a valid i18n instance with Spanish locale', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'es',
        fallbackLocale: 'en',
        messages: { en, es }
      })
      
      expect(i18n).toBeDefined()
      expect(i18n.global.locale.value).toBe('es')
      expect(i18n.global.fallbackLocale.value).toBe('en')
    })

    it('has all required translation keys', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages: { en, es }
      })
      
      // Test that all required keys are accessible
      expect(i18n.global.t('nav.about')).toBe('About')
      expect(i18n.global.t('hero.title')).toBe('Wilberto Pacheco')
      expect(i18n.global.t('sections.experience.title')).toBe('Experience')
    })
  })

  describe('Translation Quality', () => {
    it('has no empty translation values', () => {
      const checkEmptyValues = (obj, path = '') => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key
          
          if (typeof value === 'string' && value.trim() === '') {
            throw new Error(`Empty translation found at: ${currentPath}`)
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            checkEmptyValues(value, currentPath)
          }
        }
      }
      
      expect(() => checkEmptyValues(en)).not.toThrow()
      expect(() => checkEmptyValues(es)).not.toThrow()
    })

    it('has proper Spanish translations (not just copied English)', () => {
      // Check that Spanish translations are actually different from English
      expect(es.nav.about).not.toBe(en.nav.about)
      expect(es.nav.experience).not.toBe(en.nav.experience)
      expect(es.hero.subtitle).not.toBe(en.hero.subtitle)
    })

    it('has consistent array lengths across languages', () => {
      expect(en.content.workExperience.length).toBe(es.content.workExperience.length)
      expect(en.content.education.length).toBe(es.content.education.length)
      expect(en.content.certifications.length).toBe(es.content.certifications.length)
    })
  })
}) 