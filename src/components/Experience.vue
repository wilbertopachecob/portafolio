<template>
  <div class="experience">
    <ul class="role-list">
      <li
        class="role"
        v-for="(job, index) in workExperience"
        :key="index"
      >
        <div class="role-aside">
          <div class="role-period">{{ job.period }}</div>
          <div class="role-company">{{ job.company }}</div>
          <div v-if="job.location" class="role-loc">{{ job.location }}</div>
        </div>

        <div class="role-main">
          <h3 class="role-pos">{{ job.position }}</h3>
          <p v-if="job.summary" class="role-summary">{{ job.summary }}</p>

          <div v-if="job.scopeTags && job.scopeTags.length" class="role-scope">
            <span v-for="tag in job.scopeTags" :key="tag" class="chip chip--accent">{{ tag }}</span>
          </div>

          <ul
            v-if="getDisplayAchievements(job).length"
            class="role-achievements"
            :aria-label="$t('experience.achievements')"
          >
            <li
              v-for="(achievement, achievementIndex) in getDisplayAchievements(job)"
              :key="achievementIndex"
            >
              {{ achievement }}
            </li>
          </ul>

          <div v-if="job.stack && job.stack.length" class="role-stack" :aria-label="$t('experience.stack')">
            <span v-for="technology in job.stack" :key="technology" class="tag">{{ technology }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getWorkExperience } from '@/i18n/content';

export default {
  name: "Experience",
  computed: {
    workExperience() {
      return getWorkExperience(this.$i18n.locale);
    },
  },
  methods: {
    getDisplayAchievements(job) {
      return (job.achievements && job.achievements.length)
        ? job.achievements.slice(0, 3)
        : (job.responsibilities || []).slice(0, 3);
    },
  },
};
</script>

<style scoped>
.role-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.125rem;
}

.role {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.875rem;
  background: var(--bg-primary);
  transition: border-color var(--transition-normal);
}

.role:hover {
  border-color: var(--border-color);
}

.role-period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--primary-color);
  letter-spacing: 0.04em;
}

.role-company {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 0.75rem;
  letter-spacing: -0.01em;
}

.role-loc {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin-top: 0.375rem;
}

.role-pos {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1.02rem;
  margin-bottom: 0.375rem;
}

.role-summary {
  color: var(--text-secondary);
  font-size: 0.96rem;
  line-height: 1.55;
  margin: 0 0 1.125rem;
}

.role-scope {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
}

.role-achievements {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  margin: 0 0 1.25rem;
  padding: 0;
}

.role-achievements li {
  position: relative;
  padding-left: 1.375rem;
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.role-achievements li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45rem;
  width: 8px;
  height: 8px;
  border: 1.5px solid var(--primary-color);
  border-radius: 2px;
  transform: rotate(45deg);
}

.role-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

/* Shared chip / tag tokens (kept local so component is self-contained) */
.chip {
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 5px 11px;
}

.chip--accent {
  color: var(--primary-color);
  border-color: color-mix(in srgb, var(--primary-color) 35%, var(--border-color));
  background: var(--accent-tint);
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
}

@media (max-width: 980px) {
  .role {
    grid-template-columns: 1fr;
    gap: 1.125rem;
  }

  .role-aside {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.375rem 0.875rem;
  }

  .role-company {
    margin-top: 0;
  }

  .role-loc {
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .role {
    padding: 1.375rem;
  }
}
</style>
