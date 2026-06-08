import { markRaw } from 'vue'
import About from '@/components/About.vue'
import Impact from '@/components/Impact.vue'
import Portfolio from '@/components/Portfolio.vue'
import Experience from '@/components/Experience.vue'
import Skills from '@/components/Skills.vue'
import HowIWork from '@/components/HowIWork.vue'
import Credentials from '@/components/Credentials.vue'
import ContactClosing from '@/components/ContactClosing.vue'

/** Page section ids — single source of truth for nav, scroll spy, and tests */
export const SECTION_IDS = [
  'about',
  'impact',
  'portfolio',
  'experience',
  'skills',
  'howIWork',
  'credentials',
  'contact',
]

/** Mobile drawer nav items (icon + i18n key share the same id) */
export const NAV_ITEMS = [
  { id: 'about', icon: ['fas', 'user'] },
  { id: 'impact', icon: ['fas', 'chart-line'] },
  { id: 'portfolio', icon: ['fas', 'folder-open'] },
  { id: 'experience', icon: ['fas', 'briefcase'] },
  { id: 'skills', icon: ['fas', 'code'] },
  { id: 'howIWork', icon: ['fas', 'globe'] },
  { id: 'credentials', icon: ['fas', 'certificate'] },
  { id: 'contact', icon: ['fas', 'envelope'] },
]

/** Desktop nav — conversion-focused; brand covers home, credentials stay in-page only */
export const PRIMARY_NAV_IDS = [
  'impact',
  'portfolio',
  'experience',
  'skills',
  'howIWork',
  'contact',
]

/**
 * Main page sections in scroll order.
 * @type {Array<{
 *   id: string,
 *   component: import('vue').Component,
 *   showHeader: boolean,
 *   tone?: 'elevated' | 'alt',
 *   spacing?: 'default' | 'secondary' | 'none',
 * }>}
 */
export const PAGE_SECTIONS = [
  { id: 'about', component: markRaw(About), showHeader: false, tone: 'elevated', spacing: 'none' },
  { id: 'impact', component: markRaw(Impact), showHeader: true },
  { id: 'portfolio', component: markRaw(Portfolio), showHeader: true, tone: 'alt' },
  { id: 'experience', component: markRaw(Experience), showHeader: true },
  { id: 'skills', component: markRaw(Skills), showHeader: true, tone: 'alt' },
  { id: 'howIWork', component: markRaw(HowIWork), showHeader: true, spacing: 'secondary' },
  { id: 'credentials', component: markRaw(Credentials), showHeader: true, tone: 'alt', spacing: 'secondary' },
  { id: 'contact', component: markRaw(ContactClosing), showHeader: false, spacing: 'none' },
]

/** Maps section config to layout classes (`main.css` section rhythm). */
export function getSectionClasses(section) {
  const classes = ['section']

  if (section.tone) {
    classes.push(`section--${section.tone}`)
  }

  if (section.spacing === 'secondary') {
    classes.push('section--secondary')
  }

  if (section.spacing === 'none') {
    classes.push('section--compact')
  }

  return classes
}
