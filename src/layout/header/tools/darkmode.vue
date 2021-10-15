<template>
  <app-icon :icon="icon" @click="setDarkMode" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDark, useToggle } from '@vueuse/core'

export default defineComponent({
  name: 'DarkMode',
  setup() {
    const { getSetting: setting } = useAppStore()
    const isDark = useDark()
    const toggleDark = useToggle(isDark)
    const icon = computed(() => (setting.isDarkMode ? 'akar-icons:sun' : 'akar-icons:moon'))

    function setDarkMode() {
      toggleDark()
      setting.isDarkMode = isDark.value
    }

    return { icon, setDarkMode }
  },
})
</script>
