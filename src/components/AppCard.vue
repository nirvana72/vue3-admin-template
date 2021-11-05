<template>
  <div class="rounded-md bg-white p-5 border-0 dark:border-1 dark:bg-dark-800 dark:border-gray-800">
    <div v-if="hasHeader" class="mb-2 pb-2 border-b-1 border-b-gray-300 dark:border-b-gray-600">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(_, { slots }) {
    const hasHeader = !!slots.header
    return {
      hasHeader,
    }
  },
})
</script>
