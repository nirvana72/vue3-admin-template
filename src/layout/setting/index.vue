<template>
  <Teleport to="body">
    <ElDrawer v-model="visible" title="设置" size="350px">
      <ul class="text-sm mx-5 leading-10">
        <li class="flex items-center justify-between">
          固定头部
          <ElSwitch :value="setting.headerFixed" @change="setHeaderFixed" />
        </li>
        <li class="flex items-center justify-between">
          开启页面标签
          <ElSwitch :value="setting.withPageTab" @change="setWithPageTab" />
        </li>
        <li class="flex items-center justify-between">
          开启页面标签拖动(需刷新)
          <ElSwitch :value="setting.pageTabCanDrag" @change="setPageTabCanDrag" />
        </li>
        <li class="flex items-center justify-between">
          侧边菜单只有一个子项时子项上提
          <ElSwitch :value="setting.hideSingleChildMenu" @change="setHideSingleChildMenu" />
        </li>
        <li class="flex items-center justify-between">
          开启错误捕获(需刷新)
          <ElSwitch :value="setting.errorLogCatch" @change="setErrorLogCatch" />
        </li>
      </ul>
    </ElDrawer>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElDrawer } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useTabsStore } from '@/store/modules/tabs'
import { ElSwitch } from 'element-plus'

export interface IAppSetting {
  show: () => void
}

export default defineComponent({
  name: 'AppSetting',
  emits: ['mounted'],
  components: { ElDrawer, ElSwitch },
  setup() {
    const { getSetting: setting } = useAppStore()
    const tabsStroe = useTabsStore()
    const visible = ref<boolean>(false)

    function show() {
      visible.value = true
    }

    function setHeaderFixed(flag: boolean) {
      setting.headerFixed = flag
    }

    function setWithPageTab(flag: boolean) {
      tabsStroe.reset()
      setting.withPageTab = flag
    }

    function setPageTabCanDrag(flag: boolean) {
      setting.pageTabCanDrag = flag
    }

    function setHideSingleChildMenu(flag: boolean) {
      setting.hideSingleChildMenu = flag
    }

    function setErrorLogCatch(flag: boolean) {
      setting.errorLogCatch = flag
    }

    return {
      visible,
      setting,
      show,
      setHeaderFixed,
      setWithPageTab,
      setPageTabCanDrag,
      setHideSingleChildMenu,
      setErrorLogCatch,
    }
  },
})
</script>
