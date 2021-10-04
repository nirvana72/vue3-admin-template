import { App, defineComponent } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { AppRouteModule } from '@/router/types'
import basicRoutes from './basic'
import LAYOUT from '@/layout/index.vue'
import { cloneDeep, last as arrayLast } from 'lodash'

import { setPageTabsGuard } from './guards/pageTabs'
import { setPermissionGuard } from './guards/permission'
import { setProgressGuard } from './guards/progress'
import { setStateGuard } from './guards/state'

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // https://next.router.vuejs.org/zh/guide/migration
  strict: true,
  // 路由切换时滚动条位置
  // https://next.router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})

export function getAsyncRoutes(): AppRouteModule[] {
  const modules = import.meta.globEager('./modules/**/*.ts')
  const asyncRoutes: AppRouteModule[] = []

  Object.keys(modules).forEach((key) => {
    if (arrayLast(key.split('/'))?.substr(0, 1) !== '_') {
      const mod = modules[key].default || {}
      const modList = Array.isArray(mod) ? [...mod] : [mod]
      asyncRoutes.push(...modList)
    }
  })

  return cloneDeep(asyncRoutes)
}

export function defaultLayout(): Promise<ReturnType<typeof defineComponent>> {
  return new Promise((resolve) => {
    resolve(LAYOUT)
  })
}

export function setupRouter(app: App<Element>): void {
  app.use(router)

  setPageTabsGuard(router)

  setPermissionGuard(router)

  setProgressGuard(router)

  setStateGuard(router)
}
