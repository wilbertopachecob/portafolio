<template>
  <div class="skills-container">
    <!-- Skills Grid -->
    <div class="skills-grid">
      <div 
        class="skill-category"
        v-for="(category, index) in skillCategories"
        :key="index"
      >
        <h3 class="skill-category-title" v-html="category.title"></h3>
        <div class="skill-items">
          <div 
            class="skill-item"
            v-for="(skill, skillIndex) in category.skills"
            :key="skillIndex"
          >
            <div class="skill-icon" v-if="skill.icon">
              <font-awesome-icon 
                :icon="skill.icon" 
                :style="{ color: skill.iconColor || 'var(--primary-color)' }"
              />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skills",
  data() {
    return {
      // Skill categories configuration
      skillCategories: [
        {
          title: "Programming Languages",
          skills: [
            { name: "JavaScript", icon: ["fab", "js"], iconColor: "#F7DF1E" },
            { name: "TypeScript", icon: ["fab", "js"], iconColor: "#3178C6" },
            { name: "PHP", icon: ["fab", "php"], iconColor: "#8892BF" },
            { name: "Golang", icon: ["fas", "code"], iconColor: "#00ADD8" },
            { name: "HTML5", icon: ["fab", "html5"], iconColor: "#E44D26" },
            { name: "CSS3", icon: ["fab", "css3-alt"], iconColor: "#254BDD" },
          ],
        },
        {
          title: "Frameworks & Libraries",
          skills: [
            { name: "Vue.js", icon: ["fab", "vuejs"], iconColor: "#41B883" },
            { name: "React", icon: ["fab", "react"], iconColor: "#61DAFB" },
            { name: "Angular", icon: ["fab", "angular"], iconColor: "#D6002F" },
            { name: "Laravel", icon: ["fab", "laravel"], iconColor: "#F72C1F" },
            { name: "Node.js", icon: ["fab", "node"], iconColor: "#74AA63" },
            { name: "Express.js", icon: ["fas", "server"], iconColor: "#000000" },
            { name: "Bootstrap", icon: ["fab", "bootstrap"], iconColor: "#533B78" },
            { name: "jQuery", icon: ["fas", "code"], iconColor: "#0769AD" },
          ],
        },
        {
          title: "Databases & Tools",
          skills: [
            { name: "MySQL", icon: ["fas", "database"], iconColor: "#4479A1" },
            { name: "MongoDB", icon: ["fas", "database"], iconColor: "#47A248" },
            { name: "Microsoft SQL Server", icon: ["fas", "database"], iconColor: "#CC2927" },
            { name: "Redis", icon: ["fas", "database"], iconColor: "#DC382D" },
            { name: "Git", icon: ["fab", "git"], iconColor: "#E84E31" },
            { name: "GitHub", icon: ["fab", "github"], iconColor: "#333333" },
          ],
        },
        {
          title: "Cloud & DevOps",
          skills: [
            { name: "AWS", icon: ["fab", "aws"], iconColor: "#FF9900" },
            { name: "Docker", icon: ["fab", "docker"], iconColor: "#2496ED" },
            { name: "Linux", icon: ["fab", "linux"], iconColor: "#FCC624" },
            { name: "Apache", icon: ["fas", "server"], iconColor: "#D22128" },
            { name: "Nginx", icon: ["fas", "server"], iconColor: "#009639" },
          ],
        },
        {
          title: "Content Management",
          skills: [
            { name: "WordPress", icon: ["fab", "wordpress"], iconColor: "#207196" },
            { name: "Drupal", icon: ["fab", "drupal"], iconColor: "#0097D7" },
            { name: "SEO", icon: ["fas", "search"], iconColor: "#4285F4" },
          ],
        },
        {
          title: "Development Tools",
          skills: [
            { name: "VS Code", icon: ["fas", "code"], iconColor: "#007ACC" },
            { name: "Webpack", icon: ["fas", "cog"], iconColor: "#8DD6F9" },
            { name: "ESLint", icon: ["fas", "check-circle"], iconColor: "#4B32C3" },
            { name: "Jest", icon: ["fas", "vial"], iconColor: "#C21325" },
            { name: "GraphQL", icon: ["fas", "code"], iconColor: "#E10098" },
            { name: "REST APIs", icon: ["fas", "plug"], iconColor: "#FF6B6B" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Skills Container */
.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-2xl);
}

/* Skill Category */
.skill-category {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
}

.skill-category:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.skill-category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--border-light);
}

/* Skill Items */
.skill-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.skill-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  transition: all var(--transition-normal);
}

.skill-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.skill-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .skill-category {
    padding: var(--space-lg);
  }
  
  .skill-items {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-sm);
  }
  
  .skill-item {
    padding: var(--space-xs) var(--space-sm);
  }
  
  .skill-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .skill-items {
    grid-template-columns: 1fr;
  }
  
  .skill-item {
    justify-content: flex-start;
  }
  
  .skill-category-title {
    font-size: 1.125rem;
  }
}

/* Animation for skill items */
.skill-item {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.skill-item:nth-child(1) { animation-delay: 0.1s; }
.skill-item:nth-child(2) { animation-delay: 0.2s; }
.skill-item:nth-child(3) { animation-delay: 0.3s; }
.skill-item:nth-child(4) { animation-delay: 0.4s; }
.skill-item:nth-child(5) { animation-delay: 0.5s; }
.skill-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
