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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.125rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.impact-card {
  container-type: inline-size;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  min-width: 0;
  padding: 1.75rem 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-normal), transform var(--transition-normal);
}

/* Accent rule on hover (flat, editorial — no shadow) */
.impact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  background: var(--primary-color);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.impact-card:hover {
  border-color: var(--border-color);
  transform: translateY(-3px);
}

.impact-card:hover::before {
  opacity: 1;
}

.impact-metric {
  margin: 0;
  min-width: 0;
  max-width: 100%;
  font-family: var(--font-display);
  color: var(--primary-color);
  font-size: clamp(1.125rem, 7cqi, 2rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  overflow-wrap: break-word;
}

.impact-title {
  margin: 0;
  min-width: 0;
  color: var(--text-primary);
  font-size: 1.08rem;
  font-weight: 600;
}

.impact-description {
  margin: 0;
  min-width: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.55;
}

@media (max-width: 880px) {
  .impact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 540px) {
  .impact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
