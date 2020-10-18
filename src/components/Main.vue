<template>
  <sidebar ref="sidebar" />
  <div class="container-fluid p-0" @click="closeToggler()">
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
