<template>
  <button
    @click="handleClick"
    class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors duration-200 ease-in-out"
    :class="customClass"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
