<template>
  <section class="contact-closing" role="region" aria-labelledby="contact-closing-heading">
    <div class="container">
      <span class="contact-eyebrow">{{ $t('nav.contact') }}</span>
      <h2 id="contact-closing-heading" class="contact-closing-headline">
        {{ $t('contact.headline') }}
      </h2>

      <div class="contact-closing-actions" role="group" :aria-label="$t('contact.actions')">
        <a
          href="mailto:wilbertopachecob@gmail.com"
          class="btn btn-primary"
          :aria-label="$t('contact.letsTalk')"
          @click="track('cta_email', { location: 'contact' })"
        >
          <app-icon :icon="['fas', 'envelope']" aria-hidden="true" />
          {{ $t('contact.letsTalk') }}
        </a>
        <a
          :href="$t('contact.linkedInUrl')"
          class="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('contact.viewLinkedIn')"
          @click="track('cta_linkedin', { location: 'contact' })"
        >
          <app-icon :icon="['fab', 'linkedin']" aria-hidden="true" />
          {{ $t('contact.viewLinkedIn') }}
        </a>
        <a
          :href="resumeUrl"
          class="btn-text-link"
          :download="resumeFilename"
          :aria-label="$t('hero.downloadResume')"
          target="_blank"
          rel="noopener noreferrer"
          @click="track('cta_cv_download', { location: 'contact' })"
        >
          <app-icon :icon="['fas', 'download']" aria-hidden="true" />
          {{ $t('hero.downloadResume') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'
import { track } from '@/utils/analytics'

export default {
  name: 'ContactClosing',
  computed: {
    resumeFilename() {
      return RESUME_FILENAME
    },
    resumeUrl() {
      return getPublicAssetUrl(RESUME_FILENAME)
    },
  },
  methods: {
    track,
  },
}
</script>

<style scoped>
.contact-closing {
  padding: clamp(4rem, 9vw, 6.5rem) 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
}

.contact-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin-bottom: 1.125rem;
}

.contact-eyebrow::before {
  content: "";
  width: 22px;
  height: 1px;
  background: var(--primary-color);
  display: inline-block;
}

.contact-closing-headline {
  margin: 0 0 1.875rem;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.1;
  max-width: 20ch;
}

.contact-closing-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55em;
  padding: 0.82rem 1.35rem;
  font-family: var(--font-primary);
  font-size: 0.98rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-primary {
  background: var(--primary-color);
  color: #fff;
}

[data-theme="dark"] .btn-primary {
  color: #0b0d12;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: var(--accent-tint);
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

@media (max-width: 540px) {
  .contact-closing-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-closing-actions .btn {
    width: 100%;
  }

  .btn-text-link {
    justify-content: center;
  }
}
</style>
