<template>
  <li>
    <!-- Timeline badge with location icon -->
    <div class="timeline-badge primary">
      <font-awesome-icon :icon="['fas', 'map-marker-alt']" size="1x" />
    </div>
    
    <!-- Timeline panel with job details -->
    <div class="timeline-panel">
      <div class="timeline-heading">
        <h3 class="timeline-title">{{ company }}</h3>
        <span class="badge p-2 title-heading">{{ position }}</span>
        <p>
          <small class="text-primary">
            <font-awesome-icon :icon="['fas', 'calendar-alt']" /> 
            {{ period }}
          </small>
        </p>
      </div>
      
      <div class="timeline-body">
        <ul style="list-style:square">
          <li v-for="(responsibility, index) in responsibilities" :key="index">
            {{ responsibility }}
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "ExperienceItem",
  props: {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: Array,
      required: true,
    },
  },
};
</script> 