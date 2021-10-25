<template>
  <ElMenu :collapse="isCollapse" :collapseTransition="false" :router="true" :defaultActive="curPath">
    <AppMenuItem :items="menuList" />
    <ElMenuItem @click="doLogout" index="">
      <app-icon icon="clarity:power-solid" />
      <template #title>退出登录</template>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { ElMenu, ElMenuItem, ElMessageBox } from 'element-plus'
import { useAppStore, EMenuState } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import AppMenuItem from './TheSiderMenuItem.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppMenu',
  components: { ElMenu, ElMenuItem, AppMenuItem },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const menuList = computed(() => permissionStore.getMenuList)
    const isCollapse = computed(() => appStore.getMenuState === EMenuState.FOLD)
    const curPath = computed(() => router.currentRoute.value.path)

    watch(
      () => appStore.getSetting.hideSingleChildMenu,
      () => permissionStore.buildMenu(),
    )

    function doLogout() {
      ElMessageBox.confirm('确定要退出登录么', '提醒', { type: 'warning' }).then(() => {
        router.replace('/login')
      })
    }

    return {
      isCollapse,
      menuList,
      curPath,
      doLogout,
    }
  },
})
</script>
