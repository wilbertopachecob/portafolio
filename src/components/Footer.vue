<template>
  <div class="bg-primary f-container">
    <div class="my-auto w-100">
      <font-awesome-icon
        :icon="['fas', 'arrow-alt-circle-up']"
        class="mt-3 to-top-button bounce"
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

.bounce {
  -webkit-animation: bounce 2s;
  animation: bounce 2s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@-webkit-keyframes bounce {
  0%,
  25%,
  50%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  60% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
  }
}
</style>
