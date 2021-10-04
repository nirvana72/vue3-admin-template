<template>
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <ElBreadcrumbItem :to="homePath" key="/">首页</ElBreadcrumbItem>
      <ElBreadcrumbItem v-for="item in breadItems" :key="item.path" :to="item.path">
        {{ item.label }}
      </ElBreadcrumbItem>
    </transition-group>
  </ElBreadcrumb>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { compact } from 'lodash'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

type Path = '' | undefined

interface BreadItem {
  label: string
  path: Path
}

export default defineComponent({
  name: 'AppBreadcrumb',
  components: { ElBreadcrumb, ElBreadcrumbItem },
  setup() {
    const homePath: Path = '/' as unknown as Path
    const appStore = useAppStore()
    const router = useRouter()
    const { currentRoute } = router
    const breadItems = ref<BreadItem[]>([])
    const hideSingleChildMenu = computed(() => appStore.getSetting.hideSingleChildMenu)

    function getBreadItems(): BreadItem[] {
      let items: BreadItem[] = []
      const routes = router.getRoutes().filter((r) => r.meta.hiddenMenu !== true)
      const pathAry = compact(currentRoute.value.path.split('/'))
      for (let i = 0; i < pathAry.length; i++) {
        let path = '/' + pathAry.slice(0, i + 1).join('/')

        const route = routes.find((r) => !['Root', 'Home', 'Dashboard'].includes(r.name as string) && r.path === path)
        if (!route) break

        let hideBreadcrumb = false
        // 唯一子菜单上提逻辑
        if (hideSingleChildMenu.value) {
          if (i < pathAry.length - 1) {
            path = `${path}/`
            const children = routes.filter((r) => {
              return r.path.startsWith(path) && r.path.replace(path, '').indexOf('/') < 0
            })
            hideBreadcrumb = children.length <= 1
          }
        }

        if (!hideBreadcrumb) {
          items.push({
            label: route.meta.title as string,
            path: route.path as unknown as Path,
          })
        }
      }

      return items
    }

    watch(
      () => [currentRoute.value, hideSingleChildMenu.value],
      () => {
        breadItems.value = getBreadItems()
      },
      { immediate: true },
    )

    return {
      homePath,
      breadItems,
    }
  },
})
</script>
