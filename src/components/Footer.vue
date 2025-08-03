<template>
  <footer class="bg-primary f-container">
    <div class="my-auto w-100">
      <!-- Scroll to top button -->
      <font-awesome-icon
        :icon="['fas', 'arrow-alt-circle-up']"
        class="mt-3 to-top-button bounce"
        @click="scrollToTop"
        title="Scroll to Top"
      />
      
      <!-- Footer links -->
      <div class="footer-links">
        <a 
          href="/Engineer_Wilberto_Pacheco_Batista.pdf" 
          class="footer-link"
          download="Engineer_Wilberto_Pacheco_Batista.pdf"
          :title="$t('hero.downloadResume')"
          :aria-label="$t('hero.downloadResume')"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fas', 'download']" aria-hidden="true" />
          {{ $t('hero.downloadResume') }}
        </a>
      </div>
      
      <!-- Copyright information -->
      <p style="color: rgba(255,255,255,.5);" class="mb-0">
        Copyright © {{ currentYear }} Wilberto Pacheco Batista. All rights reserved
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    /**
     * Smoothly scrolls to the top of the page
     */
    scrollToTop() {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Footer container styling */
.f-container {
  text-align: center;
  color: white;
}

/* Footer links styling */
.footer-links {
  margin-bottom: 1rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* Scroll to top button styling */
.to-top-button {
  color: white;
  font-size: 2.3rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.to-top-button:hover {
  opacity: 1;
}

/* Bounce animation for the scroll to top button */
.bounce {
  -webkit-animation: bounce 2s infinite;
  animation: bounce 2s infinite;
}

@-webkit-keyframes bounce {
  0%, 25%, 50%, 75%, 100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  60% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
  }
}

@keyframes bounce {
  0%, 25%, 50%, 75%, 100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  60% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
  }
}
</style>
