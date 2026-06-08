<template>
  <section class="hero" role="banner" aria-labelledby="hero-title">
    <div class="hero-content">
      <img
        class="hero-avatar"
        src="@/assets/img/profile.png"
        :alt="$t('hero.profileAlt')"
        width="128"
        height="128"
        loading="eager"
        decoding="async"
      />

      <!-- Hero Title - Full name in H1 for SEO (Wilberto Pacheco Batista) -->
      <h1 class="hero-title" id="hero-title" itemprop="name">
        {{ $t('hero.title') }}
        <span class="hero-title-accent">Batista</span>
      </h1>
      
      <!-- Hero Subtitle -->
      <h2 class="hero-subtitle">{{ $t('hero.subtitle') }}</h2>
      
      <!-- Hero Description -->
      <p class="hero-description">
        {{ $t('hero.description') }}
      </p>
      
      <!-- Social Links -->
      <div class="social-links" role="region" aria-labelledby="social-heading">
        <h3 id="social-heading" class="sr-only">Social Media Links</h3>
        <a 
          href="https://www.linkedin.com/in/wilberto-pacheco-batista/"
          class="social-link"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" aria-hidden="true" />
        </a>
        <a 
          href="https://github.com/wilbertopachecob"
          class="social-link"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile"
        >
          <font-awesome-icon :icon="['fab', 'github']" aria-hidden="true" />
        </a>
        <a 
          href="https://twitter.com/PachecoWilberto"
          class="social-link"
          title="X (Twitter)"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit X (Twitter) profile"
        >
          <font-awesome-icon :icon="['fab', 'x-twitter']" aria-hidden="true" />
        </a>
      </div>
      
      <!-- Call to Action -->
      <div class="hero-actions" role="region" aria-labelledby="actions-heading">
        <h3 id="actions-heading" class="sr-only">Call to Action</h3>
        <a href="#impact" class="btn btn-primary" :aria-label="$t('hero.viewImpact')">
          <font-awesome-icon :icon="['fas', 'chart-line']" aria-hidden="true" />
          {{ $t('hero.viewImpact') }}
        </a>
        <a
          href="mailto:wilbertopachecob@gmail.com"
          class="btn btn-secondary"
          :aria-label="$t('contact.letsTalk')"
        >
          <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
          {{ $t('contact.letsTalk') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
/* Hero Section Enhancements */
.hero {
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-avatar {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto var(--space-xl);
  border-radius: 50%;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  object-fit: cover;
}

.hero-title {
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
}

.hero-title-accent {
  color: var(--primary-color);
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: var(--space-xl);
  letter-spacing: 0.02em;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

/* Social Links Enhancement */
.social-links {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-bottom: var(--space-2xl);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-normal);
  font-size: 1.25rem;
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

/* Hero Actions */
.hero-actions {
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
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  border-width: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: var(--space-2xl) 0;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
  }
  
  .social-links {
    gap: var(--space-sm);
  }
  
  .social-link {
    width: 48px;
    height: 48px;
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}
</style>
