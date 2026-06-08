<template>
  <component :is="resolvedIcon" v-if="resolvedIcon" />
</template>

<script>
// Inline, tree-shaken SVG icons via unplugin-icons (Font Awesome 6 set).
// Replaces the @fortawesome runtime: each import below is resolved at build
// time to a Vue component that renders a single <svg fill="currentColor"
// width="1em" height="1em">, so color and size inherit from CSS just like the
// previous FontAwesome inline SVGs.
import IconAws from '~icons/fa6-brands/aws'
import IconDocker from '~icons/fa6-brands/docker'
import IconGithub from '~icons/fa6-brands/github'
import IconJs from '~icons/fa6-brands/js'
import IconLinkedin from '~icons/fa6-brands/linkedin'
import IconNode from '~icons/fa6-brands/node'
import IconReact from '~icons/fa6-brands/react'
import IconVuejs from '~icons/fa6-brands/vuejs'
import IconXTwitter from '~icons/fa6-brands/x-twitter'

import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square'
import IconBriefcase from '~icons/fa6-solid/briefcase'
import IconCalendarDays from '~icons/fa6-solid/calendar-days'
import IconCertificate from '~icons/fa6-solid/certificate'
import IconChartLine from '~icons/fa6-solid/chart-line'
import IconCircleCheck from '~icons/fa6-solid/circle-check'
import IconCircleUp from '~icons/fa6-solid/circle-up'
import IconCode from '~icons/fa6-solid/code'
import IconDatabase from '~icons/fa6-solid/database'
import IconDownload from '~icons/fa6-solid/download'
import IconEnvelope from '~icons/fa6-solid/envelope'
import IconFolderOpen from '~icons/fa6-solid/folder-open'
import IconGlobe from '~icons/fa6-solid/globe'
import IconMagnifyingGlass from '~icons/fa6-solid/magnifying-glass'
import IconMoon from '~icons/fa6-solid/moon'
import IconPlug from '~icons/fa6-solid/plug'
import IconServer from '~icons/fa6-solid/server'
import IconSun from '~icons/fa6-solid/sun'
import IconUser from '~icons/fa6-solid/user'

// Keyed by the existing `[prefix, name]` tuples used across config and
// templates. FA5 names that were renamed in FA6 map to the new icon
// (e.g. search -> magnifying-glass, check-circle -> circle-check).
const ICONS = {
  'fab/aws': IconAws,
  'fab/docker': IconDocker,
  'fab/github': IconGithub,
  'fab/js': IconJs,
  'fab/linkedin': IconLinkedin,
  'fab/node': IconNode,
  'fab/react': IconReact,
  'fab/vuejs': IconVuejs,
  'fab/x-twitter': IconXTwitter,

  'fas/arrow-up-right-from-square': IconArrowUpRightFromSquare,
  'fas/arrow-alt-circle-up': IconCircleUp,
  'fas/briefcase': IconBriefcase,
  'fas/calendar-alt': IconCalendarDays,
  'fas/certificate': IconCertificate,
  'fas/chart-line': IconChartLine,
  'fas/check-circle': IconCircleCheck,
  'fas/code': IconCode,
  'fas/database': IconDatabase,
  'fas/download': IconDownload,
  'fas/envelope': IconEnvelope,
  'fas/folder-open': IconFolderOpen,
  'fas/globe': IconGlobe,
  'fas/search': IconMagnifyingGlass,
  'fas/moon': IconMoon,
  'fas/plug': IconPlug,
  'fas/server': IconServer,
  'fas/sun': IconSun,
  'fas/user': IconUser,
}

export default {
  name: 'AppIcon',
  props: {
    // Accepts the FontAwesome-style tuple, e.g. ['fas', 'envelope'].
    icon: {
      type: Array,
      required: true,
      validator: (value) => value.length === 2,
    },
  },
  computed: {
    resolvedIcon() {
      const [prefix, name] = this.icon
      return ICONS[`${prefix}/${name}`] || null
    },
  },
}
</script>
