/** Static skill data — category titles come from i18n at render time */
export const SKILL_CATEGORIES = [
  {
    titleKey: 'skills.programmingLanguages',
    skills: [
      { name: 'JavaScript', icon: ['fab', 'js'], iconColor: '#F7DF1E' },
      { name: 'TypeScript', icon: ['fab', 'js'], iconColor: '#3178C6' },
      { name: 'PHP', icon: ['fab', 'php'], iconColor: '#8892BF' },
      { name: 'Golang', icon: ['fas', 'code'], iconColor: '#00ADD8' },
      { name: 'HTML5', icon: ['fab', 'html5'], iconColor: '#E44D26' },
      { name: 'CSS3', icon: ['fab', 'css3-alt'], iconColor: '#254BDD' },
    ],
  },
  {
    titleKey: 'skills.frameworksLibraries',
    skills: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'], iconColor: '#41B883' },
      { name: 'React', icon: ['fab', 'react'], iconColor: '#61DAFB' },
      { name: 'Angular', icon: ['fab', 'angular'], iconColor: '#D6002F' },
      { name: 'Laravel', icon: ['fab', 'laravel'], iconColor: '#F72C1F' },
      { name: 'Node.js', icon: ['fab', 'node'], iconColor: '#74AA63' },
      { name: 'Express.js', icon: ['fas', 'server'], iconColor: '#000000' },
      { name: 'Bootstrap', icon: ['fab', 'bootstrap'], iconColor: '#533B78' },
      { name: 'jQuery', icon: ['fas', 'code'], iconColor: '#0769AD' },
    ],
  },
  {
    titleKey: 'skills.databasesTools',
    skills: [
      { name: 'MySQL', icon: ['fas', 'database'], iconColor: '#4479A1' },
      { name: 'MongoDB', icon: ['fas', 'database'], iconColor: '#47A248' },
      { name: 'Microsoft SQL Server', icon: ['fas', 'database'], iconColor: '#CC2927' },
      { name: 'Redis', icon: ['fas', 'database'], iconColor: '#DC382D' },
      { name: 'Git', icon: ['fab', 'git'], iconColor: '#E84E31' },
      { name: 'GitHub', icon: ['fab', 'github'], iconColor: '#333333' },
    ],
  },
  {
    titleKey: 'skills.cloudDevops',
    skills: [
      { name: 'AWS', icon: ['fab', 'aws'], iconColor: '#FF9900' },
      { name: 'Docker', icon: ['fab', 'docker'], iconColor: '#2496ED' },
      { name: 'Linux', icon: ['fab', 'linux'], iconColor: '#FCC624' },
      { name: 'Apache', icon: ['fas', 'server'], iconColor: '#D22128' },
      { name: 'Nginx', icon: ['fas', 'server'], iconColor: '#009639' },
    ],
  },
  {
    titleKey: 'skills.contentManagement',
    skills: [
      { name: 'WordPress', icon: ['fab', 'wordpress'], iconColor: '#207196' },
      { name: 'Drupal', icon: ['fab', 'drupal'], iconColor: '#0097D7' },
      { name: 'SEO', icon: ['fas', 'search'], iconColor: '#4285F4' },
    ],
  },
  {
    titleKey: 'skills.developmentTools',
    skills: [
      { name: 'VS Code', icon: ['fas', 'code'], iconColor: '#007ACC' },
      { name: 'Webpack', icon: ['fas', 'cog'], iconColor: '#8DD6F9' },
      { name: 'ESLint', icon: ['fas', 'check-circle'], iconColor: '#4B32C3' },
      { name: 'Jest', icon: ['fas', 'vial'], iconColor: '#C21325' },
      { name: 'GraphQL', icon: ['fas', 'code'], iconColor: '#E10098' },
      { name: 'REST APIs', icon: ['fas', 'plug'], iconColor: '#FF6B6B' },
    ],
  },
]
