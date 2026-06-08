<template>
  <div
    class="portfolio-screenshots-gallery"
    :class="{
      'portfolio-screenshots-gallery--mobile': projectType === 'mobile',
      'portfolio-screenshots-gallery--multi': screenshots.length > 1,
    }"
  >
    <ul
      ref="track"
      class="portfolio-screenshots"
      :class="`portfolio-screenshots--${projectType === 'mobile' ? 'mobile' : 'desktop'}`"
      :aria-label="ariaLabel"
      @scroll.passive="updateActiveIndex"
    >
      <li
        v-for="(screenshot, screenshotIndex) in screenshots"
        :key="`${projectName}-${screenshotIndex}`"
        class="portfolio-screenshot"
      >
        <figure class="portfolio-screenshot-frame">
          <img
            :src="screenshot.src"
            :alt="screenshot.alt"
            class="portfolio-screenshot-image"
            width="360"
            height="780"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </li>
    </ul>

    <div
      v-if="showCarouselControls"
      class="portfolio-screenshots-controls"
      role="group"
      :aria-label="$t('portfolio.screenshotControls', { name: projectName })"
    >
      <button
        type="button"
        class="portfolio-screenshots-nav"
        :disabled="activeIndex === 0"
        :aria-label="$t('portfolio.previousScreenshot')"
        @click="goToSlide(activeIndex - 1)"
      >
        <app-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
      </button>

      <div class="portfolio-screenshots-dots">
        <button
          v-for="(_, dotIndex) in screenshots"
          :key="`${projectName}-dot-${dotIndex}`"
          type="button"
          class="portfolio-screenshots-dot"
          :class="{ 'portfolio-screenshots-dot--active': dotIndex === activeIndex }"
          :aria-label="$t('portfolio.goToScreenshot', {
            current: dotIndex + 1,
            total: screenshots.length,
          })"
          :aria-current="dotIndex === activeIndex ? 'true' : undefined"
          @click="goToSlide(dotIndex)"
        />
      </div>

      <button
        type="button"
        class="portfolio-screenshots-nav"
        :disabled="activeIndex === screenshots.length - 1"
        :aria-label="$t('portfolio.nextScreenshot')"
        @click="goToSlide(activeIndex + 1)"
      >
        <app-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioScreenshotGallery',
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      default: 'desktop',
    },
    screenshots: {
      type: Array,
      required: true,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    showCarouselControls() {
      return this.projectType === 'mobile' && this.screenshots.length > 1
    },
  },
  methods: {
    updateActiveIndex() {
      const track = this.$refs.track
      if (!track) return

      const slideWidth = track.clientWidth
      if (!slideWidth) return

      this.activeIndex = Math.min(
        this.screenshots.length - 1,
        Math.round(track.scrollLeft / slideWidth),
      )
    },
    goToSlide(index) {
      const track = this.$refs.track
      if (!track || index < 0 || index >= this.screenshots.length) return

      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'

      track.scrollTo({
        left: index * track.clientWidth,
        behavior,
      })
      this.activeIndex = index
    },
  },
}
</script>

<style scoped>
.portfolio-screenshots {
  display: grid;
  gap: var(--space-lg);
  margin: var(--space-sm) 0 var(--space-md);
  list-style: none;
  padding: 0;
}

.portfolio-screenshot {
  min-width: 0;
}

.portfolio-screenshot-frame {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  background: var(--bg-secondary);
}

.portfolio-screenshot-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top center;
}

.portfolio-screenshots--mobile .portfolio-screenshot-image {
  aspect-ratio: 9 / 19.5;
}

.portfolio-screenshots--desktop .portfolio-screenshot-image {
  aspect-ratio: 16 / 9;
}

.portfolio-screenshots--mobile {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.portfolio-screenshots--desktop {
  grid-template-columns: 1fr;
}

.portfolio-screenshots-controls {
  display: none;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin: var(--space-md) 0 var(--space-md);
}

.portfolio-screenshots-nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.portfolio-screenshots-nav:hover:not(:disabled) {
  background: var(--bg-secondary);
  border-color: color-mix(in srgb, var(--primary-color) 35%, var(--border-color));
  color: var(--primary-color);
}

.portfolio-screenshots-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.portfolio-screenshots-nav svg {
  width: 0.875rem;
  height: 0.875rem;
}

.portfolio-screenshots-dots {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.portfolio-screenshots-dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text-muted) 45%, transparent);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.portfolio-screenshots-dot--active {
  background: var(--primary-color);
  transform: scale(1.15);
}

.portfolio-screenshots-dot:hover {
  background: color-mix(in srgb, var(--primary-color) 70%, var(--text-muted));
}

@media (max-width: 768px) {
  .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshots {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-bottom: var(--space-sm);
  }

  @media (prefers-reduced-motion: no-preference) {
    .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshots {
      scroll-behavior: smooth;
    }
  }

  .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshots::-webkit-scrollbar {
    display: none;
  }

  .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshot {
    flex: 0 0 100%;
    scroll-snap-align: center;
  }

  .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshot-image,
  .portfolio-screenshots--desktop .portfolio-screenshot-image {
    aspect-ratio: auto;
    object-fit: contain;
  }

  .portfolio-screenshots-gallery--mobile.portfolio-screenshots-gallery--multi .portfolio-screenshots-controls {
    display: flex;
  }
}
</style>
