<template>
  <section class="contact-closing" role="region" aria-labelledby="contact-closing-heading">
    <div class="contact-closing-content">
      <h2 id="contact-closing-heading" class="contact-closing-headline">
        {{ $t('contact.headline') }}
      </h2>

      <div class="contact-closing-actions" role="group" :aria-label="$t('contact.actions')">
        <a
          href="mailto:wilbertopachecob@gmail.com"
          class="btn btn-primary"
          :aria-label="$t('contact.letsTalk')"
        >
          <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
          {{ $t('contact.letsTalk') }}
        </a>
        <a
          :href="$t('contact.linkedInUrl')"
          class="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('contact.viewLinkedIn')"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" aria-hidden="true" />
          {{ $t('contact.viewLinkedIn') }}
        </a>
        <a
          :href="resumeUrl"
          class="btn btn-outline"
          :download="resumeFilename"
          :aria-label="$t('hero.downloadResume')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fas', 'download']" aria-hidden="true" />
          {{ $t('hero.downloadResume') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { getPublicAssetUrl, RESUME_FILENAME } from '@/utils/public-assets'

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
}
</script>

<style scoped>
.contact-closing {
  padding: var(--space-3xl) var(--space-lg);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 8%, var(--bg-secondary)) 0%, var(--bg-primary) 100%);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.contact-closing-content {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.contact-closing-headline {
  margin: 0 0 var(--space-2xl);
  color: var(--text-primary);
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 600;
  line-height: 1.45;
}

.contact-closing-actions {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md) var(--space-xl);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  gap: var(--space-sm);
  min-width: 160px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: transparent;
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  border-width: 2px;
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .contact-closing {
    padding: var(--space-2xl) var(--space-md);
  }

  .contact-closing-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
