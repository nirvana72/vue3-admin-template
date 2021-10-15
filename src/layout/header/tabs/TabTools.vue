<template>
  <div id="appHeaderTabsTools">
    <div title="刷新页面" class="app-header-tabs-tools-item">
      <app-icon icon="mdi:refresh" @click="refreshPage" />
    </div>
    <div title="全屏内容" class="app-header-tabs-tools-item">
      <app-icon icon="codicon:screen-full" @click="fullContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useTabsStore } from '@/store/modules/tabs'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TabTools',
  setup() {
    const appStroe = useAppStore()
    const { getSetting: appSetting } = appStroe
    const tabsStore = useTabsStore()
    const router = useRouter()

    function refreshPage() {
      const { fullPath, path } = router.currentRoute.value
      const p = fullPath || path || ''
      const tab = tabsStore.getTabList.find((el) => el.path === p)
      if (tab) {
        tabsStore.refreshPage(tab, router)
      }
    }

    function fullContent() {
      appSetting.showHeader = !appSetting.showHeader
      appSetting.showSideMenu = !appSetting.showSideMenu
    }

    return {
      refreshPage,
      fullContent,
    }
  },
})
</script>
