import { describe, it, expect, beforeEach } from 'vitest'
import { getContent, getWorkExperience, getEducation, getCertifications } from '@/i18n/content'

describe('i18n Content Helpers', () => {
  describe('getContent', () => {
    it('returns English content when locale is "en"', () => {
      const content = getContent('en')
      expect(content).toBeDefined()
      expect(content.workExperience).toBeDefined()
      expect(content.education).toBeDefined()
      expect(content.certifications).toBeDefined()
    })

    it('returns Spanish content when locale is "es"', () => {
      const content = getContent('es')
      expect(content).toBeDefined()
      expect(content.workExperience).toBeDefined()
      expect(content.education).toBeDefined()
      expect(content.certifications).toBeDefined()
    })

    it('returns English content as fallback for unknown locale', () => {
      const content = getContent('fr')
      expect(content).toBeDefined()
      expect(content.workExperience).toBeDefined()
    })

    it('returns empty object when no locale is provided', () => {
      const content = getContent()
      expect(content).toBeDefined()
      expect(content.workExperience).toBeDefined()
    })
  })

  describe('getWorkExperience', () => {
    it('returns English work experience when locale is "en"', () => {
      const workExperience = getWorkExperience('en')
      expect(Array.isArray(workExperience)).toBe(true)
      expect(workExperience.length).toBeGreaterThan(0)
      
      // Check first experience item structure
      const firstItem = workExperience[0]
      expect(firstItem).toHaveProperty('company')
      expect(firstItem).toHaveProperty('position')
      expect(firstItem).toHaveProperty('period')
      expect(firstItem).toHaveProperty('location')
      expect(firstItem).toHaveProperty('responsibilities')
      expect(Array.isArray(firstItem.responsibilities)).toBe(true)
    })

    it('returns Spanish work experience when locale is "es"', () => {
      const workExperience = getWorkExperience('es')
      expect(Array.isArray(workExperience)).toBe(true)
      expect(workExperience.length).toBeGreaterThan(0)
      
      // Check that content is actually in Spanish
      const firstItem = workExperience[0]
      expect(firstItem.position).toContain('Ingeniero') // Should contain Spanish text
    })

    it('returns English work experience as fallback for unknown locale', () => {
      const workExperience = getWorkExperience('fr')
      expect(Array.isArray(workExperience)).toBe(true)
      expect(workExperience.length).toBeGreaterThan(0)
    })

    it('returns empty array when no locale is provided', () => {
      const workExperience = getWorkExperience()
      expect(Array.isArray(workExperience)).toBe(true)
      expect(workExperience.length).toBeGreaterThan(0) // Should fallback to English
    })
  })

  describe('getEducation', () => {
    it('returns English education when locale is "en"', () => {
      const education = getEducation('en')
      expect(Array.isArray(education)).toBe(true)
      expect(education.length).toBeGreaterThan(0)
      
      // Check first education item structure
      const firstItem = education[0]
      expect(firstItem).toHaveProperty('institution')
      expect(firstItem).toHaveProperty('degree')
      expect(firstItem).toHaveProperty('period')
      expect(firstItem).toHaveProperty('link')
    })

    it('returns Spanish education when locale is "es"', () => {
      const education = getEducation('es')
      expect(Array.isArray(education)).toBe(true)
      expect(education.length).toBeGreaterThan(0)
      
      // Check that content is actually in Spanish
      const firstItem = education[0]
      expect(firstItem.institution).toContain('Universidad') // Should contain Spanish text
    })

    it('returns English education as fallback for unknown locale', () => {
      const education = getEducation('fr')
      expect(Array.isArray(education)).toBe(true)
      expect(education.length).toBeGreaterThan(0)
    })
  })

  describe('getCertifications', () => {
    it('returns English certifications when locale is "en"', () => {
      const certifications = getCertifications('en')
      expect(Array.isArray(certifications)).toBe(true)
      expect(certifications.length).toBeGreaterThan(0)
      
      // Check first certification item structure
      const firstItem = certifications[0]
      expect(firstItem).toHaveProperty('issuer')
      expect(firstItem).toHaveProperty('title')
      expect(firstItem).toHaveProperty('date')
      expect(firstItem).toHaveProperty('link')
      expect(firstItem).toHaveProperty('description')
      expect(firstItem).toHaveProperty('skills')
      expect(Array.isArray(firstItem.skills)).toBe(true)
    })

    it('returns Spanish certifications when locale is "es"', () => {
      const certifications = getCertifications('es')
      expect(Array.isArray(certifications)).toBe(true)
      expect(certifications.length).toBeGreaterThan(0)
      
      // Check that content is actually in Spanish
      const firstItem = certifications[0]
      expect(firstItem.description).toContain('certificación') // Should contain Spanish text
    })

    it('returns English certifications as fallback for unknown locale', () => {
      const certifications = getCertifications('fr')
      expect(Array.isArray(certifications)).toBe(true)
      expect(certifications.length).toBeGreaterThan(0)
    })
  })

  describe('Content Structure Validation', () => {
    it('ensures work experience has consistent structure across languages', () => {
      const enWork = getWorkExperience('en')
      const esWork = getWorkExperience('es')
      
      expect(enWork.length).toBe(esWork.length)
      
      enWork.forEach((item, index) => {
        const spanishItem = esWork[index]
        expect(Object.keys(item)).toEqual(Object.keys(spanishItem))
      })
    })

    it('ensures education has consistent structure across languages', () => {
      const enEducation = getEducation('en')
      const esEducation = getEducation('es')
      
      expect(enEducation.length).toBe(esEducation.length)
      
      enEducation.forEach((item, index) => {
        const spanishItem = esEducation[index]
        expect(Object.keys(item)).toEqual(Object.keys(spanishItem))
      })
    })

    it('ensures certifications have consistent structure across languages', () => {
      const enCertifications = getCertifications('en')
      const esCertifications = getCertifications('es')
      
      expect(enCertifications.length).toBe(esCertifications.length)
      
      enCertifications.forEach((item, index) => {
        const spanishItem = esCertifications[index]
        expect(Object.keys(item)).toEqual(Object.keys(spanishItem))
      })
    })
  })
}) 