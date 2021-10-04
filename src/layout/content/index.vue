<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="slide-fade" mode="out-in">
        <keep-alive v-if="withPageTab" :include="cacheList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useTabsStore } from '@/store/modules/tabs'

export default defineComponent({
  name: 'AppContent',
  setup() {
    const tabsStore = useTabsStore()
    const appStore = useAppStore()
    const withPageTab = computed(() => appStore.getSetting.withPageTab)
    const cacheList = computed(() => {
      return withPageTab.value ? tabsStore.getCacheList : []
    })

    return {
      cacheList,
      withPageTab,
    }
  },
})
</script>
