<template>
  <section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
    <div class="my-auto">
      <!-- Personal information -->
      <div class="resume-item d-flex flex-column flex-md-row">
        <div class="mr-auto text-left">
          <h1 class="mb-0">
            Wilberto
            <span class="text-primary">Pacheco Batista</span>
          </h1>
          <div class="subheading mb-5">
            Broken Arrow, OK, 74012, USA ·
            <a href="mailto:wilbertopachecob@gmail.com">
              wilbertopachecob<span style="display: none">-remove-</span>@gmail.com
            </a>
          </div>
        </div>
      </div>

      <!-- Professional summary -->
      <div>
        <p class="text-left">
          Bilingual Full Stack Web Developer with more than 11 years of
          experience developing frontend and backend software. Enjoys solving
          technical issues and seeking to make a change in a company with high
          goals.
        </p>

        <!-- Social media links -->
        <ul class="list-inline list-social-icons mb-0 mt-5 float-left">
          <li 
            class="list-inline-item" 
            v-for="(social, index) in socialLinks" 
            :key="index"
          >
            <a
              :href="social.url"
              :title="social.title"
              data-toggle="tooltip"
              data-offset="0 10"
              rel="me"
              class="mt-2"
            >
              <font-awesome-layers>
                <font-awesome-icon :icon="['fas', 'circle']" size="4x" />
                <font-awesome-icon
                  :icon="social.icon"
                  :size="'2x'"
                  :inverse="true"
                  class="ml-4"
                />
              </font-awesome-layers>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      // Social media links configuration
      socialLinks: [
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com/in/wilberto-pacheco-batista/",
          icon: ["fab", "linkedin"],
        },
        {
          title: "GitHub",
          url: "https://github.com/wilbertopachecob",
          icon: ["fab", "github"],
        },
        {
          title: "Twitter",
          url: "https://twitter.com/PachecoWilberto",
          icon: ["fab", "twitter"],
        },
      ],
    };
  },
};
</script>
