import type { App } from 'vue'
import AppPageWarpper from './AppPageWarpper.vue'
import { Icon } from '@iconify/vue'

// 注册常用组件
export function setupComponents(app: App): void {
  app.component('app-page-warpper', AppPageWarpper)
  app.component('app-icon', Icon)
}
