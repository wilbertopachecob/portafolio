<template>
  <div class="portfolio">
    <p class="portfolio-intro">{{ $t('portfolio.intro') }}</p>

    <!-- Featured products as alternating 2-column case studies -->
    <ul class="case-list" :aria-label="$t('portfolio.featured')">
      <li
        v-for="(project, index) in featuredProjects"
        :key="project.name"
        class="case"
        :class="{ 'case--flip': index % 2 === 1 }"
      >
        <div class="case-body">
          <div class="case-meta">
            <span class="chip chip--accent">{{ $t('portfolio.caseStudy') }}</span>
            <span v-if="project.type" class="chip">{{ $t(`portfolio.types.${project.type}`) }}</span>
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="chip chip--link"
              :aria-label="$t('portfolio.visitProject', { name: project.name })"
            >
              {{ displayHost(project.url) }}
              <app-icon :icon="['fas', 'arrow-up-right-from-square']" aria-hidden="true" />
            </a>
          </div>

          <h3 class="case-title">{{ project.name }}</h3>
          <p class="case-lead">{{ project.description }}</p>

          <div v-if="caseFields(project).length" class="case-grid">
            <div v-for="field in caseFields(project)" :key="field" class="case-field">
              <div class="k">{{ $t(`portfolio.${field}`) }}</div>
              <div class="v">{{ project[field] }}</div>
            </div>
          </div>

          <div v-if="project.outcome" class="case-outcome">
            <div class="k">{{ $t('portfolio.outcome') }}</div>
            <div class="v">{{ project.outcome }}</div>
          </div>

          <ul
            v-if="project.highlights && project.highlights.length"
            class="case-highlights"
            :aria-label="$t('portfolio.highlights')"
          >
            <li v-for="(highlight, hi) in project.highlights" :key="hi">{{ highlight }}</li>
          </ul>

          <ul
            v-if="project.tags && project.tags.length"
            class="case-tags"
            :aria-label="$t('portfolio.technologies')"
          >
            <li v-for="(tag, ti) in project.tags" :key="ti" class="tag">{{ tag }}</li>
          </ul>
        </div>

        <!-- Screenshots: phone frames for mobile, browser frame otherwise -->
        <div
          v-if="project.screenshots && project.screenshots.length"
          class="case-shots"
          :aria-label="$t('portfolio.screenshots', { name: project.name })"
        >
          <template v-if="project.type === 'mobile'">
            <figure
              v-for="(screenshot, si) in project.screenshots"
              :key="si"
              class="phone"
            >
              <img
                :src="getScreenshotSrc(screenshot.src)"
                :alt="screenshot.alt"
                width="360"
                height="780"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </template>
          <figure v-else class="browser">
            <div class="browser-bar" aria-hidden="true">
              <i></i><i></i><i></i>
              <span class="url">{{ displayHost(project.url) }}</span>
            </div>
            <div
              class="browser-viewport"
              :style="browserViewportStyle(project.screenshots[0])"
            >
              <img
                :src="getScreenshotSrc(project.screenshots[0].src)"
                :alt="project.screenshots[0].alt"
                :width="project.screenshots[0].width || 1024"
                :height="project.screenshots[0].height || 822"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        </div>
      </li>
    </ul>

    <!-- Experiments -->
    <section v-if="experimentProjects.length" class="experiments" aria-labelledby="portfolio-experiments-heading">
      <h3 id="portfolio-experiments-heading" class="experiments-title">
        {{ $t('portfolio.experiments') }}
      </h3>

      <ul class="exp-grid" :aria-label="$t('portfolio.experiments')">
        <li v-for="project in experimentProjects" :key="project.name">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="exp-card"
            :aria-label="$t('portfolio.visitProject', { name: project.name })"
          >
            <div class="exp-top">
              <span class="exp-name">{{ project.name }}</span>
              <app-icon class="exp-arrow" :icon="['fas', 'arrow-up-right-from-square']" aria-hidden="true" />
            </div>
            <p class="exp-desc">{{ project.description }}</p>
            <span v-if="project.tags && project.tags.length" class="exp-tag">{{ project.tags.join(' · ') }}</span>
          </a>
        </li>
      </ul>
    </section>

    <p class="portfolio-infra">
      <app-icon :icon="['fas', 'server']" aria-hidden="true" />
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

const screenshotWebpModules = import.meta.glob('@/assets/img/portfolio/*.webp', {
  eager: true,
  import: 'default',
})

export default {
  name: 'Portfolio',
  data() {
    return {
      // Case fields shown in the 2x2 grid (outcome is rendered separately)
      gridFields: ['problem', 'user', 'solution', 'role'],
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
    caseFields(project) {
      return this.gridFields.filter((field) => project[field])
    },
    displayHost(url) {
      try {
        return new URL(url).hostname.replace(/^www\./, '')
      } catch {
        return url
      }
    },
    getScreenshotSrc(filename) {
      const webpName = filename.replace(/\.(png|jpe?g)$/i, '.webp')
      const webpMatch = Object.entries(screenshotWebpModules).find(([path]) => path.endsWith(`/${webpName}`))
      if (webpMatch) return webpMatch[1]

      const match = Object.entries(screenshotModules).find(([path]) => path.endsWith(`/${filename}`))
      if (match) return match[1]
      return `${import.meta.env.BASE_URL}img/${filename}`
    },
    browserViewportStyle(screenshot) {
      const width = screenshot.width || 1024
      const height = screenshot.height || 822
      return { '--browser-aspect': `${width} / ${height}` }
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
  margin: 0 0 var(--space-2xl);
}

.case-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.375rem;
}

.case {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  overflow: hidden;
}

.case--flip .case-shots {
  order: -1;
  border-left: 0;
  border-right: 1px solid var(--border-light);
}

.case-body {
  padding: clamp(2rem, 4vw, 3.25rem);
}

.case-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.375rem;
  flex-wrap: wrap;
}

.case-title {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin: 0 0 0.875rem;
}

.case-lead {
  color: var(--text-secondary);
  font-size: 1.02rem;
  line-height: 1.6;
  margin: 0 0 1.875rem;
  max-width: 52ch;
}

.case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  margin-bottom: 1.75rem;
}

.case-field .k,
.case-outcome .k {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.case-field .k {
  color: var(--primary-color);
}

.case-field .v {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.case-outcome {
  border-left: 2px solid var(--primary-color);
  padding: 0.25rem 0 0.25rem 1.125rem;
  margin-bottom: 1.75rem;
}

.case-outcome .k {
  color: var(--text-muted);
}

.case-outcome .v {
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 500;
}

.case-highlights {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.case-highlights li {
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.case-highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}

.case-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

/* Screenshots column */
.case-shots {
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  gap: 0.875rem;
}

.phone {
  flex: 1 1 0;
  max-width: 158px;
  margin: 0;
  border-radius: 22px;
  border: 1px solid var(--border-color);
  background: #000;
  overflow: hidden;
  aspect-ratio: 1280 / 2856;
  box-shadow: var(--shadow-lg);
}

.phone:nth-child(2) {
  transform: translateY(-18px);
}

.phone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.browser {
  width: 100%;
  margin: 0;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  background: var(--bg-primary);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.browser-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-color);
  display: block;
}

.browser-bar .url {
  margin-left: 12px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
}

.browser-viewport {
  overflow: hidden;
  aspect-ratio: var(--browser-aspect, 16 / 10);
}

.browser-viewport img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
}

/* Experiments */
.experiments {
  margin-top: var(--space-3xl);
}

.experiments-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-xl);
}

.exp-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.exp-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.375rem;
  background: var(--bg-primary);
  text-decoration: none;
  transition: border-color var(--transition-normal), transform var(--transition-normal);
}

.exp-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.exp-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
}

.exp-name {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-primary);
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.exp-arrow {
  color: var(--text-muted);
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
}

.exp-card:hover .exp-arrow {
  color: var(--primary-color);
}

.exp-desc {
  margin: 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.exp-tag {
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.portfolio-infra {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: var(--space-2xl) 0 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

.portfolio-infra svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

/* Shared chip / tag */
.chip {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
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
  border-color: color-mix(in srgb, var(--primary-color) 40%, var(--border-color));
  background: var(--accent-tint);
}

.chip--link {
  color: var(--primary-color);
  text-decoration: none;
}

.chip--link svg {
  width: 0.7rem;
  height: 0.7rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
}

/* Responsive */
@media (max-width: 880px) {
  .case,
  .case--flip {
    grid-template-columns: 1fr;
  }

  .case--flip .case-shots {
    order: 0;
    border-right: 0;
  }

  .case-shots {
    border-left: 0;
    border-top: 1px solid var(--border-light);
  }

  .phone {
    max-width: 140px;
  }

  .exp-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 540px) {
  .case-grid {
    grid-template-columns: 1fr;
  }

  .exp-grid {
    grid-template-columns: 1fr;
  }
}
</style>
