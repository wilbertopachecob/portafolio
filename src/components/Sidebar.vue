<template>
  <!-- <div class="nav-container"> -->
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
    id="sideNav"
  >
    <a
      class="navbar-brand js-scroll-trigger"
      @click="smoothScroll($event, { text: 'About', url: 'about' })"
      :href="`/#about`"
    >
      <span class="d-block d-lg-none">Wilberto Pacheco Batista</span>
      <span class="d-none d-lg-block">
        <img
          class="img-fluid img-profile rounded-circle mx-auto mb-2"
          src="@/assets/img/profile_cropped.jpg"
          alt="profile"
        />
      </span>
    </a>
    <button
      class="navbar-toggler collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      ref="toggler"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(m, index) in menu" :key="index">
          <a
            class="nav-link js-scroll-trigger"
            :href="`/#${m.url}`"
            @click="smoothScroll($event, m)"
            >{{ m.text }}</a
          >
        </li>
      </ul>
    </div>
  </nav>
  <!-- <div id="lead-overlay"></div> -->
  <!-- </div> -->
</template>
<script>
export default {
  name: "Sidebar",
  props: {
    msg: String,
  },
  data() {
    return {
      menu: [
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
    smoothScroll(e, m) {
      e.preventDefault();
      const container = document.querySelector("#" + m.url);
      if (container) {
        scroll({
          top: container.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>
<style scoped>
/* .nav-container {
  position: relative;
  height: 100vh;
  min-height: 500px;
  max-height: 1080px;
  background: url(~@/assets/img/lead-bg.jpg);
  background-size: cover;
  padding: 15px;
  overflow: hidden;
} 
#lead-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #bd5d38 !important;
  z-index: 1;
}*/
</style>
