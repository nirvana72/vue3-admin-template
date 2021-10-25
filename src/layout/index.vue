<template>
  <ElContainer id="appWrapper">
    <ElAside v-show="isShowSideMenu" id="appAside" :class="menuState">
      <TheSider />
    </ElAside>
    <ElContainer id="appContainer" :class="{ headerfixed: isHeaderFixed }">
      <ElHeader id="appHeader">
        <TheHeader />
      </ElHeader>
      <ElMain id="appMain">
        <TheContent />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useAppStore, EMenuState } from '@/store/modules/app'
import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'
import TheSider from './sider/index.vue'
import TheHeader from './header/index.vue'
import TheContent from './content/index.vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { getAppHeaderHeight } from '@/layout/helper'

export default defineComponent({
  name: 'Layout',
  components: { ElContainer, ElAside, ElHeader, ElMain, TheSider, TheHeader, TheContent },
  setup() {
    const appStore = useAppStore()
    const isShowSideMenu = computed(() => appStore.getSetting.showSideMenu)
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
        const state = flag ? EMenuState.FOLD : EMenuState.EXPAND
        appStore.setMenuState(state)
      },
      { immediate: true },
    )

    return {
      isShowSideMenu,
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
