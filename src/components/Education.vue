<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="education" role="region" aria-labelledby="education-heading">
    <div class="my-auto" id="education-content">
      <h2 id="education-heading" class="sr-only">Education Background</h2>
      <!-- Education items with modern styling -->
      <div class="education-container" role="list" aria-label="Educational background">
        <div 
          class="education-card"
          v-for="(education, index) in educationHistory"
          :key="index"
          role="listitem"
        >
          <!-- Institution logo -->
          <div class="education-logo">
            <img 
              :src="education.logoImage" 
              :alt="`${education.institution} logo`"
              class="logo-image"
              :aria-label="`Logo of ${education.institution}`"
            />
          </div>
          
          <!-- Education details -->
          <div class="education-details">
            <h3 class="institution-name">
              <a
                :href="education.link"
                :title="education.institution"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('education.visitWebsite', { institution: education.institution })"
              >
                {{ education.institution }}
              </a>
            </h3>
            
            <div class="degree-title">{{ education.degree }}</div>
            
            <div class="education-period">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" aria-hidden="true" />
              <span>{{ $t('education.period') }}: {{ education.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getEducation } from '@/i18n/content';

export default {
  name: "Education",
  computed: {
    educationHistory() {
      const educationData = getEducation(this.$i18n.locale);
      return educationData.map(item => ({
        ...item,
        logoImage: this.getEducationImage('UCI.jpg'),
      }));
    },
  },
  methods: {
    getEducationImage(filename) {
      try {
        return require(`@/assets/img/${filename}`);
      } catch (error) {
        // Fallback for test environment or missing images
        return `/src/assets/img/${filename}`;
      }
    },
  },
};
</script>

<style scoped>
/* Modern education styling */
.education-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  align-items: center;
}

.education-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
  border-color: #bd5d38;
}

.education-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.3s ease;
}

.education-card:hover .education-logo {
  transform: scale(1.05);
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
}

.education-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.institution-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.institution-name a {
  color: #bd5d38;
  text-decoration: none;
  transition: color 0.3s ease;
}

.institution-name a:hover {
  color: #824027;
  text-decoration: underline;
}

.degree-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: #495057;
  margin: 0;
}

.education-period {
  color: #bd5d38;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .education-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .education-logo {
    order: -1;
    width: 100px;
    height: 100px;
  }
  
  .institution-name {
    font-size: 1.3rem;
  }
  
  .degree-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .education-card {
    padding: 1rem;
    gap: 1rem;
  }
  
  .education-logo {
    width: 80px;
    height: 80px;
    padding: 0.5rem;
  }
  
  .institution-name {
    font-size: 1.2rem;
  }
  
  .degree-title {
    font-size: 1rem;
  }
  
  .education-period {
    font-size: 0.9rem;
  }
}
</style>
