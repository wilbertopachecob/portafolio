<template>
  <sidebar />
  <div class="container-fluid p-0">
    <about />
    <skills />
    <experience />
    <languages />
    <certifications />
    <education />
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
