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
          company: "Velocigo Inc",
          position: "Software Developer",
          period: "3/2020 - 2/2021",
          responsibilities: [
            "Development of a Web App moving our main client from Microsoft Dynamics NAV 2009 to an intuitive web UI increasing performance, visibility and communication. The backend was supported by Golang and Node.js, implementing a microservices architecture, Microsoft SQL Server, AWS and Angular 9 on the frontend.",
            "Generation on reports using a RESTful architecture that involved extracting metadata from statistics to present to the final user in dynamic charts, tables and forms.",
            "Guidance of our Junior Developer, supporting him and teaching him the best practices of the profession.",
            "Built a Golang App to manage campaigns, audiences, etc. using the Mailchimp API.",
            "Vuejs Dashboard that provides Jira metadata using Golang in the backend.",
          ],
        },
        {
          company: "TPV.com",
          position: "Web Developer",
          period: "2/2019 – 3/2020",
          responsibilities: [
            "Converted a big percentage of two major platforms from PHP (Laravel) to Vue.js increasing the loading speed for customers satisfaction.",
            "Built reports, RESTful web services and APIs for Developers, HR personal and other departments of the company involving diverse technologies.",
            "Supporting new features, bug fix and providing a fast solution to issues with more than 1550 contributions on GitHub.",
            "Was one of the key figures in the Internationalization and Localization process of one of the major platforms in the company.",
          ],
        },
        {
          company: "Institute of Cybernetics, Mathematics and Physics",
          position: "Web Developer / Webmaster",
          period: "9/2010 – 6/2017",
          responsibilities: [
            "Website management, frontend and backend",
            "Development of a PHP modular CMS",
            "Promptly resolve customer service issues and requests",
            "Development and maintenance of WordPress themes and plugins",
            "Intranet management of services including chats and data entry interfaces",
            "Web service development following OWASP standards",
            "APIs development to track process as part of a CRM",
            "Train end users and technical support personnel on optimization and use of services and programs",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Timeline styling */
.timeline {
  list-style: none;
  padding: 0 0 20px;
  position: relative;
  margin-top: -15px;
}

.timeline:before {
  top: 30px;
  bottom: 25px;
  position: absolute;
  content: "";
  width: 3px;
  background-color: #f2b357;
  left: 25px;
  margin-right: -1.5px;
}

.timeline > li,
.timeline > li > .timeline-panel {
  margin-bottom: 5px;
  position: relative;
}

.timeline > li:after,
.timeline > li:before {
  content: "";
  display: table;
}

.timeline > li:after {
  clear: both;
}

.timeline > li > .timeline-panel {
  margin-left: 55px;
  float: left;
  top: 19px;
  padding: 4px 0px 8px 15px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 95%;
}

@media screen and (min-width: 400px) {
  .timeline > li > .timeline-panel {
    width: 85%;
  }
}

@media screen and (min-width: 800px) {
  .timeline > li > .timeline-panel {
    width: 95%;
  }
}

.timeline > li > .timeline-badge {
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 0px;
  margin-left: 0px;
  background-color: #999999;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}

.timeline > li.timeline-inverted > .timeline-panel {
  float: right;
}

.timeline > li.timeline-inverted > .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 15px;
  left: -15px;
  right: auto;
}

.timeline > li.timeline-inverted > .timeline-panel:after {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}

.timeline-badge.primary {
  background-color: #2e6da4 !important;
}

.timeline-badge.success {
  background-color: #3f903f !important;
}

.timeline-badge.warning {
  background-color: #f0ad4e !important;
}

.timeline-badge.danger {
  background-color: #d9534f !important;
}

.timeline-badge.info {
  background-color: #5bc0de !important;
}

.timeline-title {
  margin-top: 0;
  color: inherit;
}

.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
}

.timeline-body > p + p {
  margin-top: 5px;
}

@media (max-width: 767px) {
  ul.timeline:before {
    left: 40px;
  }

  ul.timeline > li > .timeline-panel {
    width: calc(100% - 90px);
    width: -moz-calc(100% - 90px);
    width: -webkit-calc(100% - 90px);
  }

  ul.timeline > li > .timeline-badge {
    left: 15px;
    margin-left: 0;
    top: 16px;
  }

  ul.timeline > li > .timeline-panel {
    float: right;
  }

  ul.timeline > li > .timeline-panel:before {
    border-left-width: 0;
    border-right-width: 15px;
    left: -15px;
    right: auto;
  }

  ul.timeline > li > .timeline-panel:after {
    border-left-width: 0;
    border-right-width: 14px;
    left: -14px;
    right: auto;
  }
}
</style>
