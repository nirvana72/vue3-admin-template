<template>
  <div v-show="showHeader" id="appHeaderState">
    <Icon v-if="!isMobile" :icon="menuToggleIcon" @click="toggleMenuState" class="menu-toggle-icon" />
    <AppBreadcrumb v-if="!isMobile" />
    <Tools />
  </div>
  <AppPageTabs v-if="!isMobile && withPageTab" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAppStore, MenuState } from '@/store/modules/app'
import AppBreadcrumb from './Breadcrumb.vue'
import AppPageTabs from './tabs/index.vue'
import Tools from './tools/index.vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'AppHeader',
  components: { AppBreadcrumb, AppPageTabs, Tools, Icon },
  setup() {
    const appStore = useAppStore()
    const showHeader = computed(() => appStore.getSetting.showHeader)
    const isMobile = computed(() => appStore.getSetting.isMobile)
    const withPageTab = computed(() => appStore.getSetting.withPageTab)
    const menuToggleIcon = computed(() =>
      appStore.getMenuState === MenuState.FOLD ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined',
    )

    function toggleMenuState() {
      appStore.toggleMenuState()
    }

    return {
      toggleMenuState,
      menuToggleIcon,
      showHeader,
      withPageTab,
      isMobile,
    }
  },
})
</script>
