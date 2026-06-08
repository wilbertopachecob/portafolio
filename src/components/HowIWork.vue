<template>
  <div class="how-i-work" role="list" :aria-label="$t('sections.howIWork.title')">
    <div
      v-for="principle in principles"
      :key="principle.title"
      class="how-i-work-card"
      role="listitem"
    >
      <h3 class="how-i-work-title">{{ principle.title }}</h3>
      <p class="how-i-work-description">{{ principle.description }}</p>
    </div>
  </div>
</template>

<script>
import { getHowIWorkPrinciples } from '@/i18n/content'

export default {
  name: 'HowIWork',
  computed: {
    principles() {
      return getHowIWorkPrinciples(this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
/* 3+2 centered layout — requires exactly 5 cards (items 1-3 span 2, items 4-5 span 3) */
.how-i-work {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-xl);
}

.how-i-work-card:nth-child(-n+3) {
  grid-column: span 2;
}

.how-i-work-card:nth-child(n+4) {
  grid-column: span 3;
}

.how-i-work-card {
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

.how-i-work-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.how-i-work-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.4;
}

.how-i-work-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .how-i-work {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .how-i-work-card:nth-child(-n+3),
  .how-i-work-card:nth-child(n+4) {
    grid-column: auto;
  }

  .how-i-work-card {
    padding: var(--space-lg);
  }
}
</style>
