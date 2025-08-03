<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="languages">
    <div class="my-auto" id="languages-content">
      <h2 class="mb-5">Languages</h2>
      
      <!-- Language display grid -->
      <div class="row">
        <div 
          class="col-xl-6 col-lg-6 col-md-12 col-sm-12"
          v-for="(language, index) in languages"
          :key="index"
        >
          <img
            :src="language.flagImage"
            :alt="`${language.name} flag`"
            class="rounded-circle mx-auto scale-img"
          />
          <h2>{{ language.name }}</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Languages",
  data() {
    return {
      // Language data configuration
      languages: [
        {
          name: "Spanish",
          flagImage: require("@/assets/img/spanish_flag_cropped.png"),
        },
        {
          name: "English",
          flagImage: require("@/assets/img/english_flag_cropped.png"),
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Center align the section content */
section {
  text-align: center !important;
}

/* Scale flag images appropriately */
.scale-img {
  max-height: 60%;
  max-width: 60%;
}
</style>
