<template>
  <ul class="how-i-work">
    <li
      v-for="principle in principles"
      :key="principle.title"
      class="how-i-work-card"
    >
      <h3 class="how-i-work-title">{{ principle.title }}</h3>
      <p class="how-i-work-description">{{ principle.description }}</p>
    </li>
  </ul>
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
.how-i-work {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-xl);
  list-style: none;
  margin: 0;
  padding: 0;
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
  padding: var(--card-padding-editorial);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.how-i-work-card:hover {
  background: color-mix(in srgb, var(--bg-secondary) 35%, var(--bg-primary));
  box-shadow: var(--shadow-md);
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
    padding: var(--card-padding-dense);
  }
}
</style>
