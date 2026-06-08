/** Static skill data — category titles come from i18n at render time */
export const SKILL_CATEGORIES = [
  {
    titleKey: 'skills.productEngineering',
    skills: [
      { name: 'TypeScript', icon: ['fab', 'js'], iconColor: '#3178C6' },
      { name: 'React', icon: ['fab', 'react'], iconColor: '#61DAFB' },
      { name: 'Vue.js', icon: ['fab', 'vuejs'], iconColor: '#41B883' },
      { name: 'Node.js', icon: ['fab', 'node'], iconColor: '#74AA63' },
    ],
  },
  {
    titleKey: 'skills.modernizationArchitecture',
    skills: [
      { name: 'Go', icon: ['fas', 'code'], iconColor: '#00ADD8' },
      { name: 'REST APIs', icon: ['fas', 'plug'], iconColor: '#2563eb' },
      { name: 'Feature flags', icon: ['fas', 'check-circle'], iconColor: '#64748b' },
      { name: 'Legacy migrations', icon: ['fas', 'server'], iconColor: '#f59e0b' },
    ],
  },
  {
    titleKey: 'skills.platformData',
    skills: [
      { name: 'Redis', icon: ['fas', 'database'], iconColor: '#DC382D' },
      { name: 'Elasticsearch', icon: ['fas', 'search'], iconColor: '#f59e0b' },
      { name: 'Supabase', icon: ['fas', 'database'], iconColor: '#3ECF8E' },
      { name: 'Amplitude', icon: ['fas', 'chart-line'], iconColor: '#2563eb' },
    ],
  },
  {
    titleKey: 'skills.cloudOperations',
    skills: [
      { name: 'AWS', icon: ['fab', 'aws'], iconColor: '#FF9900' },
      { name: 'Docker', icon: ['fab', 'docker'], iconColor: '#2496ED' },
      { name: 'Linux', icon: ['fab', 'linux'], iconColor: '#FCC624' },
      { name: 'Cloudflare Tunnel', icon: ['fas', 'server'], iconColor: '#f59e0b' },
    ],
  },
]
