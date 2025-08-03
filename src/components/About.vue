<template>
  <section class="hero" id="about" role="banner" aria-labelledby="hero-title">
    <div class="hero-content">
      <!-- Hero Title -->
      <h1 class="hero-title" id="hero-title">
        {{ $t('hero.title') }}
        <span class="text-primary">Batista</span>
      </h1>
      
      <!-- Hero Subtitle -->
      <h2 class="hero-subtitle">{{ $t('hero.subtitle') }}</h2>
      
      <!-- Hero Description -->
      <p class="hero-description">
        {{ $t('hero.description') }}
      </p>
      
      <!-- Contact Information -->
      <div class="contact-info" role="region" aria-labelledby="contact-heading">
        <h3 id="contact-heading" class="sr-only">Contact Information</h3>
        <div class="contact-item">
          <font-awesome-icon :icon="['fas', 'envelope']" aria-hidden="true" />
          <a href="mailto:wilbertopachecob@gmail.com" aria-label="Send email to wilbertopachecob@gmail.com">wilbertopachecob@gmail.com</a>
        </div>
        <div class="contact-item">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" aria-hidden="true" />
          <span>Broken Arrow, OK</span>
        </div>
      </div>
      
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
        <a href="#experience" class="btn btn-primary" :aria-label="$t('hero.viewExperience')">
          <font-awesome-icon :icon="['fas', 'briefcase']" aria-hidden="true" />
          {{ $t('hero.viewExperience') }}
        </a>
        <a href="#skills" class="btn btn-secondary" :aria-label="$t('hero.viewSkills')">
          <font-awesome-icon :icon="['fas', 'code']" aria-hidden="true" />
          {{ $t('hero.viewSkills') }}
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

.hero-title {
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-lg);
}

.text-primary {
  color: var(--primary-color);
  -webkit-text-fill-color: var(--primary-color);
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
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

/* Contact Information */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  color: var(--text-secondary);
  font-size: 1rem;
}

.contact-item svg {
  color: var(--primary-color);
  width: 1.25rem;
  height: 1.25rem;
}

.contact-item a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.contact-item a:hover {
  color: var(--primary-color);
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
  transform: translateY(-4px);
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: var(--space-2xl) 0;
  }
  
  .contact-info {
    gap: var(--space-sm);
  }
  
  .contact-item {
    font-size: 0.9rem;
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
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: var(--space-sm);
  }
}
</style>
