# Internationalization (i18n) Implementation

This document describes the internationalization implementation for the portfolio website, allowing users to switch between English and Spanish languages.

## 🚀 Features Implemented

### ✅ Core i18n Setup
- **Vue I18n v9** integration with Composition API
- **Automatic language detection** from browser settings
- **Local storage persistence** for user language preference
- **Fallback to English** for unsupported languages

### ✅ Language Toggle Component
- **Visual flag-based toggle** with English and Spanish flags
- **Smooth animations** and hover effects
- **Accessibility support** with proper ARIA labels
- **Mobile responsive** design

### ✅ Translated Content
- **Navigation menu** items
- **Hero section** (title, subtitle, description, buttons)
- **Section headers** and subtitles
- **Experience section** (period, location, achievements labels)
- **Skills section** (all category titles)
- **Education section** (period, visit website labels)
- **Languages section** (language names, flag labels)
- **Certifications section** (issued date, skills covered, badge labels)
- **Footer content**
- **Accessibility labels** and screen reader text

### ✅ Dynamic Features
- **Document title** updates based on language
- **HTML lang attribute** updates
- **Meta tags** for SEO (can be extended)

## 📁 File Structure

```
src/
├── i18n/
│   ├── index.js              # Main i18n configuration
│   └── locales/
│       ├── en.json           # English translations
│       └── es.json           # Spanish translations
├── components/
│   ├── LanguageToggle.vue    # Language toggle component
│   ├── Navigation.vue        # Updated with i18n
│   ├── About.vue            # Updated with i18n
│   └── App.vue              # Updated with i18n
└── main.js                  # Updated with i18n setup
```

## 🔧 Configuration

### Main i18n Setup (`src/i18n/index.js`)

```javascript
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'es'].includes(savedLocale)) {
    return savedLocale
  }
  
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'es'].includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: { en, es },
  globalInjection: true,
  silentTranslationWarn: process.env.NODE_ENV === 'production'
})
```

### Language Toggle Component (`src/components/LanguageToggle.vue`)

Features:
- **Flag-based visual design** with English and Spanish flags
- **Smooth transitions** between languages
- **Accessibility support** with proper ARIA attributes
- **Local storage persistence** of language choice
- **Dynamic document updates** (title, lang attribute)

## 🌐 Translation Keys

### Navigation (`nav`)
- `about` - "About" / "Acerca de"
- `experience` - "Experience" / "Experiencia"
- `skills` - "Skills" / "Habilidades"
- `education` - "Education" / "Educación"
- `languages` - "Languages" / "Idiomas"
- `certifications` - "Certifications" / "Certificaciones"

### Hero Section (`hero`)
- `title` - "Wilberto Pacheco"
- `subtitle` - "Software Engineer" / "Ingeniero de Software"
- `description` - Full description in both languages
- `viewExperience` - "View Experience" / "Ver Experiencia"
- `viewSkills` - "View Skills" / "Ver Habilidades"

### Sections (`sections`)
- `experience.title` / `experience.subtitle`
- `skills.title` / `skills.subtitle`
- `education.title` / `education.subtitle`
- `languages.title` / `languages.subtitle`
- `certifications.title` / `certifications.subtitle`

### Accessibility (`accessibility`)
- `skipToContent` - "Skip to main content" / "Saltar al contenido principal"
- `darkMode` / `lightMode` - Theme toggle labels
- `languageToggle` - "Toggle language" / "Cambiar idioma"

## 🎨 Styling

### Language Toggle Design
- **Flag-based visual** with English and Spanish flags
- **Smooth hover animations** with transform effects
- **Responsive design** that adapts to mobile screens
- **Dark mode support** with proper color schemes
- **Focus states** for accessibility

### CSS Variables Used
```css
.language-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}
```

## 🔄 Usage

### In Components
```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>{{ $t('hero.description') }}</p>
</template>
```

### In Script
```javascript
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, locale } = useI18n()
    
    const changeLanguage = (newLocale) => {
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
    }
    
    return { t, changeLanguage }
  }
}
```

## 🚀 Adding New Languages

1. **Create new locale file** (`src/i18n/locales/fr.json`)
2. **Add to i18n configuration** in `src/i18n/index.js`
3. **Update language detection** logic
4. **Add flag image** to `src/assets/img/`
5. **Update LanguageToggle component** to include new language

### Example for French:
```javascript
// src/i18n/index.js
import fr from './locales/fr.json'

const i18n = createI18n({
  // ...
  messages: { en, es, fr },
  // ...
})
```

## 📱 Mobile Support

- **Responsive language toggle** that adapts to mobile screens
- **Mobile menu integration** with language toggle
- **Touch-friendly** button sizes and spacing
- **Proper viewport** handling for different screen sizes

## ♿ Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** for language toggle
- **Screen reader announcements** for language changes
- **High contrast** support in both light and dark modes

## 🔧 Development

### Testing
- **Language switching** functionality
- **Local storage persistence**
- **Browser language detection**
- **Fallback behavior**
- **Mobile responsiveness**

### Debugging
- **Vue DevTools** integration for i18n debugging
- **Console warnings** for missing translations (development only)
- **Silent fallbacks** in production

## 🚀 Future Enhancements

### Potential Improvements
1. **More languages** (French, Portuguese, etc.)
2. **RTL support** for languages like Arabic
3. **Dynamic content loading** for better performance
4. **SEO optimization** with language-specific meta tags
5. **Analytics tracking** for language usage
6. **Automatic translation** suggestions for missing keys

### SEO Considerations
- **Hreflang tags** for search engines
- **Language-specific URLs** (optional)
- **Structured data** in multiple languages
- **Meta description** translations

## 📝 Notes

- **Vue I18n v9** uses the Composition API by default
- **Global injection** is enabled for easier usage
- **Silent warnings** in production to avoid console noise
- **Local storage** ensures user preference persistence
- **Browser detection** provides smart defaults

This implementation provides a solid foundation for multilingual support while maintaining excellent user experience and accessibility standards. 