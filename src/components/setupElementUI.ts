import 'element-plus/dist/index.css'
import type { App } from 'vue'
import {
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTag,
  ElForm,
  ElFormItem,
  ElDialog,
  ElLoading,
  ElDivider,
} from 'element-plus'

export function setupElementUI(app: App): void {
  app.config.globalProperties.$ELEMENT = { size: 'small' }
  app.use(ElButton)
  app.use(ElInput)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElTag)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElDialog)
  app.use(ElLoading)
  app.use(ElDivider)
}
