<template>
  <div ref="skillsRoot" class="skills-container" :class="{ 'is-visible': isVisible }">
    <ul class="skills-grid">
      <li
        v-for="(category, index) in skillCategories"
        :key="index"
        class="skill-category"
      >
        <h3 class="skill-category-title" v-html="category.title"></h3>
        <ul class="skill-items">
          <li
            v-for="(skill, skillIndex) in category.skills"
            :key="skillIndex"
            class="skill-item"
            :style="{ '--item-delay': `${skillIndex * 0.05}s` }"
          >
            <span class="skill-icon" v-if="skill.icon" aria-hidden="true">
              <font-awesome-icon
                :icon="skill.icon"
                :style="{ color: skill.iconColor || 'var(--primary-color)' }"
              />
            </span>
            <span class="skill-name">{{ skill.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { SKILL_CATEGORIES } from '@/config/skills'
import { observeInView } from '@/utils/inView'

export default {
  name: 'Skills',
  data() {
    return {
      isVisible: false,
      cleanupInView: null,
    }
  },
  computed: {
    skillCategories() {
      return SKILL_CATEGORIES.map(({ titleKey, skills }) => ({
        title: this.$t(titleKey),
        skills,
      }))
    },
  },
  mounted() {
    this.cleanupInView = observeInView(this.$refs.skillsRoot, () => {
      this.isVisible = true
    })
  },
  beforeUnmount() {
    if (this.cleanupInView) {
      this.cleanupInView()
    }
  },
}
</script>

<style scoped>
.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2xl);
  list-style: none;
  margin: 0;
  padding: 0;
}

.skill-category {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--card-padding-editorial);
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
}

.skill-category:hover {
  background: color-mix(in srgb, var(--bg-secondary) 35%, var(--bg-primary));
  box-shadow: var(--shadow-sm);
}

.skill-category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--border-light);
}

.skill-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  list-style: none;
  margin: 0;
  padding: 0;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
  min-width: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
}

.skills-container.is-visible .skill-item {
  animation: skillFadeIn 0.45s ease-out forwards;
  animation-delay: var(--item-delay, 0s);
}

.skill-item:hover {
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-sm);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.skill-icon :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 0;
  line-height: 1.3;
  overflow-wrap: break-word;
}

@keyframes skillFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-item {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .skill-category {
    padding: var(--card-padding-dense);
  }

  .skill-items {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }

  .skill-item {
    padding: var(--space-xs) var(--space-sm);
  }

  .skill-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 340px) {
  .skill-items {
    grid-template-columns: 1fr;
  }

  .skill-category-title {
    font-size: 1.125rem;
  }
}
</style>
