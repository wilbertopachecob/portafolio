<template>
  <div class="timeline" role="region" aria-labelledby="experience-heading">
    <h2 id="experience-heading" class="sr-only">Work Experience Timeline</h2>
    <div 
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
        
        <div class="timeline-description">
          <ul class="timeline-achievements" role="list" :aria-label="$t('experience.achievements')">
            <li 
              v-for="(responsibility, respIndex) in job.responsibilities" 
              :key="respIndex"
              class="timeline-achievement"
              role="listitem"
            >
              {{ responsibility }}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
};
</script>

<style scoped>
/* Timeline Styles */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
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
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.timeline-content:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
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

