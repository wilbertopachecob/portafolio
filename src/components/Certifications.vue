<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex flex-column"
    id="certifications"
  >
    <div class="my-auto" id="certifications-content">
      <!-- Certification items with modern styling -->
      <div class="certifications-container">
        <div 
          class="certification-card"
          v-for="(certification, index) in certifications"
          :key="index"
        >
          <!-- Certification badge/image -->
          <div class="certification-badge">
            <img 
              :src="certification.badgeImage" 
              :alt="certification.badgeAlt"
              class="badge-image"
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
              >
                {{ certification.issuer }}
              </a>
            </h3>
            
            <div class="certification-title">
              {{ certification.title }}
            </div>
            
            <div class="certification-date">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" />
              {{ certification.date }}
            </div>
            
            <div v-if="certification.certificateNumber" class="certificate-number">
              {{ certification.certificateNumber }}
            </div>
            
            <p class="certification-description">{{ certification.description }}</p>
            
            <div class="certification-skills">
              <h4>Skills Covered:</h4>
              <ul class="skills-list">
                <li v-for="(skill, skillIndex) in certification.skills" :key="skillIndex">
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
export default {
  name: "Certifications",
  data() {
    return {
      // Certification data configuration
      certifications: [
        {
          issuer: "Amazon Web Services (AWS)",
          title: "AWS Certified Cloud Practitioner",
          date: "12/14/2020",
          link: "https://www.youracclaim.com/users/wilberto-pacheco-batista",
          badgeImage: require("@/assets/img/AWS-CloudPractitioner-2020.004d50ea.png"),
          badgeAlt: "AWS-badge",
          description: "Earners of this certification have a fundamental understanding of IT services and their uses in the AWS Cloud. They demonstrated cloud fluency and foundational AWS knowledge. Badge owners are able to identify essential AWS services necessary to set up AWS-focused projects.",
          skills: [
            "Amazon Web Services",
            "Cloud Computing",
            "Cloud Platform",
            "Cloud Services",
          ],
        },
        {
          issuer: "Centre for Development of Advanced Computing",
          title: "Specialized Training Programme in Multimedia and Web Design Technology",
          date: "6/10/2016",
          link: "https://www.cdac.in/",
          badgeImage: require("@/assets/img/ITEC.jpg"),
          badgeAlt: "ITEC",
          certificateNumber: "Certificate No. CDAC(M)/16-17/ITEC-MWDT/7725",
          description: "This was an intensive 3 months program in the Centre for Development of Advanced Computing in Mohali, Chandigarh, India to master different tools to create multimedia like:",
          skills: [
            "Adobe Photoshop",
            "HTML5",
            "CSS3",
            "JavaScript",
            "jQuery",
            "Wordpress",
          ],
        },
      ],
    };
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
