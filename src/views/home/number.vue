<template>
  <app-card class="flex-1">
    <template #header>
      <div class="flex items-center justify-between">
        <span>{{ title }}</span>
        <app-icon :icon="icon" class="text-2xl" />
      </div>
    </template>
    <div class="text-center py-2">{{ number }}</div>
  </app-card>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-undef
defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  number: { type: Number, default: 0 },
})
</script>
