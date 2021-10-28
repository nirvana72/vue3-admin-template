<template>
  <div id="appAsideTop">
    <img title="logo" src="@/assets/logo.png" />
    <h1 v-if="menuState === 'expand'">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAppEnv } from '@/utils/useAppEnv'
import { useAppStore } from '@/store/modules/app'

export default defineComponent({
  name: 'SideLogo',
  setup() {
    const appStore = useAppStore()
    const { VITE_APP_TITLE: title } = useAppEnv()
    const menuState = computed(() => appStore.getMenuState)

    return {
      title,
      menuState,
    }
  },
})
</script>
