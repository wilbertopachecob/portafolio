<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex flex-column"
    id="certifications"
    role="region"
    aria-labelledby="certifications-heading"
  >
    <div class="my-auto" id="certifications-content">
      <h2 id="certifications-heading" class="sr-only">Professional Certifications</h2>
      <!-- Certification items with modern styling -->
      <div class="certifications-container" role="list" aria-label="Professional certifications">
        <div 
          class="certification-card"
          v-for="(certification, index) in certifications"
          :key="index"
          role="listitem"
        >
          <!-- Certification badge/image -->
          <div class="certification-badge">
            <img 
              :src="certification.badgeImage" 
              :alt="$t('certifications.badgeAlt', { issuer: certification.issuer })"
              class="badge-image"
              :aria-label="$t('certifications.badgeLabel', { title: certification.title, issuer: certification.issuer })"
            />
          </div>
          
          <!-- Certification details -->
          <div class="certification-details">
            <h3 class="certification-issuer">
              <a
                :href="certification.link"
                :title="certification.issuer"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('certifications.visitWebsite', { issuer: certification.issuer })"
              >
                {{ certification.issuer }}
              </a>
            </h3>
            
            <div class="certification-title">{{ certification.title }}</div>
            
            <div class="certification-date">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" aria-hidden="true" />
              <span>{{ $t('certifications.issued') }}: {{ certification.date }}</span>
            </div>
            
            <div v-if="certification.certificateNumber" class="certificate-number">
              {{ certification.certificateNumber }}
            </div>
            
            <p class="certification-description">{{ certification.description }}</p>
            
            <div class="certification-skills">
              <h4>{{ $t('certifications.skillsCovered') }}:</h4>
              <ul class="skills-list" role="list" :aria-label="$t('certifications.skillsCovered')">
                <li v-for="(skill, skillIndex) in certification.skills" :key="skillIndex" role="listitem">
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCertifications } from '@/i18n/content';

export default {
  name: "Certifications",
  computed: {
    certifications() {
      const certificationsData = getCertifications(this.$i18n.locale);
      return certificationsData.map((cert, index) => {
        const badgeImages = [
          require("@/assets/img/AWS-CloudPractitioner-2020.004d50ea.png"),
          require("@/assets/img/ITEC.jpg")
        ];
        return {
          ...cert,
          badgeImage: badgeImages[index],
          badgeAlt: cert.issuer === "Amazon Web Services (AWS)" ? "AWS-badge" : "ITEC"
        };
      });
    },
  },
};
</script>

<style scoped>
/* Modern certifications styling */
.certifications-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.certification-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.certification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
  border-color: #bd5d38;
}

.certification-badge {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-image {
  max-width: 120px;
  max-height: 120px;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.certification-card:hover .badge-image {
  transform: scale(1.05);
}

.certification-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.certification-issuer {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.certification-issuer a {
  color: #bd5d38;
  text-decoration: none;
  transition: color 0.3s ease;
}

.certification-issuer a:hover {
  color: #824027;
  text-decoration: underline;
}

.certification-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
  margin: 0;
}

.certification-date {
  color: #bd5d38;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.certificate-number {
  font-size: 0.85rem;
  color: #6c757d;
  font-style: italic;
  background: #e9ecef;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;
  width: fit-content;
}

.certification-description {
  color: #495057;
  line-height: 1.6;
  margin: 0;
}

.certification-skills h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #343a40;
  margin: 1rem 0 0.5rem 0;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-list li {
  background: #bd5d38;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .certification-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .certification-badge {
    order: -1;
  }
  
  .badge-image {
    max-width: 100px;
    max-height: 100px;
  }
  
  .certification-issuer {
    font-size: 1.3rem;
  }
  
  .skills-list {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .certification-card {
    padding: 1rem;
    gap: 1rem;
  }
  
  .badge-image {
    max-width: 80px;
    max-height: 80px;
  }
  
  .certification-issuer {
    font-size: 1.2rem;
  }
  
  .certification-title {
    font-size: 1rem;
  }
  
  .skills-list li {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
