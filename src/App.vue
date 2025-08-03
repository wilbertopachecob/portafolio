<template>
  <!-- Main application container -->
  <Main />
</template>

<script>
import Main from "./components/Main.vue";

// Import Bootstrap for styling and functionality
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom CSS files
import "@/assets/css/main.css";
import "@/assets/css/tweaks.css";

export default {
  name: "App",
  components: {
    Main,
  },
  mounted() {
    // Set the document title when the app is mounted
    document.title = "Wilberto Pacheco Batista | Portafolio";
  },
};
</script>

<style>
/* Global app styles - currently commented out as they're handled by Bootstrap and custom CSS */
/* 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} 
*/
</style>
