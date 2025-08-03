<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex flex-column"
    id="certifications"
  >
    <div class="my-auto" id="certifications-content">
      <h2 class="mb-5">Certifications</h2>
      
      <!-- Certification items -->
      <div 
        class="row"
        v-for="(certification, index) in certifications"
        :key="index"
      >
        <!-- Certification badge/image -->
        <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12">
          <img :src="certification.badgeImage" :alt="certification.badgeAlt" />
        </div>
        
        <!-- Certification details -->
        <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12">
          <h3>
            <a
              :href="certification.link"
              :title="certification.issuer"
              target="_blank"
            >
              {{ certification.issuer }}
            </a>
          </h3>
          
          <div class="subheading mb-3">
            {{ certification.title }}
          </div>
          
          <p>
            <small class="text-primary">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" />
              ({{ certification.date }})
            </small>
          </p>
          
          <h3 v-if="certification.certificateNumber">
            {{ certification.certificateNumber }}
          </h3>
          
          <p>{{ certification.description }}</p>
          
          <ul class="mt-2" style="list-style:square">
            <li v-for="(skill, skillIndex) in certification.skills" :key="skillIndex">
              {{ skill }}
            </li>
          </ul>
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
