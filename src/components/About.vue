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
        <div class="social-links-container">
          <ul class="social-icons-list">
            <li 
              class="social-icon-item" 
              v-for="(social, index) in socialLinks" 
              :key="index"
            >
              <a
                :href="social.url"
                :title="social.title"
                data-toggle="tooltip"
                data-offset="0 10"
                rel="me"
                class="social-link"
              >
                <div class="social-icon-container">
                  <font-awesome-icon :icon="['fas', 'circle']" size="5x" class="social-bg" />
                  <font-awesome-icon
                    :icon="social.icon"
                    :size="'2x'"
                    :inverse="true"
                    class="social-icon"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
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
          title: "X (Twitter)",
          url: "https://twitter.com/PachecoWilberto",
          icon: ["fab", "x-twitter"],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Social links container */
.social-links-container {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

/* Social icons list */
.social-icons-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Social icon item */
.social-icon-item {
  flex-shrink: 0;
}

/* Social icons styling */
.social-link {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
}

.social-link:hover {
  transform: scale(1.1);
}

.social-icon-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
}

.social-bg {
  color: #6c757d;
  transition: color 0.2s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.social-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Hover effects for different social platforms */
.social-link:hover .social-bg {
  color: #0077b5; /* LinkedIn blue */
}

.social-link[title="GitHub"]:hover .social-bg {
  color: #333; /* GitHub dark */
}

.social-link[title="X (Twitter)"]:hover .social-bg {
  color: #000000; /* X platform black */
}

/* Responsive design */
@media (max-width: 768px) {
  .social-icons-list {
    gap: 1rem;
  }
  
  .social-icon-container {
    width: 4rem;
    height: 4rem;
  }
}
</style>
