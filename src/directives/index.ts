import type { App } from 'vue'
import AuthDirective from './auth'

export function setupDirectives(app: App): void {
  app.directive('auth', AuthDirective)
}
