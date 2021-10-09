import type { Router, RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { AppRouteModule } from '../types'
import { useSessionStore } from '@/store/modules/session'

// 权限守卫
export function setPermissionGuard(router: Router): void {
  const whiteList = ['/login']

  const permissionStore = usePermissionStore()
  const sessionStore = useSessionStore()

  router.beforeEach(async (to, _, next) => {
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    if (!sessionStore.isLogin) {
      next('/login')
      return
    }

    if (!permissionStore.getIsInitRoute) {
      const routers = await permissionStore.buildAsyncRouter()

      routers.forEach((route: AppRouteModule) => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })

      // 动态添加路由后，此处应当重定向到path，否则会匹配上PAGE_NOT_FOUND路由
      next({ path: to.path })
      return
    }

    next()
  })
}
