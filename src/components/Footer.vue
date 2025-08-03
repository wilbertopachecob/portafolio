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
