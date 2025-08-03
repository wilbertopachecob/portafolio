<template>
  <!-- Dark mode toggle switch -->
  <div
    id="toggleDarkMode"
    class="topcorner"
    title="Toggle Dark Mode"
    style="display: block"
  >
    <label class="switch" for="darkModeCheckbox">
      <input
        type="checkbox"
        id="darkModeCheckbox"
        :checked="isDarkMode"
        @change="handleToggle"
        autocomplete="off"
      />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: "DarkModeToggle",
  data() {
    return {
      isDarkMode: false,
    };
  },
  mounted() {
    // Check if dark mode was previously enabled
    this.isDarkMode = document.body.classList.contains("theme-dark");
  },
  methods: {
    /**
     * Handles the toggle change event
     * @param {Event} event - The change event
     */
    handleToggle(event) {
      this.isDarkMode = event.target.checked;
      this.$emit("toggle", this.isDarkMode);
    },
  },
};
</script>

<style scoped>
/* Dark mode toggle positioning */
.topcorner {
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 9999;
}

/* Toggle switch styling */
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
  font-family: "Font Awesome 5 Free";
  content: "\f186"; /* Moon icon */
  font-size: 0.8rem;
  color: #000;
  height: 18px;
  left: 3px;
  position: absolute;
  transition: 0.4s;
  width: 18px;
}

/* Dark mode active state */
input:checked + .slider {
  background-color: #bd5d38;
}

input:checked + .slider:before {
  transform: translateX(18px);
  color: #fff;
  background-color: #181a1b;
}

/* Rounded slider */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style> 