<template>
  <ElContainer id="appWrapper">
    <ElAside v-show="showSideMenu" id="appAside" :class="menuState">
      <AppSider />
    </ElAside>
    <ElContainer id="appContainer" :class="{ headerfixed: isHeaderFixed }">
      <ElHeader id="appHeader">
        <AppHeader />
      </ElHeader>
      <ElMain id="appMain">
        <AppContent />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useAppStore, MenuState } from '@/store/modules/app'
import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'
import AppSider from './sider/index.vue'
import AppHeader from './header/index.vue'
import AppContent from './content/index.vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { getAppHeaderHeight } from '@/layout/helper'

export default defineComponent({
  name: 'Layout',
  components: { ElContainer, ElAside, ElHeader, ElMain, AppSider, AppHeader, AppContent },
  setup() {
    const appStore = useAppStore()
    const showSideMenu = computed(() => appStore.getSetting.showSideMenu)
    const isHeaderFixed = computed(() => appStore.getSetting.headerFixed)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isSmallerLg = breakpoints.smaller('lg')
    const menuState = computed(() => appStore.getMenuState)

    const appHeaderHeight = computed(() => {
      const height = getAppHeaderHeight()
      return `${height.value}px`
    })

    watch(
      isSmallerLg,
      (flag) => {
        const state = flag ? MenuState.FOLD : MenuState.EXPAND
        appStore.setMenuState(state)
      },
      { immediate: true },
    )

    return {
      showSideMenu,
      isHeaderFixed,
      menuState,
      appHeaderHeight,
    }
  },
})
</script>

<style lang="scss">
#appHeader {
  height: v-bind(appHeaderHeight);
}
</style>
