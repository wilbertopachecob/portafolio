<template>
  <div class="credentials" role="region" :aria-label="$t('sections.credentials.title')">
    <section class="credential-panel" :aria-labelledby="'credentials-education-heading'">
      <h3 id="credentials-education-heading" class="credential-panel-title">
        {{ $t('credentials.educationTitle') }}
      </h3>
      <article
        v-for="item in credentials.education"
        :key="item.institution"
        class="credential-item credential-item--with-media"
      >
        <img
          :src="getAssetImage(item.logo || 'UCI.jpg')"
          :alt="`${item.institution} logo`"
          class="credential-media"
          width="56"
          height="56"
          loading="lazy"
        />
        <div>
          <h4 class="credential-title">
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('education.visitWebsite', { institution: item.institution })"
            >
              {{ item.institution }}
            </a>
          </h4>
          <p class="credential-description">{{ item.degree }}</p>
          <p class="credential-meta">{{ $t('education.period') }}: {{ item.period }}</p>
        </div>
      </article>
    </section>

    <section class="credential-panel" :aria-labelledby="'credentials-languages-heading'">
      <h3 id="credentials-languages-heading" class="credential-panel-title">
        {{ $t('credentials.languagesTitle') }}
      </h3>
      <p class="credential-note">{{ $t('credentials.languageNote') }}</p>
    </section>

    <section class="credential-panel" :aria-labelledby="'credentials-certifications-heading'">
      <h3 id="credentials-certifications-heading" class="credential-panel-title">
        {{ $t('credentials.certificationsTitle') }}
      </h3>
      <article
        v-for="certification in credentials.certifications"
        :key="certification.title"
        class="credential-item"
      >
        <h4 class="credential-title">
          <a
            :href="certification.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="$t('certifications.visitWebsite', { issuer: certification.issuer })"
          >
            {{ certification.title }}
          </a>
        </h4>
        <p class="credential-description">{{ certification.issuer }}</p>
        <p class="credential-meta">{{ $t('certifications.issued') }}: {{ certification.date }}</p>
        <p v-if="certification.conciseDescription" class="credential-description">
          {{ certification.conciseDescription }}
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import { getCredentials } from '@/i18n/content'

export default {
  name: 'Credentials',
  computed: {
    credentials() {
      return getCredentials(this.$i18n.locale)
    },
  },
  methods: {
    getAssetImage(filename) {
      try {
        return require(`@/assets/img/${filename}`)
      } catch (error) {
        return `${import.meta.env.BASE_URL}img/${filename}`
      }
    },
  },
}
</script>

<style scoped>
.credentials {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-xl);
}

.credential-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  min-width: 0;
  padding: var(--card-padding-dense);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.credential-panel-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.credential-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 0;
}

.credential-item--with-media {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-md);
}

.credential-media {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
  padding: var(--space-xs);
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.credential-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
}

.credential-title a {
  color: var(--text-primary);
  text-decoration: none;
}

.credential-title a:hover {
  color: var(--primary-color);
}

.credential-description,
.credential-meta,
.credential-note {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.55;
}

.credential-meta {
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
}

@media (max-width: 992px) {
  .credentials {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .credential-panel {
    padding: var(--space-lg);
  }

  .credential-item--with-media {
    flex-direction: column;
  }
}
</style>
