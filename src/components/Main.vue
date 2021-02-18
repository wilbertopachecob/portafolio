<template>
  <div
    id="toggleDarkMode"
    class="topcorner"
    title="Toggle Dark Mode"
    style="display: block"
  >
    <label class="switch" for="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        @change="toggleDarkMode($event)"
        autocomplete="off"
      />
      <div class="slider round"></div>
    </label>
  </div>
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
    toggleDarkMode(e) {
      const isCkecked = e.target.checked;
      const body = document.querySelector("body");
      isCkecked
        ? body.classList.add("theme-dark")
        : body.classList.remove("theme-dark");
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
.topcorner {
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 9999;
}
.switch {
  display: inline-block;
  height: 24px;
  position: relative;
  width: 44px;
}
.switch input {
  display: none;
}
.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}
.slider:before {
  background-color: #fff;
  bottom: 3px;
  font-family: "Font Awesome\ 5 Free";
  content: "\f186";
  font-size: 0.8rem;
  color: #000;
  height: 18px;
  left: 3px;
  position: absolute;
  transition: 0.4s;
  width: 18px;
}
input:checked + .slider {
  background-color: #bd5d38;
}
input:checked + .slider:before {
  transform: translateX(18px);
  color: #fff;
  background-color: #181a1b;
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>
