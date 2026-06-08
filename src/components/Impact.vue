<template>
  <ul class="impact-grid" :aria-label="$t('sections.impact.title')">
    <li
      v-for="highlight in highlights"
      :key="highlight.title"
      class="impact-card"
    >
      <p class="impact-metric">{{ highlight.metric }}</p>
      <h3 class="impact-title">{{ highlight.title }}</h3>
      <p class="impact-description">{{ highlight.description }}</p>
    </li>
  </ul>
</template>

<script>
import { getImpactHighlights } from '@/i18n/content'

export default {
  name: 'Impact',
  computed: {
    highlights() {
      return getImpactHighlights(this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-xl);
  list-style: none;
  margin: 0;
  padding: 0;
}

.impact-card {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-width: 0;
  padding: var(--card-padding-editorial);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.impact-card:hover {
  background: color-mix(in srgb, var(--bg-secondary) 35%, var(--bg-primary));
  box-shadow: var(--shadow-md);
}

.impact-metric {
  margin: 0;
  min-width: 0;
  max-width: 100%;
  color: var(--accent-color);
  font-size: clamp(1.125rem, 7cqi, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  overflow-wrap: break-word;
}

.impact-title {
  margin: 0;
  min-width: 0;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
}

.impact-description {
  margin: 0;
  min-width: 0;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .impact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .impact-card {
    padding: var(--card-padding-dense);
  }
}
</style>
