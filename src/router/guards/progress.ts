import type { Router } from 'vue-router'
import nProgress from 'nprogress'

export function setProgressGuard(router: Router): void {
  router.beforeEach(() => {
    nProgress.start()
  })

  router.afterEach(() => {
    nProgress.done()
  })
}
