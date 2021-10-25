<template>
  <ul v-show="state.visible" ref="target" class="app-header-tab-menu">
    <li @click="refreshPage"><i class="el-icon-refresh"></i>刷新页面</li>
    <li v-show="state.closeAble" @click="closeTab"><i class="el-icon-close" />关闭页面</li>
    <li @click="closeOther"><i class="el-icon-bottom" />关闭其它</li>
    <li v-show="state.closeAble" @click="closeAll"><i class="el-icon-minus" />关闭所有</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useTabsStore, ITabStoreItem } from '@/store/modules/tabs'
import { onClickOutside } from '@vueuse/core'
import { Nullable } from 'element-plus/lib/utils/types'
import { useRouter } from 'vue-router'

export interface ITabMenu {
  show(tab: ITabStoreItem, e: MouseEvent): void
}

export default defineComponent({
  name: 'TabMenu',
  setup() {
    const tabsStore = useTabsStore()
    const target = ref(null)
    const router = useRouter()

    let activeTab: Nullable<ITabStoreItem> = null
    const state = reactive({
      visible: false,
      closeAble: true,
      x: '',
      y: '',
    })

    function show(tab: ITabStoreItem, e: MouseEvent) {
      activeTab = tab
      state.x = `${e.x}px`
      state.y = `${e.y}px`
      state.visible = true
      state.closeAble = tab.affix !== true
    }

    onClickOutside(target, () => {
      state.visible = false
    })

    function refreshPage() {
      tabsStore.refreshPage(activeTab!, router)
      state.visible = false
    }

    function closeTab() {
      tabsStore.closeTab(activeTab!, router)
      state.visible = false
    }

    function closeOther() {
      tabsStore.closeOtherTabs(activeTab!, router)
      state.visible = false
    }

    function closeAll() {
      tabsStore.closeAll(router)
      state.visible = false
    }

    return {
      target,
      state,
      show,
      refreshPage,
      closeTab,
      closeOther,
      closeAll,
    }
  },
})
</script>

<style lang="scss" scoped>
ul.app-header-tab-menu {
  position: fixed;
  left: v-bind('state.x');
  top: v-bind('state.y');
}
</style>
