<template>
  <li>
    <div class="timeline-panel">
      <div class="timeline-heading">
        <h3 class="timeline-title">{{ company }}</h3>
        <span class="badge p-2 title-heading">{{ position }}</span>
        <p>
          <small class="text-primary">
            <font-awesome-icon :icon="['fas', 'calendar-alt']" /> 
            {{ period }}
          </small>
          <small v-if="location" class="text-muted ml-2">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" /> 
            {{ location }}
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
    location: {
      type: String,
      required: false,
      default: null,
    },
    responsibilities: {
      type: Array,
      required: true,
    },
  },
};
</script> 