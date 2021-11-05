import type { App } from 'vue'
import AppPage from './AppPage.vue'
import AppCard from './AppCard.vue'
import AppTitleInput from './TitleInput/index.vue'
import { Icon } from '@iconify/vue'

// 注册常用组件
export function setupComponents(app: App): void {
  app.component('app-page', AppPage)
  app.component('app-card', AppCard)
  app.component('app-title-input', AppTitleInput)
  app.component('app-icon', Icon)
}
