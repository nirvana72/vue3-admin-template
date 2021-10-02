import { createApp } from 'vue'
import App from './App.vue'

import { setupElementUI } from '@/components/setupElementUI'

function bootstrap() {
  const app = createApp(App)

  setupElementUI(app)

  app.mount('#app')
}

bootstrap()
