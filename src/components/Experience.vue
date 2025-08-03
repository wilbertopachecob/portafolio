<template>
  <div class="timeline">
    <div 
      class="timeline-item"
      v-for="(job, index) in workExperience"
      :key="index"
    >
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-company">{{ job.company }}</h3>
          <div class="timeline-position">{{ job.position }}</div>
          <div class="timeline-period">
            <font-awesome-icon :icon="['fas', 'calendar-alt']" />
            {{ job.period }}
            <span v-if="job.location" class="timeline-location">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
              {{ job.location }}
            </span>
          </div>
        </div>
        
        <div class="timeline-description">
          <ul class="timeline-achievements">
            <li 
              v-for="(responsibility, respIndex) in job.responsibilities" 
              :key="respIndex"
              class="timeline-achievement"
            >
              {{ responsibility }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Experience",
  data() {
    return {
      // Work experience data
      workExperience: [
        {
          company: "Included Health",
          position: "Software Engineer II",
          period: "May 2021 - Present",
          location: "San Francisco, California",
          responsibilities: [
            "Lead role in Dependabot campaigns and security mitigation, significantly improving maintainability of our monolithic application and contributing to securing a major client deal.",
            "Participated in a Chrome extension development for care coordinators (CCs), leading to substantial code refactoring. Achieved improvements in readability, test coverage, workflow optimization, linting standards, and reduced JavaScript bundle size.",
            "Full Stack development on a web app (Node.js, Redis, React and Elastic Search) that accelerated response times for CCs by 5% and eliminated reliance on an external tool, reducing operational costs.",
            "Migrated AngularJS to Vue.js components in member facing web app, refactored code to reduce technical debt, enhance code organization, and improve feature flag implementation.",
          ],
        },
        {
          company: "Velocigo Inc",
          position: "Software Developer",
          period: "March 2020 - February 2021",
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
          period: "February 2019 - March 2020",
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
          period: "September 2010 - June 2017",
          location: "Havana, Cuba",
          responsibilities: [
            "Assumed a FullStack role in web Portal using PHP, jQuery and MYSQL. Addressed customer service requests in less than 30 min and resolved high priority tickets in 24h with a 90% success rate.",
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
/* Timeline Styles */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-2xl);
  padding-left: 60px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 4px solid var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.timeline-content {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.timeline-content:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.timeline-header {
  margin-bottom: var(--space-lg);
}

.timeline-company {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.timeline-position {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.timeline-period {
  color: var(--text-muted);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.timeline-location {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-left: var(--space-md);
}

.timeline-period svg,
.timeline-location svg {
  color: var(--text-muted);
  width: 0.875rem;
  height: 0.875rem;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.timeline-achievements {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-achievement {
  position: relative;
  padding-left: var(--space-lg);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.timeline-achievement::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}

.timeline-achievement:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline::before {
    left: 15px;
  }
  
  .timeline-item {
    padding-left: 45px;
  }
  
  .timeline-item::before {
    left: 6px;
    width: 18px;
    height: 18px;
  }
  
  .timeline-content {
    padding: var(--space-lg);
  }
  
  .timeline-company {
    font-size: 1.25rem;
  }
  
  .timeline-position {
    font-size: 1rem;
  }
  
  .timeline-period {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
  
  .timeline-location {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .timeline-content {
    padding: var(--space-md);
  }
  
  .timeline-company {
    font-size: 1.125rem;
  }
  
  .timeline-achievement {
    padding-left: var(--space-md);
    font-size: 0.9rem;
  }
}
</style>

