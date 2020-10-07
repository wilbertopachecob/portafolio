<template>
  <div class="bg-primary f-container">
    <div class="my-auto w-100">
      <font-awesome-icon
        :icon="['fas', 'arrow-alt-circle-up']"
        class="mt-3 to-top-button"
        @click="scrollTop"
        title="Scroll to Top"
      />
      <p style="color: rgba(255,255,255,.5);" class="mb-0">
        Copyright © {{ year }} Wilberto Pacheco Batista. All rights reserved
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  methods: {
    scrollTop() {
      scroll({
        top: document.querySelector("#about").offsetTop,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style scoped>
.f-container {
  text-align: center;
  color: white;
}
.to-top-button {
  color: white;
  font-size: 2.3rem;
  cursor: pointer;
  opacity: 0.7;
}
.to-top-button:hover {
  opacity: 1;
}
</style>
