<template>
  <ElMenu :collapse="isCollapse" :collapseTransition="false" :router="true" :defaultActive="curPath">
    <AppMenuItem :items="menuList" />
    <ElMenuItem @click="doLogout" index="">
      <Icon icon="clarity:power-solid" />
      <template #title>退出登录</template>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { ElMenu, ElMenuItem, ElMessageBox } from 'element-plus'
import { useAppStore, MenuState } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import AppMenuItem from './item.vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'AppMenu',
  components: { ElMenu, ElMenuItem, Icon, AppMenuItem },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const menuList = computed(() => permissionStore.getMenuList)
    const isCollapse = computed(() => appStore.getMenuState === MenuState.FOLD)
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
