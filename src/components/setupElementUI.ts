import 'element-plus/dist/index.css'
import type { App } from 'vue'
import { ElButton, ElInput } from 'element-plus'

export function setupElementUI(app: App): void {
  app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
  app.use(ElButton)
  app.use(ElInput)
}
