<template>
  <div ref="skillsRoot" class="cap-wrap" :class="{ 'is-visible': isVisible }">
    <ul class="cap-grid">
      <li
        v-for="(category, index) in skillCategories"
        :key="index"
        class="cap"
      >
        <div class="cap-head">
          <span class="cap-idx">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="cap-title" v-html="category.title"></h3>
        </div>
        <ul class="cap-tags">
          <li
            v-for="(skill, skillIndex) in category.skills"
            :key="skillIndex"
            class="tag"
          >
            {{ skill.name }}
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
.cap-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cap {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.875rem;
  background: var(--bg-primary);
  transition: border-color var(--transition-normal);
}

.cap:hover {
  border-color: var(--border-color);
}

.cap-head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
}

.cap-idx {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--primary-color);
}

.cap-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.cap-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 7px 11px;
  background: var(--bg-primary);
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.cap:hover .tag {
  border-color: var(--border-color);
}

@media (max-width: 880px) {
  .cap-grid {
    grid-template-columns: 1fr;
  }

  .cap {
    padding: 1.5rem;
  }
}
</style>
