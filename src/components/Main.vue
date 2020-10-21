<template>
  <sidebar ref="sidebar" />
  <div
    class="container-fluid p-0"
    id="sections_container"
    @click="closeToggler()"
  >
    <about />
    <skills />
    <experience />
    <languages />
    <certifications />
    <education />
    <my-footer />
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Languages from "./Languages";
import Certifications from "./Certifications";
import Education from "./Education";
import Footer from "./Footer";
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
    "my-footer": Footer,
  },
  mounted() {
    var observer = new IntersectionObserver(
      function(entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if (entries[0].isIntersecting === true) {
          document
            .querySelectorAll("div#navbarSupportedContent>ul>li>a")
            .forEach((a) => {
              if (a.getAttribute("href") === `/#${entries[0].target.id}`) {
                a.classList.add("active");
                return;
              }
              a.classList.remove("active");
            });
        }
      },
      { threshold: [0.1] }
    );
    document
      .querySelectorAll("#sections_container>section")
      .forEach((section) => {
        observer.observe(section);
      });
  },
  methods: {
    closeToggler() {
      const s = this.$refs.sidebar;
      if (s.$refs.toggler.getAttribute("aria-expanded") === "true") {
        s.$refs.toggler.click();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
