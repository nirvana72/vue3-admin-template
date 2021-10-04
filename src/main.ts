import { createApp } from 'vue'
import App from './App.vue'

import { setupMockServer } from '../mock/index'

import { setupElementUI } from '@/components/setupElementUI'
import { setupComponents } from '@/components/setupComponents'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupErrorHandle } from '@/utils/useErrorHandle'

import 'virtual:windi.css'
import '@/style/index.scss'

function bootstrap() {
  const app = createApp(App)

  setupElementUI(app)

  setupComponents(app)

  setupStore(app)

  setupRouter(app)

  setupErrorHandle(app)

  app.mount('#app')
}

setupMockServer()

bootstrap()
