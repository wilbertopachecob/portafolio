<template>
  <div class="portfolio" role="region" aria-labelledby="portfolio-heading">
    <h2 id="portfolio-heading" class="sr-only">{{ $t('sections.portfolio.title') }}</h2>

    <p class="portfolio-intro">{{ $t('portfolio.intro') }}</p>

    <div class="portfolio-grid" role="list" :aria-label="$t('sections.portfolio.title')">
      <article
        v-for="(project, index) in projects"
        :key="index"
        class="portfolio-card"
        :class="{ 'portfolio-card--featured': project.featured }"
        role="listitem"
      >
        <div class="portfolio-card-header">
          <div class="portfolio-card-meta">
            <span v-if="project.type" class="portfolio-type">{{ $t(`portfolio.types.${project.type}`) }}</span>
            <span v-if="project.featured" class="portfolio-badge">{{ $t('portfolio.featured') }}</span>
          </div>
          <h3 class="portfolio-card-title">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('portfolio.visitProject', { name: project.name })"
            >
              {{ project.name }}
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" aria-hidden="true" />
            </a>
          </h3>
        </div>

        <p class="portfolio-card-description">{{ project.description }}</p>

        <ul
          v-if="project.highlights && project.highlights.length"
          class="portfolio-highlights"
          role="list"
          :aria-label="$t('portfolio.highlights')"
        >
          <li
            v-for="(highlight, highlightIndex) in project.highlights"
            :key="highlightIndex"
            role="listitem"
          >
            {{ highlight }}
          </li>
        </ul>

        <div v-if="project.tags && project.tags.length" class="portfolio-tags" role="list" :aria-label="$t('portfolio.technologies')">
          <span
            v-for="(tag, tagIndex) in project.tags"
            :key="tagIndex"
            class="portfolio-tag"
            role="listitem"
          >
            {{ tag }}
          </span>
        </div>
      </article>
    </div>

    <p class="portfolio-infra">
      <font-awesome-icon :icon="['fas', 'server']" aria-hidden="true" />
      {{ $t('portfolio.infrastructure') }}
    </p>
  </div>
</template>

<script>
import { getPortfolioProjects } from '@/i18n/content'

export default {
  name: 'Portfolio',
  computed: {
    projects() {
      return getPortfolioProjects(this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
.portfolio-intro {
  color: var(--text-secondary);
  font-size: 1.0625rem;
  line-height: 1.7;
  max-width: 760px;
  margin: 0 auto var(--space-2xl);
  text-align: center;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-xl);
  list-style: none;
  padding: 0;
  margin: 0;
}

.portfolio-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.portfolio-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.portfolio-card--featured {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-color: color-mix(in srgb, var(--primary-color) 30%, var(--border-color));
}

.portfolio-card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.portfolio-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.portfolio-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--primary-color);
}

.portfolio-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
}

.portfolio-card-title {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 600;
}

.portfolio-card-title a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.portfolio-card-title a:hover {
  color: var(--primary-color);
}

.portfolio-card-title svg {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.7;
}

.portfolio-card-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.65;
  flex: 1;
}

.portfolio-highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.portfolio-highlights li {
  position: relative;
  padding-left: var(--space-lg);
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.55;
}

.portfolio-highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: auto;
}

.portfolio-tag {
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.portfolio-infra {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-2xl);
  color: var(--text-muted);
  font-size: 0.9375rem;
  text-align: center;
}

.portfolio-infra svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-card {
    padding: var(--space-lg);
  }

  .portfolio-card-title {
    font-size: 1.2rem;
  }
}
</style>
