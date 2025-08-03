<template>
  <!-- Dark mode toggle button -->
  <DarkModeToggle @toggle="toggleDarkMode" />
  
  <!-- Sidebar navigation -->
  <Sidebar ref="sidebar" />
  
  <!-- Main content container -->
  <div
    class="container-fluid p-0"
    id="sections_container"
    @click="closeSidebar"
  >
    <About />
    <Skills />
    <Experience />
    <Languages />
    <Certifications />
    <Education />
    <Footer />
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import About from "./About.vue";
import Skills from "./Skills.vue";
import Experience from "./Experience.vue";
import Languages from "./Languages.vue";
import Certifications from "./Certifications.vue";
import Education from "./Education.vue";
import Footer from "./Footer.vue";
import DarkModeToggle from "./DarkModeToggle.vue";

export default {
  name: "Main",
  components: {
    Sidebar,
    About,
    Skills,
    Experience,
    Languages,
    Certifications,
    Education,
    Footer,
    DarkModeToggle,
  },
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    /**
     * Sets up intersection observer to highlight active navigation items
     * based on which section is currently visible
     */
    setupIntersectionObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.updateActiveNavigation(entry.target.id);
            }
          });
        },
        { threshold: [0.1] }
      );

      // Observe all sections for intersection
      const sections = document.querySelectorAll("#sections_container > section");
      sections.forEach((section) => observer.observe(section));
    },

    /**
     * Updates the active navigation link based on the current section
     * @param {string} sectionId - The ID of the currently visible section
     */
    updateActiveNavigation(sectionId) {
      const navLinks = document.querySelectorAll("div#navbarSupportedContent > ul > li > a");
      
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `/#${sectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    },

    /**
     * Closes the sidebar when clicking on the main content area
     */
    closeSidebar() {
      const sidebar = this.$refs.sidebar;
      if (sidebar && sidebar.$refs.toggler) {
        const toggler = sidebar.$refs.toggler;
        if (toggler.getAttribute("aria-expanded") === "true") {
          toggler.click();
        }
      }
    },

    /**
     * Toggles dark mode on/off
     * @param {boolean} isDarkMode - Whether dark mode should be enabled
     */
    toggleDarkMode(isDarkMode) {
      const body = document.querySelector("body");
      if (isDarkMode) {
        body.classList.add("theme-dark");
      } else {
        body.classList.remove("theme-dark");
      }
    },
  },
};
</script>

<style scoped>
/* Component-specific styles */
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
