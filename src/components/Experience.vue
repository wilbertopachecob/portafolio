<template>
  <div class="timeline" role="region" aria-labelledby="experience-heading">
    <h2 id="experience-heading" class="sr-only">Work Experience Timeline</h2>
    <ul class="timeline-list" role="list">
      <li 
        class="timeline-item"
        v-for="(job, index) in workExperience"
        :key="index"
        role="listitem"
      >
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-company">{{ job.company }}</h3>
          <div class="timeline-position">{{ job.position }}</div>
          <div class="timeline-period">
            <font-awesome-icon :icon="['fas', 'calendar-alt']" aria-hidden="true" />
            <span>{{ $t('experience.period') }}: {{ job.period }}</span>
            <span v-if="job.location" class="timeline-location">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" aria-hidden="true" />
              <span>{{ $t('experience.location') }}: {{ job.location }}</span>
            </span>
          </div>
        </div>
        
        <p v-if="job.summary" class="timeline-summary">{{ job.summary }}</p>

        <div v-if="job.scopeTags && job.scopeTags.length" class="timeline-tags" role="list" :aria-label="$t('experience.scope')">
          <span
            v-for="tag in job.scopeTags"
            :key="tag"
            class="timeline-tag"
            role="listitem"
          >
            {{ tag }}
          </span>
        </div>

        <div v-if="getDisplayAchievements(job).length" class="timeline-description">
          <ul class="timeline-achievements" role="list" :aria-label="$t('experience.achievements')">
            <li 
              v-for="(achievement, achievementIndex) in getDisplayAchievements(job)"
              :key="achievementIndex"
              class="timeline-achievement"
              role="listitem"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>

        <div v-if="job.stack && job.stack.length" class="timeline-stack">
          <span class="timeline-stack-label">{{ $t('experience.stack') }}</span>
          <div class="timeline-stack-items" role="list" :aria-label="$t('experience.stack')">
            <span
              v-for="technology in job.stack"
              :key="technology"
              class="timeline-stack-item"
              role="listitem"
            >
              {{ technology }}
            </span>
          </div>
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
/* Timeline Styles */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-2xl);
  padding-left: 60px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 4px solid var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.timeline-content {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.timeline-content:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.timeline-header {
  margin-bottom: var(--space-lg);
}

.timeline-company {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.timeline-position {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.timeline-period {
  color: var(--text-muted);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.timeline-location {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-left: var(--space-md);
}

.timeline-period svg,
.timeline-location svg {
  color: var(--text-muted);
  width: 0.875rem;
  height: 0.875rem;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.timeline-summary {
  margin: 0 0 var(--space-lg);
  color: var(--text-secondary);
  line-height: 1.65;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.timeline-tag {
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--primary-color);
  font-size: 0.8125rem;
  font-weight: 600;
}

.timeline-achievements {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-achievement {
  position: relative;
  padding-left: var(--space-lg);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.timeline-achievement::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}

.timeline-achievement:last-child {
  margin-bottom: 0;
}

.timeline-stack {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-light);
}

.timeline-stack-label {
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.timeline-stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.timeline-stack-item {
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline::before {
    left: 15px;
  }
  
  .timeline-item {
    padding-left: 45px;
  }
  
  .timeline-item::before {
    left: 6px;
    width: 18px;
    height: 18px;
  }
  
  .timeline-content {
    padding: var(--space-lg);
  }
  
  .timeline-company {
    font-size: 1.25rem;
  }
  
  .timeline-position {
    font-size: 1rem;
  }
  
  .timeline-period {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
  
  .timeline-location {
    margin-left: 0;
  }

  .timeline-stack {
    flex-direction: column;
    gap: var(--space-sm);
  }
}

@media (max-width: 480px) {
  .timeline-content {
    padding: var(--space-md);
  }
  
  .timeline-company {
    font-size: 1.125rem;
  }
  
  .timeline-achievement {
    padding-left: var(--space-md);
    font-size: 0.9rem;
  }
}
</style>
