<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="skills">
    <div class="my-auto" id="skills-content">
      <h2 class="mb-5">Skills</h2>

      <!-- Render each skill category -->
      <div v-for="(category, index) in skillCategories" :key="index">
        <h3 v-html="category.title"></h3>
        <ul>
          <SkillItem
            v-for="(skill, skillIndex) in category.skills"
            :key="skillIndex"
            :name="skill.name"
            :icon="skill.icon"
            :icon-color="skill.iconColor"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import SkillItem from "./SkillItem.vue";

export default {
  name: "Skills",
  components: {
    SkillItem,
  },
  data() {
    return {
      // Skill categories configuration
      skillCategories: [
        {
          title: "Architecture",
          skills: [
            { name: "Microservices", icon: ["fas", "terminal"] },
            { name: "RESTful APIs", icon: ["fas", "terminal"] },
          ],
        },
        {
          title: 'Languages, <span class="text-primary">Operating Systems &amp; Tools</span>',
          skills: [
            { name: "Windows", icon: ["fab", "windows"], iconColor: "#00B7EE" },
            { name: "git", icon: ["fab", "git"], iconColor: "#E84E31" },
            { name: "Golang" },
            { name: "bash", icon: ["fas", "terminal"] },
            { name: "PHP", icon: ["fab", "php"], iconColor: "#8892BF" },
            { name: "Laravel", icon: ["fab", "laravel"], iconColor: "#F72C1F" },
            { name: "HTML5", icon: ["fab", "html5"], iconColor: "#E44D26" },
            { name: "CSS3", icon: ["fab", "css3-alt"], iconColor: "#254BDD" },
            { name: "Bootstrap", icon: ["fab", "bootstrap"], iconColor: "#533B78" },
            { name: "JavaScript", icon: ["fab", "js"], iconColor: "#F7DF1E" },
            { name: "Vue.js", icon: ["fab", "vuejs"], iconColor: "#41B883" },
            { name: "Angular", icon: ["fab", "angular"], iconColor: "#D6002F" },
            { name: "jQuery" },
          ],
        },
        {
          title: 'Platform <span class="text-primary">Development &amp; Administration</span>',
          skills: [
            { name: "GitHub", icon: ["fab", "github-alt"], iconColor: "#323131" },
            { name: "Bitbucket", icon: ["fab", "bitbucket"], iconColor: "#2580F7" },
            { name: "Apache" },
            { name: "Wordpress 5", icon: ["fab", "wordpress"], iconColor: "#207196" },
            { name: "Drupal 7", icon: ["fab", "drupal"], iconColor: "#0097D7" },
          ],
        },
        {
          title: 'Data <span class="text-primary">Management</span>',
          skills: [
            { name: "MySQL" },
            { name: "Microsoft SQL Server" },
            { name: "MongoDB" },
            { name: "Node.js", icon: ["fab", "node"], iconColor: "#74AA63" },
          ],
        },
        {
          title: 'Organizing <span class="text-primary">Tools</span>',
          skills: [
            { name: "Trello", icon: ["fab", "trello"], iconColor: "#0D77C0" },
            { name: "Slack", icon: ["fab", "slack"] },
            { name: "Monday.com" },
          ],
        },
      ],
    };
  },
};
</script>
