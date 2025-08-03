import fs from 'fs'
import path from 'path'

describe('Languages.vue Component Tests', () => {
  const languagesPath = path.join(__dirname, '../../src/components/Languages.vue')
  
  test('Languages component file exists', () => {
    expect(fs.existsSync(languagesPath)).toBe(true)
  })

  test('Languages component contains language names', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('Spanish')
    expect(content).toContain('English')
  })

  test('Languages component contains flag images', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('spanish_flag.png')
    expect(content).toContain('english_flag.png')
  })

  test('Languages component has proper accessibility attributes', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('role="region"')
    expect(content).toContain('aria-labelledby')
    expect(content).toContain('id="languages"')
  })

  test('Languages component has proper semantic structure', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('<section')
    expect(content).toContain('class="language-card"')
    expect(content).toContain('class="flag-image"')
  })

  test('Languages component contains alt text for images', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('alt="`Flag of ${language.name}`"')
    expect(content).toContain('aria-label="`Flag representing ${language.name} language`"')
  })

  test('Languages component has proper data structure', () => {
    const content = fs.readFileSync(languagesPath, 'utf8')
    expect(content).toContain('languages: [')
    expect(content).toContain('name: "Spanish"')
    expect(content).toContain('name: "English"')
  })
}) 