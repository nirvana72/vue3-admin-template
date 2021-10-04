<template>
  <div id="appHaderTabs">
    <ElTabs :model-value="curPathMd5" @tab-click="onTabClick">
      <ElTabPane v-for="(item, index) in tabList" :key="index" :label="item.path" :name="md5Hex(item.path)">
        <template #label>
          <div :class="['item', { closeable: !item.affix }]" @contextmenu.prevent.stop="openMenu(item, $event)">
            <span>{{ item.title }}</span>
            <i v-if="!item.affix" @click.prevent.stop="closeTab(item)" class="el-icon-close"></i>
          </div>
        </template>
      </ElTabPane>
    </ElTabs>
    <TabTools />
  </div>

  <Teleport to="body">
    <TabMenu ref="tabMenuRef" />
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, onMounted, watch } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import routeEmitter from '@/emitter/routeEmitter'
import { useAppStore } from '@/store/modules/app'
import { TabStoreItem, useTabsStore } from '@/store/modules/tabs'
import { useRouter } from 'vue-router'
import TabMenu, { TabMenuModule } from './menu.vue'
import TabTools from './tools.vue'
import { Pane } from 'element-plus/lib/components/tabs/src/token'
import md5Hex from 'md5-hex'
import Sortable from 'sortablejs'

export default defineComponent({
  name: 'AppTabs',
  components: { ElTabs, ElTabPane, TabMenu, TabTools },
  setup() {
    const appStore = useAppStore()
    const tabsStore = useTabsStore()
    const router = useRouter()
    const tabList = computed(() => tabsStore.getTabList)
    const tabMenuRef = ref<TabMenuModule>()
    const curPathMd5 = computed(() => {
      const { fullPath, path } = router.currentRoute.value
      return md5Hex(fullPath || path)
    })

    tabsStore.initAffixTabs(router)
    const withPageTab = computed(() => appStore.getSetting.withPageTab)
    const isMobile = computed(() => appStore.getSetting.isMobile)

    routeEmitter.listenChage((router) => {
      if (!isMobile.value && withPageTab.value) tabsStore.addTab(router)
    }, true)

    watch(
      () => isMobile.value,
      (flag) => {
        if (flag) tabsStore.reset()
      },
    )

    function onTabClick(tab: Pane) {
      tabsStore.setIsTabSwitch(true)
      router.push(unref(tab.props.label))
    }

    function closeTab(tab: TabStoreItem) {
      tabsStore.closeTab(tab, router)
    }

    function openMenu(tab: TabStoreItem, e: MouseEvent) {
      tabMenuRef.value?.show(tab, e)
    }

    if (appStore.getSetting.pageTabCanDrag) {
      onMounted(() => {
        const el = document.querySelector('#appHeader .el-tabs__nav') as HTMLElement
        if (el) {
          Sortable.create(el, {
            animation: 500,
            delay: 400,
            delayOnTouchOnly: true,
          })
        }
      })
    }

    return {
      tabList,
      tabMenuRef,
      curPathMd5,
      onTabClick,
      closeTab,
      openMenu,
      md5Hex,
    }
  },
})
</script>
