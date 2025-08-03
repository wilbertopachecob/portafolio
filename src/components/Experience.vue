<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="experience">
    <div class="my-auto" id="experience-content">
      <h2 class="mb-5">Experience</h2>
      
      <!-- Experience timeline -->
      <ul class="timeline">
        <ExperienceItem
          v-for="(job, index) in workExperience"
          :key="index"
          :company="job.company"
          :position="job.position"
          :period="job.period"
          :location="job.location"
          :responsibilities="job.responsibilities"
        />
      </ul>
    </div>
  </section>
</template>

<script>
import ExperienceItem from "./ExperienceItem.vue";

export default {
  name: "Experience",
  components: {
    ExperienceItem,
  },
  data() {
    return {
      // Work experience data
      workExperience: [
        {
          company: "Included Health",
          position: "SWE II",
          period: "5/2021 - Current",
          location: "San Francisco, California",
          responsibilities: [
            "Lead role in Dependabot campaigns and security mitigation, significantly improving maintainability of our monolithic application and contributing to securing a major client deal.",
            "Participated in a Chrome extension development for care coordinators (CCs), leading to substantial code refactoring. Achieved improvements in readability, test coverage, workflow optimization, linting standards, and reduced JavaScript bundle size.",
            "Full Stack on a web app (Node.js, Redis, React and Elastic Search) that accelerated response times for CCs by 5% and eliminated reliance on an external tool, reducing operational costs.",
            "Migrated AngularJS to Vue.js components in member facing web app, refactored code to reduce technical debt, enhance code organization, and improve feature flag implementation.",
          ],
        },
        {
          company: "Velocigo Inc",
          position: "Software Developer",
          period: "3/2020 - 2/2021",
          location: "Tulsa, Oklahoma",
          responsibilities: [
            "Migrated our primary client from Microsoft Dynamics NAV 2009 to a modern web UI, significantly enhancing performance, visibility, and communication.",
            "Designed and implemented a RESTful architecture with Golang to extract metadata from Jira and generate dynamic reports for end users.",
            "Mentored a junior developer, resulting in improved code quality by 30%.",
            "Developed a Golang application to manage marketing campaigns. Integrated business data with the Mailchimp API for enhanced email campaign functionalities.",
          ],
        },
        {
          company: "TPV.com",
          position: "Web Developer",
          period: "2/2019 - 3/2020",
          location: "Tulsa, Oklahoma",
          responsibilities: [
            "Led the conversion of significant portions of two major platforms from PHP (Laravel) to Vue.js components, resulting in improved loading speeds.",
            "Designed and implemented reports, a RESTful web service and APIs for various departments using Google Maps, Google Charts, Highcharts JS, vue-chartjs and jQuery to increase action response and data analysis in real time.",
            "Provided rapid support for new features and bug fixes, with over 1,550 contributions on GitHub in order to maintain and improve code quality.",
            "Drove the internationalization and localization of a web administrative platform increasing our audience reach by 8%.",
          ],
        },
        {
          company: "Institute of Cybernetics, Mathematics and Physics",
          position: "Web Developer / Webmaster",
          period: "9/2010 - 6/2017",
          location: "Havana, Cuba",
          responsibilities: [
            "Assumed a FullStack role in web Portal using PHP, jQuery and MYSQL. Addressed customer service requests in less than 30 min and resolved high priority tickets in 24h with a 90% success.",
            "Designed and maintained custom Wordpress themes and plugins for public website. Applied SEO techniques to attract customers into buying our products and increased our visibility by 50%.",
            "Enhanced internal communication by 80% through the implementation of chat systems and forums.",
            "Revamped HR and maintenance resolution processes by developing APIs and interactive visual charts, reducing resolution time by 17%.",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Modern timeline styling with flexbox */
.timeline {
  list-style: none;
  padding: 0;
  position: relative;
  margin: 0;
}

.timeline:before {
  content: "";
  position: absolute;
  top: 30px;
  bottom: 25px;
  left: 25px;
  width: 3px;
  background: linear-gradient(to bottom, #bd5d38, #e6e6e6);
  border-radius: 2px;
}

.timeline > li {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
}

.timeline > li > .timeline-panel {
  flex: 1;
  margin-left: 55px;
  padding: 1.5rem;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.timeline > li > .timeline-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #bd5d38;
}

.timeline > li > .timeline-badge {
  position: absolute;
  top: 16px;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #bd5d38;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: transform 0.3s ease;
}

.timeline > li:hover > .timeline-badge {
  transform: scale(1.1);
}

.timeline-badge.primary {
  background: #bd5d38 !important;
}

.timeline-badge.success {
  background: #28a745 !important;
}

.timeline-badge.warning {
  background: #ffc107 !important;
  color: #212529;
}

.timeline-badge.danger {
  background: #dc3545 !important;
}

.timeline-badge.info {
  background: #17a2b8 !important;
}

.timeline-title {
  margin: 0 0 0.5rem 0;
  color: #343a40;
  font-size: 1.5rem;
  font-weight: 600;
}

.timeline-heading {
  margin-bottom: 1rem;
}

.timeline-heading .badge {
  background: #bd5d38;
  color: white;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.timeline-heading p {
  margin: 0.5rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.timeline-heading small {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.timeline-body {
  color: #495057;
  line-height: 1.6;
}

.timeline-body ul {
  margin: 0;
  padding-left: 1.2rem;
}

.timeline-body li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Responsive design */
@media (max-width: 767px) {
  .timeline:before {
    left: 20px;
  }

  .timeline > li > .timeline-panel {
    margin-left: 45px;
    padding: 1rem;
  }

  .timeline > li > .timeline-badge {
    left: 10px;
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .timeline-title {
    font-size: 1.3rem;
  }

  .timeline-heading .badge {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 576px) {
  .timeline > li > .timeline-panel {
    margin-left: 40px;
    padding: 0.8rem;
  }

  .timeline > li > .timeline-badge {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
}
</style>
