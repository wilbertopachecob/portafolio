<template>
  <div class="cred-grid">
    <!-- Column A: education + languages -->
    <div class="cred-col">
      <section class="cred-card" :aria-labelledby="'credentials-education-heading'">
        <h3 id="credentials-education-heading" class="cred-card-title">
          {{ $t('credentials.educationTitle') }}
        </h3>
        <article
          v-for="item in credentials.education"
          :key="item.institution"
          class="cred-row"
        >
          <img
            :src="getAssetImage(item.logo || 'UCI.jpg')"
            :alt="`${item.institution} logo`"
            class="cred-logo"
            width="44"
            height="44"
            loading="lazy"
          />
          <div>
            <h4 class="cred-row-title">
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('education.visitWebsite', { institution: item.institution })"
              >
                {{ item.degree }}
              </a>
            </h4>
            <p class="cred-meta">{{ item.institution }} · {{ item.period }}</p>
          </div>
        </article>
      </section>

      <section class="cred-card" :aria-labelledby="'credentials-languages-heading'">
        <h3 id="credentials-languages-heading" class="cred-card-title">
          {{ $t('credentials.languagesTitle') }}
        </h3>
        <p class="cred-note">{{ $t('credentials.languageNote') }}</p>
        <div class="cred-chips">
          <span class="chip chip--accent">{{ $t('languages.spanish') }}</span>
          <span class="chip chip--accent">{{ $t('languages.english') }}</span>
        </div>
      </section>
    </div>

    <!-- Column B: certifications -->
    <div class="cred-col">
      <section class="cred-card" :aria-labelledby="'credentials-certifications-heading'">
        <h3 id="credentials-certifications-heading" class="cred-card-title">
          {{ $t('credentials.certificationsTitle') }}
        </h3>
        <article
          v-for="certification in credentials.certifications"
          :key="certification.title"
          class="cred-row"
        >
          <span class="cred-badge" aria-hidden="true">
            <app-icon :icon="['fas', 'certificate']" />
          </span>
          <div>
            <h4 class="cred-row-title">
              <a
                :href="certification.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('certifications.visitWebsite', { issuer: certification.issuer })"
              >
                {{ certification.title }}
              </a>
            </h4>
            <p class="cred-meta">{{ certification.issuer }} · {{ certification.date }}</p>
            <p v-if="certification.conciseDescription" class="cred-desc">
              {{ certification.conciseDescription }}
            </p>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
import { getCredentials } from '@/i18n/content'

const assetModules = import.meta.glob('@/assets/img/*.{jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

export default {
  name: 'Credentials',
  computed: {
    credentials() {
      return getCredentials(this.$i18n.locale)
    },
  },
  methods: {
    getAssetImage(filename) {
      const match = Object.entries(assetModules).find(([path]) => path.endsWith(`/${filename}`))
      return match ? match[1] : `${import.meta.env.BASE_URL}img/${filename}`
    },
  },
}
</script>

<style scoped>
.cred-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.375rem;
  align-items: stretch;
}

.cred-col {
  display: flex;
  flex-direction: column;
  gap: 1.375rem;
}

@media (min-width: 881px) {
  .cred-col:nth-child(2) .cred-card {
    flex: 1;
  }

  .cred-col:nth-child(1) .cred-card + .cred-card {
    flex: 1;
  }
}

.cred-card {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  background: var(--bg-primary);
}

.cred-card-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 1.125rem;
  font-weight: 500;
}

.cred-row {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  padding: 0.875rem 0;
  border-top: 1px solid var(--border-light);
}

.cred-row:first-of-type {
  border-top: 0;
  padding-top: 0;
}

.cred-logo {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--border-color);
  flex-shrink: 0;
  padding: 3px;
}

.cred-badge {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  background: var(--accent-tint);
  color: var(--primary-color);
  flex-shrink: 0;
  font-size: 1.05rem;
}

.cred-row-title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.35;
}

.cred-row-title a {
  color: var(--text-primary);
  text-decoration: none;
}

.cred-row-title a:hover {
  color: var(--primary-color);
}

.cred-meta {
  margin: 0.2rem 0 0;
  font-size: 0.84rem;
  color: var(--text-muted);
}

.cred-desc {
  margin: 0.5rem 0 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.cred-note {
  margin: 0;
  font-size: 0.96rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.cred-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

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

@media (max-width: 880px) {
  .cred-grid {
    grid-template-columns: 1fr;
  }
}
</style>
