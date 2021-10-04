import type { Router } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useSessionStore } from '@/store/modules/session'
import { useTabsStore } from '@/store/modules/tabs'
import { useErrorLogStore } from '@/store/modules/errorLog'
import RouteEmitter from '@/emitter/routeEmitter'

export function setStateGuard(router: Router): void {
  router.afterEach((to) => {
    if (to.path === '/login') {
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      const sessionStore = useSessionStore()
      const tabsStore = useTabsStore()
      const errorLogStore = useErrorLogStore()

      appStore.reset()
      permissionStore.reset()
      sessionStore.reset()
      tabsStore.reset()
      errorLogStore.clean()
      RouteEmitter.clean()
    }
  })
}
