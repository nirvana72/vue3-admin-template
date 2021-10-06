import type { AppMenu, AppRouteModule } from '@/router/types'
import { defineStore } from 'pinia'
import { getAsyncRoutes } from '@/router'
import { transformRouteToMenu, flatMultiLevelRoutes, filterRoutesWithAuths } from '@/router/helper'
import { useAppStore } from '@/store/modules/app'
import { useSessionStore } from '@/store/modules/session'
import { getRoleAndAuths } from '@/api/sys/admin'

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
      if (!routes) {
        routes = getAsyncRoutes()

        const sessionStore = useSessionStore()
        if (sessionStore.getRole.id !== 'admin') {
          routes = filterRoutesWithAuths(routes, sessionStore.getAuths)
        }
      }
      const {
        getSetting: { hideSingleChildMenu },
      } = useAppStore()
      this.menuList = transformRouteToMenu(hideSingleChildMenu, routes)
    },
    async buildAsyncRouter(): Promise<AppRouteModule[]> {
      // 根据权限过滤路由
      let routes = getAsyncRoutes()

      // 是否拉取了登录账号的角色和权限
      const sessionStore = useSessionStore()
      if (sessionStore.role.id === 'unknow') {
        const result = await getRoleAndAuths()
        sessionStore.setRoleAndAuths(result.role, result.auths)
      }

      // 如果不是管理员
      if (sessionStore.getRole.id !== 'admin') {
        routes = filterRoutesWithAuths(routes, sessionStore.getAuths)
      }

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
