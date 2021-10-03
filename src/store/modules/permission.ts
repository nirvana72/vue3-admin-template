import type { AppMenu, AppRouteModule } from '@/router/types'
import { defineStore } from 'pinia'
import { getAsyncRoutes } from '@/router'
import { transformRouteToMenu, flatMultiLevelRoutes } from '@/router/helper'
import { useAppStore } from '@/store/modules/app'

interface PermissionState {
  // 是否已加载路由 flag
  isInitRoute: boolean
  // 菜单
  menuList: AppMenu[]
}

export const usePermissionStore = defineStore({
  id: 'store-permission',
  state: (): PermissionState => ({
    menuList: [],
    isInitRoute: false,
  }),
  getters: {
    getMenuList(): AppMenu[] {
      return this.menuList
    },
    getIsInitRoute(): boolean {
      return this.isInitRoute
    },
  },
  actions: {
    buildMenu(routes?: AppRouteModule[]) {
      if (!routes) routes = getAsyncRoutes()
      const {
        getSetting: { hideSingleChildMenu },
      } = useAppStore()
      this.menuList = transformRouteToMenu(hideSingleChildMenu, routes)
    },
    buildAsyncRouter(): AppRouteModule[] {
      // 根据权限过滤路由
      let routes = getAsyncRoutes()
      // 过滤出的路由转成菜单数据
      this.buildMenu(routes)
      // 将2级以上路由转成2级路由
      routes = flatMultiLevelRoutes(routes)
      // 声明已初始化
      this.isInitRoute = true

      return routes
    },
    reset() {
      // eslint-disable-next-line no-console
      console.log('PermissionStore.reset')
      this.menuList = []
      this.isInitRoute = false
    },
  },
})
