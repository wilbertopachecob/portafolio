<template>
  <section class="hero" role="banner" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-text">
          <!-- Availability status -->
          <span class="hero-status">
            <span class="hero-dot" aria-hidden="true"></span>
            {{ $t('hero.status') }}
          </span>

          <!-- Hero Title - Full name in H1 for SEO (Wilberto Pacheco Batista) -->
          <h1 class="hero-title" id="hero-title" itemprop="name">
            {{ $t('hero.title') }}
            <span class="hero-title-accent">Batista</span>
          </h1>

          <!-- Positioning line -->
          <p class="hero-positioning">{{ $t('hero.subtitle') }}</p>

          <!-- Description -->
          <p class="hero-description">{{ $t('hero.description') }}</p>

          <!-- Call to Action -->
          <div class="hero-actions" role="region" aria-labelledby="actions-heading">
            <h2 id="actions-heading" class="sr-only">Call to Action</h2>
            <a
              href="#impact"
              class="btn btn-primary"
              :aria-label="$t('hero.viewImpact')"
              @click="track('cta_view_impact', { location: 'hero' })"
            >
              <app-icon :icon="['fas', 'chart-line']" aria-hidden="true" />
              {{ $t('hero.viewImpact') }}
            </a>
            <a
              href="mailto:wilbertopachecob@gmail.com"
              class="btn btn-secondary"
              :aria-label="$t('contact.letsTalk')"
              @click="track('cta_email', { location: 'hero' })"
            >
              {{ $t('contact.letsTalk') }}
            </a>
            <a
              :href="resumeUrl"
              class="btn-text-link"
              :download="resumeFilename"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('hero.downloadResume')"
              @click="track('cta_cv_download', { location: 'hero' })"
            >
              <app-icon :icon="['fas', 'download']" aria-hidden="true" />
              {{ $t('hero.downloadResume') }}
            </a>
          </div>

          <!-- Social Links -->
          <div class="social-links" role="region" aria-labelledby="social-heading">
            <h2 id="social-heading" class="sr-only">Social Media Links</h2>
            <a
              href="https://www.linkedin.com/in/wilberto-pacheco-batista/"
              class="social-link"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              @click="track('social_click', { network: 'linkedin' })"
            >
              <app-icon :icon="['fab', 'linkedin']" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/wilbertopachecob"
              class="social-link"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              @click="track('social_click', { network: 'github' })"
            >
              <app-icon :icon="['fab', 'github']" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/PachecoWilberto"
              class="social-link"
              title="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit X (Twitter) profile"
              @click="track('social_click', { network: 'x' })"
            >
              <app-icon :icon="['fab', 'x-twitter']" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Portrait (offset, squared, editorial) -->
        <div class="hero-portrait">
          <span class="portrait-rule" aria-hidden="true"></span>
          <img
            class="hero-avatar"
            src="@/assets/img/profile.webp"
            :alt="$t('hero.profileAlt')"
            width="420"
            height="483"
            loading="eager"
            decoding="async"
          />
          <span class="portrait-tag">
            <span class="hero-dot" aria-hidden="true"></span>
            {{ $t('hero.locationTag') }}
          </span>
        </div>
      </div>

      <!-- Inline proof bar — reuses impact highlights (metric + title) -->
      <ul class="hero-proofbar" :aria-label="$t('sections.impact.title')">
        <li v-for="item in proofPoints" :key="item.title" class="proof">
          <span class="proof-num">{{ item.metric }}</span>
          <span class="proof-lbl">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'
import { track } from '@/utils/analytics'
import { getImpactHighlights } from '@/i18n/content'

export default {
  name: "About",
  computed: {
    resumeFilename() {
      return RESUME_FILENAME
    },
    resumeUrl() {
      return getPublicAssetUrl(RESUME_FILENAME)
    },
    proofPoints() {
      return getImpactHighlights(this.$i18n.locale).slice(0, 4)
    },
  },
  methods: {
    track,
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}

/* Asymmetric two-column layout */
.hero-grid {
  display: grid;
  grid-template-columns: 1.45fr 0.85fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

/* Availability chip */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  padding: 6px 12px;
  margin-bottom: 1.6rem;
}

.hero-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
}

[data-theme="dark"] .hero-dot {
  background: #4ade80;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 6vw, 4.4rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.0;
  color: var(--text-primary);
  margin-bottom: 1.3rem;
}

.hero-title-accent {
  color: var(--text-muted);
  font-weight: 500;
}

.hero-positioning {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.15rem, 2.1vw, 1.45rem);
  color: var(--text-primary);
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin-bottom: 1.2rem;
  max-width: 24ch;
}

.hero-description {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  margin-bottom: 1.9rem;
  max-width: 48ch;
  line-height: 1.65;
}

/* Actions */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1.9rem;
}

.btn-text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.82rem 0.4rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--border-color);
  text-underline-offset: 4px;
  transition: color var(--transition-fast);
}

.btn-text-link:hover {
  color: var(--primary-color);
}

/* Social */
.social-links {
  display: flex;
  gap: 0.625rem;
  margin: 0;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  font-size: 1.1rem;
}

/* Portrait */
.hero-portrait {
  position: relative;
}

.hero-avatar {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 4.6;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  filter: grayscale(0.12);
}

.portrait-rule {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 64px;
  height: 64px;
  border-top: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-radius: 0 var(--radius-md) 0 0;
}

.portrait-tag {
  position: absolute;
  left: -14px;
  bottom: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 8px 14px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

/* Proof bar */
.hero-proofbar {
  list-style: none;
  margin: clamp(2.75rem, 6vw, 4.5rem) 0 0;
  padding: 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.proof {
  padding: 1.6rem 1.6rem 1.6rem 0;
  border-right: 1px solid var(--border-light);
}

.proof:last-child {
  border-right: 0;
}

.proof:not(:first-child) {
  padding-left: 1.6rem;
}

.proof-num {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  color: var(--primary-color);
  letter-spacing: -0.02em;
  line-height: 1;
}

.proof-lbl {
  display: block;
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.65rem;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-portrait {
    max-width: 320px;
    order: -1;
  }

  .hero-proofbar {
    grid-template-columns: 1fr 1fr;
  }

  .proof:nth-child(2) {
    border-right: 0;
  }

  .proof {
    border-bottom: 1px solid var(--border-light);
  }

  .proof:nth-child(3),
  .proof:nth-child(4) {
    border-bottom: 0;
  }
}

@media (max-width: 540px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .btn-text-link {
    justify-content: center;
  }

  .hero-proofbar {
    grid-template-columns: 1fr;
  }

  .proof {
    border-right: 0;
    border-bottom: 1px solid var(--border-light);
    padding: 1.25rem 0;
  }

  .proof:last-child {
    border-bottom: 0;
  }
}
</style>
