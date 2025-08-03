<template>
  <!-- Navigation sidebar -->
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
    id="sideNav"
  >
    <!-- Brand/Logo section -->
    <a
      class="navbar-brand js-scroll-trigger"
      @click="smoothScroll($event, { text: 'About', url: 'about' })"
      :href="`/#about`"
    >
      <!-- Mobile brand text -->
      <span class="d-block d-lg-none">Wilberto Pacheco Batista</span>
      
      <!-- Desktop profile image -->
      <span class="d-none d-lg-block">
        <img
          class="img-fluid img-profile rounded-circle mx-auto mb-2"
          src="@/assets/img/profile_cropped.jpg"
          alt="Wilberto Pacheco Batista Profile"
        />
      </span>
    </a>

    <!-- Mobile navigation toggle button -->
    <button
      class="navbar-toggler collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      ref="toggler"
      @click="hideDarkModeToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navigation menu -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li 
          class="nav-item" 
          v-for="(menuItem, index) in navigationMenu" 
          :key="index"
        >
          <a
            class="nav-link js-scroll-trigger"
            :href="`/#${menuItem.url}`"
            @click="smoothScroll($event, menuItem)"
          >
            {{ menuItem.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      // Navigation menu configuration
      navigationMenu: [
        { text: "About", url: "about" },
        { text: "Skills", url: "skills" },
        { text: "Experience", url: "experience" },
        { text: "Languages", url: "languages" },
        { text: "Certifications", url: "certifications" },
        { text: "Education", url: "education" },
      ],
    };
  },
  methods: {
    /**
     * Smoothly scrolls to the target section
     * @param {Event} event - The click event
     * @param {Object} menuItem - The menu item object with url property
     */
    smoothScroll(event, menuItem) {
      event.preventDefault();
      const targetSection = document.querySelector(`#${menuItem.url}`);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },

    /**
     * Hides/shows the dark mode toggle when mobile menu is opened/closed
     */
    hideDarkModeToggle() {
      const darkModeToggle = document.querySelector("#toggleDarkMode");
      if (darkModeToggle) {
        const isCurrentlyHidden = darkModeToggle.style.display === "none";
        darkModeToggle.style.display = isCurrentlyHidden ? "block" : "none";
      }
    },
  },
};
</script>

<style scoped>
/* Sidebar-specific styles - most styling is handled by Bootstrap and main.css */
</style>
