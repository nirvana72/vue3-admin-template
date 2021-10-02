import { createApp } from 'vue'
import App from './App.vue'

import { setupElementUI } from '@/components/setupElementUI'
import { setupMockServer } from '../mock/index'

import 'virtual:windi.css'

function bootstrap() {
  const app = createApp(App)

  setupElementUI(app)

  setupMockServer()

  app.mount('#app')
}

bootstrap()
