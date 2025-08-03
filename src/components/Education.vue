<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="education">
    <div class="my-auto" id="education-content">
      <h2 class="mb-1">Education</h2>
      
      <!-- Education items -->
      <div 
        class="row"
        v-for="(education, index) in educationHistory"
        :key="index"
      >
        <!-- Institution logo -->
        <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12">
          <img :src="education.logoImage" :alt="education.institution" />
        </div>
        
        <!-- Education details -->
        <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12">
          <h3>
            <a
              :href="education.link"
              :title="education.institution"
              target="_blank"
            >
              {{ education.institution }}
            </a>
          </h3>
          
          <div class="subheading mb-3">{{ education.degree }}</div>
          
          <p>
            <small class="text-primary">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" /> 
              {{ education.period }}
            </small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      // Education history data
      educationHistory: [
        {
          institution: "University of Informatic Sciences",
          degree: "Computer Science Engineer",
          period: "2005 - 2010",
          link: "https://www.uci.cu/",
          logoImage: require("@/assets/img/UCI.jpg"),
        },
      ],
    };
  },
};
</script>
