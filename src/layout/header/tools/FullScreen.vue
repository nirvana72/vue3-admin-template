<template>
  <app-icon :icon="icon" @click="toggle" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()

    const icon = computed(() => (isFullscreen.value ? 'radix-icons:exit-full-screen' : 'akar-icons:full-screen'))

    return { icon, toggle }
  },
})
</script>
