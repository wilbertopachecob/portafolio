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
