import mitt from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'
import { useRoute } from 'vue-router'

// 定义事件枚举
type RouteEmitterEvents = {
  change: RouteLocationNormalized
}

class RouteEmitter {
  emitter = mitt<RouteEmitterEvents>()

  listenChage(callback: (route: RouteLocationNormalized) => void, immediate = false): void {
    this.emitter.on('change', callback)

    if (immediate) {
      const route = useRoute()
      callback(route)
    }
  }

  emitChange(route: RouteLocationNormalized): void {
    this.emitter.emit('change', route)
  }

  clean(): void {
    this.emitter.all.clear()
  }
}

export default new RouteEmitter()
