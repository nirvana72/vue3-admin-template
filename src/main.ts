import { createApp } from 'vue'
import App from './App.vue'

import { setupElementUI } from '@/components/setupElementUI'
// import { setupMockServer } from '../mock/index'
import { setupRouter } from '@/router'

import 'virtual:windi.css'

function bootstrap() {
  const app = createApp(App)

  setupElementUI(app)

  setupRouter(app)

  app.mount('#app')
}

// setupMockServer()

bootstrap()
