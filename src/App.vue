<template>
  <Main />
</template>

<script>
import Main from "./components/Main.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
import "@/assets/css/tweaks.css";

export default {
  name: "App",
  components: {
    Main,
  },
  mounted() {
    document.title = "Wilberto Pacheco Batista | Portafolio";
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
