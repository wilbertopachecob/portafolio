<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="languages" role="region" aria-labelledby="languages-heading">
    <div class="my-auto" id="languages-content">
      <!-- Language display grid with modern styling -->
      <div class="languages-container" role="list" aria-label="Language proficiency">
        <div 
          class="language-card"
          v-for="(language, index) in languages"
          :key="index"
          role="listitem"
        >
          <div class="language-flag">
            <img
              :src="language.flagImage"
              :alt="$t('languages.flagAlt', { language: language.name })"
              class="flag-image"
              :aria-label="$t('languages.flagLabel', { language: language.name })"
              width="120"
              height="80"
              loading="lazy"
            />
          </div>
          <h3 class="language-name">{{ language.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Languages",
  computed: {
    languages() {
      return [
        {
          name: this.$t('languages.spanish'),
          flagImage: this.getFlagImage('spanish_flag.png'),
        },
        {
          name: this.$t('languages.english'),
          flagImage: this.getFlagImage('english_flag.png'),
        },
      ];
    },
  },
  methods: {
    getFlagImage(filename) {
      try {
        return require(`@/assets/img/${filename}`);
      } catch (error) {
        // Fallback for test environment or missing images
        return `${import.meta.env.BASE_URL}img/${filename}`;
      }
    },
  },
};
</script>

<style scoped>
/* Modern languages section styling */
.languages-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  min-height: 200px; /* Ensure container has height */
}

.language-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  min-width: 200px;
  border: 1px solid #e9ecef; /* Add border for visibility */
}

.language-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
}

.language-flag {
  margin-bottom: 1rem;
  position: relative;
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.language-card:hover .flag-image {
  border-color: #bd5d38;
  transform: scale(1.05);
}

.language-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Responsive design */
@media (max-width: 768px) {
  .languages-container {
    gap: 2rem;
    flex-direction: column;
  }
  
  .language-card {
    min-width: 180px;
    padding: 1.5rem;
  }
  
  .language-flag {
    width: 100px;
    height: 70px;
  }
  
  .language-name {
    font-size: 1.25rem;
  }
}

@media (max-width: 576px) {
  .languages-container {
    gap: 1.5rem;
  }
  
  .language-card {
    min-width: 160px;
    padding: 1rem;
  }
  
  .language-flag {
    width: 80px;
    height: 60px;
  }
  
  .language-name {
    font-size: 1.1rem;
  }
}
</style>
