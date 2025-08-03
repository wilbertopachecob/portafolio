<template>
  <li class="list-inline-item">
    <!-- Skill with icon -->
    <template v-if="icon">
      <font-awesome-icon 
        :icon="icon" 
        :style="{ color: iconColor }" 
      />
      {{ name }}
    </template>
    
    <!-- Skill without icon -->
    <template v-else>
      {{ name }}
    </template>
  </li>
</template>

<script>
export default {
  name: "SkillItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
  },
};
</script> 