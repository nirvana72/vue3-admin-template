import type { App } from 'vue'
import PageWarpper from './pageWarpper/index.vue'

// 注册常用组件
export function setupComponents(app: App): void {
  app.component('app-page-warpper', PageWarpper)
}
