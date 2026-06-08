<template>
  <div class="impact-grid" role="list" :aria-label="$t('sections.impact.title')">
    <div
      v-for="highlight in highlights"
      :key="highlight.title"
      class="impact-card"
      role="listitem"
    >
      <p class="impact-metric">{{ highlight.metric }}</p>
      <h3 class="impact-title">{{ highlight.title }}</h3>
      <p class="impact-description">{{ highlight.description }}</p>
    </div>
  </div>
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
}

.impact-card {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-width: 0;
  padding: var(--space-xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal), transform var(--transition-normal);
}

.impact-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.impact-metric {
  margin: 0;
  min-width: 0;
  max-width: 100%;
  color: var(--primary-color);
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
    padding: var(--space-lg);
  }
}
</style>
