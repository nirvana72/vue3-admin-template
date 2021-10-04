<template>
  <template v-for="(menu, i) in items" :key="i">
    <ElSubMenu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <Icon v-if="menu.icon" :icon="menu.icon" />
        <span>{{ menu.label }}</span>
      </template>
      <AppMenuItem :items="menu.children" />
    </ElSubMenu>
    <ElMenuItem v-else :index="menu.path">
      <Icon v-if="menu.icon" :icon="menu.icon" />
      <template #title>{{ menu.label }}</template>
    </ElMenuItem>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import type { AppMenu } from '@/router/types'
import { Icon } from '@iconify/vue'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<AppMenu[]>,
      default: () => [],
    },
  },
  name: 'AppMenuItem',
  components: { ElSubMenu, ElMenuItem, Icon },
})
</script>
