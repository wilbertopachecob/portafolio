<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="languages">
    <div class="my-auto" id="languages-content">
      <h2 class="mb-5">Languages</h2>
    </div>
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img
          src="@/assets/img/spanish_flag_cropped.png"
          class="rounded-circle mx-auto scale-img"
          alt="Spanish flag"
        />
        <h2>Spanish</h2>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img
          src="@/assets/img/english_flag_cropped.png"
          alt="English flag"
          class="rounded-circle mx-auto scale-img"
        />
        <h2>English</h2>
      </div>
    </div>
  </section>
</template>
<style scoped>
section {
  text-align: center !important;
}
.scale-img {
  max-height: 60%;
  max-width: 60%;
}
</style>
