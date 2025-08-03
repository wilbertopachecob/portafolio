import fs from 'fs'
import path from 'path'

describe('Component Structure Tests', () => {
  const componentsDir = path.join(__dirname, '../../src/components')
  
  test('About component file exists', () => {
    const aboutPath = path.join(componentsDir, 'About.vue')
    expect(fs.existsSync(aboutPath)).toBe(true)
  })

  test('About component contains expected content', () => {
    const aboutPath = path.join(componentsDir, 'About.vue')
    const content = fs.readFileSync(aboutPath, 'utf8')
    expect(content).toContain('$t(\'hero.title\')')
    expect(content).toContain('$t(\'hero.subtitle\')')
    expect(content).toContain('$t(\'hero.description\')')
  })

  test('About component has proper structure', () => {
    const aboutPath = path.join(componentsDir, 'About.vue')
    const content = fs.readFileSync(aboutPath, 'utf8')
    expect(content).toContain('<section')
    expect(content).toContain('role="banner"')
    expect(content).toContain('aria-labelledby')
  })

  test('Languages component file exists', () => {
    const languagesPath = path.join(componentsDir, 'Languages.vue')
    expect(fs.existsSync(languagesPath)).toBe(true)
  })

  test('Languages component contains expected content', () => {
    const languagesPath = path.join(componentsDir, 'Languages.vue')
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('$t(\'languages.spanish\')')
    expect(content).toContain('$t(\'languages.english\')')
  })

  test('Languages component has proper structure', () => {
    const languagesPath = path.join(componentsDir, 'Languages.vue')
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('<section')
    expect(content).toContain('id="languages"')
    expect(content).toContain('role="region"')
  })

  test('Navigation component file exists', () => {
    const navigationPath = path.join(componentsDir, 'Navigation.vue')
    expect(fs.existsSync(navigationPath)).toBe(true)
  })

  test('Navigation component contains expected content', () => {
    const navigationPath = path.join(componentsDir, 'Navigation.vue')
    const content = fs.readFileSync(navigationPath, 'utf8')
    expect(content).toContain('Wilberto Pacheco')
    expect(content).toContain('$t(\'nav.about\')')
    expect(content).toContain('$t(\'nav.experience\')')
    expect(content).toContain('$t(\'nav.skills\')')
  })

  test('Navigation component has proper structure', () => {
    const navigationPath = path.join(componentsDir, 'Navigation.vue')
    const content = fs.readFileSync(navigationPath, 'utf8')
    expect(content).toContain('<nav')
    expect(content).toContain('role="navigation"')
    expect(content).toContain('class="navbar"')
  })

  test('Skills component file exists', () => {
    const skillsPath = path.join(componentsDir, 'Skills.vue')
    expect(fs.existsSync(skillsPath)).toBe(true)
  })

  test('Skills component contains expected content', () => {
    const skillsPath = path.join(componentsDir, 'Skills.vue')
    const content = fs.readFileSync(skillsPath, 'utf8')
    expect(content).toContain('$t(\'skills.programmingLanguages\')')
    expect(content).toContain('JavaScript')
    expect(content).toContain('Vue.js')
  })

  test('Skills component has proper structure', () => {
    const skillsPath = path.join(componentsDir, 'Skills.vue')
    const content = fs.readFileSync(skillsPath, 'utf8')
    expect(content).toContain('<div class="skills-container"')
    expect(content).toContain('role="region"')
    expect(content).toContain('aria-labelledby')
  })

  test('Experience component file exists', () => {
    const experiencePath = path.join(componentsDir, 'Experience.vue')
    expect(fs.existsSync(experiencePath)).toBe(true)
  })

  test('Experience component contains expected content', () => {
    const experiencePath = path.join(componentsDir, 'Experience.vue')
    const content = fs.readFileSync(experiencePath, 'utf8')
    expect(content).toContain('getWorkExperience')
    expect(content).toContain('$t(\'experience.period\')')
    expect(content).toContain('$t(\'experience.location\')')
  })

  test('Experience component has proper structure', () => {
    const experiencePath = path.join(componentsDir, 'Experience.vue')
    const content = fs.readFileSync(experiencePath, 'utf8')
    expect(content).toContain('<div class="timeline"')
    expect(content).toContain('role="region"')
    expect(content).toContain('aria-labelledby')
  })

  test('All components have accessibility attributes', () => {
    const componentFiles = [
      'About.vue',
      'Languages.vue', 
      'Navigation.vue',
      'Skills.vue',
      'Experience.vue'
    ]

    componentFiles.forEach(file => {
      const filePath = path.join(componentsDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      expect(content).toContain('role=')
      expect(content).toContain('aria-')
    })
  })
}) 