<template>
  <div v-show="showHeaderStateBar" id="appHeaderState">
    <app-icon v-if="!isMobile" :icon="menuToggleIcon" @click="toggleMenuState" class="menu-toggle-icon" />
    <AppBreadcrumb v-if="!isMobile" />
    <Tools />
  </div>
  <AppPageTabs v-if="!isMobile && withPageTab" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAppStore, EMenuState } from '@/store/modules/app'
import AppBreadcrumb from './Breadcrumb.vue'
import AppPageTabs from './tabs/index.vue'
import Tools from './tools/index.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { AppBreadcrumb, AppPageTabs, Tools },
  setup() {
    const appStore = useAppStore()
    const showHeaderStateBar = computed(() => appStore.getSetting.showHeaderStateBar)
    const isMobile = computed(() => appStore.getSetting.isMobile)
    const withPageTab = computed(() => appStore.getSetting.withPageTab)
    const menuToggleIcon = computed(() =>
      appStore.getMenuState === EMenuState.FOLD ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined',
    )

    function toggleMenuState() {
      appStore.toggleMenuState()
    }

    return {
      toggleMenuState,
      menuToggleIcon,
      showHeaderStateBar,
      withPageTab,
      isMobile,
    }
  },
})
</script>
