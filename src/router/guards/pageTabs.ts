import type { Router } from 'vue-router'
import routeEmitter from '@/emitter/routeEmitter'

export function setPageTabsGuard(router: Router): void {
  router.beforeEach((to) => {
    // console.log('PageGuard.beforeEach', to)

    // 触发路由变化监听事件
    routeEmitter.emitChange(to)
  })

  router.afterEach(() => {
    // console.log('PageGuard.afterEach')
  })
}
