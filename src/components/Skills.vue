<template>
  <div class="skills-container" role="region" aria-labelledby="skills-heading">
    <h2 id="skills-heading" class="sr-only">{{ $t('sections.skills.title') }}</h2>
    <!-- Skills Grid -->
    <div class="skills-grid" role="list" :aria-label="$t('sections.skills.title')">
      <div 
        class="skill-category"
        v-for="(category, index) in skillCategories"
        :key="index"
        role="listitem"
      >
        <h3 class="skill-category-title" v-html="category.title"></h3>
        <div class="skill-items" role="list" :aria-label="category.title">
          <div 
            class="skill-item"
            v-for="(skill, skillIndex) in category.skills"
            :key="skillIndex"
            role="listitem"
          >
            <div class="skill-icon" v-if="skill.icon">
              <font-awesome-icon 
                :icon="skill.icon" 
                :style="{ color: skill.iconColor || 'var(--primary-color)' }"
                :aria-label="`${skill.name} icon`"
                aria-hidden="true"
              />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SKILL_CATEGORIES } from '@/config/skills'

export default {
  name: "Skills",
  computed: {
    skillCategories() {
      return SKILL_CATEGORIES.map(({ titleKey, skills }) => ({
        title: this.$t(titleKey),
        skills,
      }))
    },
  },
};
</script>

<style scoped>
/* Skills Container */
.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-2xl);
}

/* Skill Category */
.skill-category {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
}

.skill-category:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.skill-category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--border-light);
}

/* Skill Items */
.skill-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.skill-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  transition: all var(--transition-normal);
  min-width: 0;
  overflow: hidden;
}

.skill-item:hover {
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-sm);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.skill-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 0;
  line-height: 1.3;
  overflow-wrap: break-word;
}

/* Responsive Design */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .skill-category {
    padding: var(--space-lg);
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

@media (max-width: 480px) {
  .skill-items {
    grid-template-columns: 1fr;
  }
  
  .skill-item {
    justify-content: flex-start;
  }
  
  .skill-category-title {
    font-size: 1.125rem;
  }
}

/* Animation for skill items */
.skill-item {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.skill-item:nth-child(1) { animation-delay: 0.1s; }
.skill-item:nth-child(2) { animation-delay: 0.2s; }
.skill-item:nth-child(3) { animation-delay: 0.3s; }
.skill-item:nth-child(4) { animation-delay: 0.4s; }
.skill-item:nth-child(5) { animation-delay: 0.5s; }
.skill-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
