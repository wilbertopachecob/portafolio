<template>
  <div class="bg-primary f-container">
    <div class="my-auto w-100">
      <font-awesome-icon
        :icon="['fas', 'arrow-alt-circle-up']"
        style="color: white; font-size: 2rem; cursor: pointer;"
        class="mt-3"
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
</style>
