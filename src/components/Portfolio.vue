<template>
  <div class="portfolio" role="region" aria-labelledby="portfolio-heading">
    <h2 id="portfolio-heading" class="sr-only">{{ $t('sections.portfolio.title') }}</h2>

    <p class="portfolio-intro">{{ $t('portfolio.intro') }}</p>

    <div class="portfolio-featured" role="list" :aria-label="$t('portfolio.featured')">
      <div
        v-for="project in featuredProjects"
        :key="project.name"
        class="portfolio-card"
        :class="{ 'portfolio-card--featured': project.featured }"
        role="listitem"
      >
        <div class="portfolio-card-header">
          <div class="portfolio-card-meta">
            <span v-if="project.type" class="portfolio-type">{{ $t(`portfolio.types.${project.type}`) }}</span>
            <span class="portfolio-badge">{{ $t('portfolio.featured') }}</span>
          </div>
          <h3 class="portfolio-card-title">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('portfolio.visitProject', { name: project.name })"
            >
              <span class="portfolio-card-title-text">{{ project.name }}</span>
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" aria-hidden="true" />
            </a>
          </h3>
        </div>

        <p class="portfolio-card-description">{{ project.description }}</p>

        <div
          v-if="project.screenshots && project.screenshots.length"
          class="portfolio-screenshots"
          :class="`portfolio-screenshots--${project.type === 'mobile' ? 'mobile' : 'desktop'}`"
          role="list"
          :aria-label="$t('portfolio.screenshots', { name: project.name })"
        >
          <figure
            v-for="(screenshot, screenshotIndex) in project.screenshots"
            :key="`${project.name}-${screenshotIndex}`"
            class="portfolio-screenshot"
            role="listitem"
          >
            <img
              :src="getScreenshotSrc(screenshot.src)"
              :alt="screenshot.alt"
              class="portfolio-screenshot-image"
              width="360"
              height="780"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div
          v-if="getCaseStudyFields(project).length"
          class="portfolio-case-study"
          :aria-label="$t('portfolio.caseStudy')"
        >
          <div
            v-for="field in getCaseStudyFields(project)"
            :key="field.key"
            class="portfolio-case-study-item"
          >
            <h4>{{ $t(`portfolio.${field.key}`) }}</h4>
            <p>{{ project[field.key] }}</p>
          </div>
        </div>

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
      </div>
    </div>

    <section v-if="experimentProjects.length" class="portfolio-experiments" :aria-labelledby="'portfolio-experiments-heading'">
      <h3 id="portfolio-experiments-heading" class="portfolio-subsection-title">
        {{ $t('portfolio.experiments') }}
      </h3>

      <div class="portfolio-grid" role="list" :aria-label="$t('portfolio.experiments')">
        <div
          v-for="project in experimentProjects"
          :key="project.name"
          class="portfolio-card portfolio-card--compact"
          role="listitem"
        >
          <div class="portfolio-card-header">
            <div class="portfolio-card-meta">
              <span v-if="project.type" class="portfolio-type">{{ $t(`portfolio.types.${project.type}`) }}</span>
            </div>
            <h3 class="portfolio-card-title">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('portfolio.visitProject', { name: project.name })"
              >
                <span class="portfolio-card-title-text">{{ project.name }}</span>
                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" aria-hidden="true" />
              </a>
            </h3>
          </div>

          <p class="portfolio-card-description">{{ project.description }}</p>

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
        </div>
      </div>
    </section>

    <p class="portfolio-infra">
      <font-awesome-icon :icon="['fas', 'server']" aria-hidden="true" />
      {{ $t('portfolio.infrastructure') }}
    </p>
  </div>
</template>

<script>
import { getPortfolioProjects } from '@/i18n/content'

const screenshotModules = import.meta.glob('@/assets/img/portfolio/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

export default {
  name: 'Portfolio',
  data() {
    return {
      caseStudyFields: [
        { key: 'problem' },
        { key: 'user' },
        { key: 'solution' },
        { key: 'role' },
        { key: 'outcome' },
      ],
    }
  },
  computed: {
    projects() {
      return getPortfolioProjects(this.$i18n.locale)
    },
    featuredProjects() {
      return this.projects.filter((project) => project.featured)
    },
    experimentProjects() {
      return this.projects.filter((project) => !project.featured)
    },
  },
  methods: {
    getCaseStudyFields(project) {
      return this.caseStudyFields.filter((field) => project[field.key])
    },
    getScreenshotSrc(filename) {
      const match = Object.entries(screenshotModules).find(([path]) => path.endsWith(`/${filename}`))
      if (match) return match[1]
      return `${import.meta.env.BASE_URL}img/${filename}`
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

.portfolio-featured,
.portfolio-grid {
  display: grid;
  gap: var(--space-xl);
  list-style: none;
  padding: 0;
  margin: 0;
}

.portfolio-featured {
  grid-template-columns: 1fr;
}

.portfolio-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.portfolio-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  min-width: 0;
}

.portfolio-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.portfolio-card--featured {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  border-color: color-mix(in srgb, var(--primary-color) 30%, var(--border-color));
}

.portfolio-card--compact {
  gap: var(--space-md);
  padding: var(--space-lg);
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
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  max-width: 100%;
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.portfolio-card-title a:hover {
  color: var(--primary-color);
}

.portfolio-card-title-text {
  min-width: 0;
  overflow-wrap: anywhere;
}

.portfolio-card-title svg {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.7;
  flex-shrink: 0;
  margin-top: 0.35em;
}

.portfolio-card-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.65;
  flex: 1;
}

.portfolio-screenshots {
  display: grid;
  gap: var(--space-lg);
  margin: var(--space-sm) 0 var(--space-md);
}

.portfolio-screenshots--mobile {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.portfolio-screenshots--desktop {
  grid-template-columns: 1fr;
}

.portfolio-screenshot {
  margin: 0;
  min-width: 0;
}

.portfolio-screenshot-image {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  background: var(--bg-secondary);
}

.portfolio-screenshots--mobile .portfolio-screenshot-image {
  max-height: 520px;
  object-fit: cover;
  object-position: top center;
}

.portfolio-screenshots--desktop .portfolio-screenshot-image {
  max-height: 420px;
  object-fit: cover;
  object-position: top center;
}

.portfolio-case-study {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-md);
  margin: var(--space-sm) 0;
}

.portfolio-case-study-item {
  padding: var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--bg-secondary) 75%, transparent);
}

.portfolio-case-study-item h4 {
  margin: 0 0 var(--space-sm);
  color: var(--primary-color);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.portfolio-case-study-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.55;
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

.portfolio-experiments {
  margin-top: var(--space-3xl);
}

.portfolio-subsection-title {
  margin: 0 0 var(--space-xl);
  color: var(--text-primary);
  font-size: 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .portfolio-featured,
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-screenshots--mobile {
    grid-template-columns: 1fr;
  }

  .portfolio-screenshots--mobile .portfolio-screenshot-image {
    max-height: none;
    object-fit: contain;
  }

  .portfolio-screenshots--desktop .portfolio-screenshot-image {
    max-height: none;
    object-fit: contain;
  }

  .portfolio-card {
    padding: var(--space-lg);
  }

  .portfolio-card-title {
    font-size: 1.2rem;
  }
}
</style>
