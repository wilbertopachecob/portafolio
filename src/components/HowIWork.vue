<template>
  <ul class="principles" :aria-label="$t('sections.howIWork.title')">
    <li
      v-for="(principle, index) in principles"
      :key="principle.title"
      class="principle"
      :class="{ 'principle--solo': isLastOdd(index) }"
    >
      <span class="principle-num" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
      <div class="principle-body">
        <h3 class="principle-title">{{ principle.title }}</h3>
        <p class="principle-description">{{ principle.description }}</p>
      </div>
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
  methods: {
    // Make the final item span the full row when the count is odd (2-col grid)
    isLastOdd(index) {
      const total = this.principles.length
      return index === total - 1 && total % 2 === 1
    },
  },
}
</script>

<style scoped>
.principles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--border-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
}

.principle {
  background: var(--bg-primary);
  padding: 2rem;
  display: flex;
  gap: 1.25rem;
  transition: background var(--transition-normal);
}

.principle:hover {
  background: var(--accent-tint);
}

.principle--solo {
  grid-column: 1 / -1;
}

.principle-num {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--primary-color);
  padding-top: 0.25rem;
}

.principle-title {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.55rem;
  line-height: 1.3;
}

.principle-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.94rem;
  line-height: 1.55;
}

@media (max-width: 768px) {
  .principles {
    grid-template-columns: 1fr;
  }

  .principle--solo {
    grid-column: auto;
  }

  .principle {
    padding: 1.5rem;
  }
}
</style>
