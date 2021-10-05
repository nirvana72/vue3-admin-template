<template>
  <ElCard shadow="none" class="el-card--fix flex-1">
    <template #header>
      <div class="flex items-center justify-between">
        <span>{{ title }}</span>
        <Icon :icon="icon" class="text-2xl" />
      </div>
    </template>
    <div class="text-center py-2">{{ number }}</div>
  </ElCard>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import { ElCard } from 'element-plus'

defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  number: { type: Number, default: 0 },
})
</script>
