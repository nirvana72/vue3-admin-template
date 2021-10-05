<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { usePageTitle } from '@/utils/usePageTitle'
import { useAppStore } from '@/store/modules/app'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  setup() {
    usePageTitle()

    const appStore = useAppStore()
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isSmallerSm = breakpoints.smaller('sm')

    watch(
      isSmallerSm,
      (flag) => {
        appStore.getSetting.isMobile = flag
      },
      { immediate: true },
    )
  },
})
</script>
