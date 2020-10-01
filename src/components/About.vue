<template>
  <section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
    <div class="my-auto">
      <div class="resume-item d-flex flex-column flex-md-row">
        <div class="mr-auto text-left">
          <h1 class="mb-0">
            Wilberto
            <span class="text-primary">Pacheco Batista</span>
          </h1>
          <div class="subheading mb-5">
            Broken Arrow, OK, 74012, USA ·
            <a href="mailto:wilbertopachecob@gmail.com"
              >wilbertopachecob<span style="display: none">-remove-</span
              >@gmail.com</a
            >
          </div>
        </div>
      </div>
      <div>
        <p class="text-left">
          Bilingual Full Stack Web Developer with more than 10 years of
          experience developing frontend and backend software. Enjoys solving
          technical issues and seeking to make a change in a company with high
          goals.
        </p>

        <ul class="list-inline list-social-icons mb-0 mt-5 float-left">
          <li class="list-inline-item">
            <a
              href="https://www.linkedin.com/in/wilberto-pacheco-batista-31806660/"
              title="LinkedIn"
              data-toggle="tooltip"
              data-offset="0 10"
              rel="me"
              class="mt-2"
            >
              <font-awesome-layers>
                <font-awesome-icon :icon="['fas', 'circle']" size="4x" />
                <font-awesome-icon
                  :icon="['fab', 'linkedin']"
                  :size="'2x'"
                  :inverse="true"
                  class="ml-4"
                />
              </font-awesome-layers>
            </a>
          </li>

          <li class="list-inline-item">
            <a
              href="https://github.com/wilbertopachecob"
              data-toggle="tooltip"
              title="GitHub"
              data-offset="0 10"
              rel="me"
            >
              <font-awesome-layers>
                <font-awesome-icon :icon="['fas', 'circle']" size="4x" />
                <font-awesome-icon
                  :icon="['fab', 'github']"
                  :size="'2x'"
                  :inverse="true"
                  class="ml-4"
                />
              </font-awesome-layers>
            </a>
          </li>

          <li class="list-inline-item">
            <a
              href="https://twitter.com/PachecoWilberto"
              data-toggle="tooltip"
              title="Twitter"
              data-offset="0 10"
              rel="me"
            >
              <font-awesome-layers>
                <font-awesome-icon :icon="['fas', 'circle']" size="4x" />
                <font-awesome-icon
                  :icon="['fab', 'twitter']"
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
};
</script>
