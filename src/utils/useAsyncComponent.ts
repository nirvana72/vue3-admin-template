import { ComponentPublicInstance, getCurrentInstance, ref } from 'vue'

type Proxy = ComponentPublicInstance | null | undefined

class AsyncComponent {
  private components = ref(new Set<string>())

  private proxy: Proxy

  constructor() {
    this.proxy = getCurrentInstance()!.proxy
  }

  public isLoad(name: string): boolean {
    return this.components.value.has(name)
  }

  public load<T>(name: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.proxy?.$refs[name]) {
        resolve(this.proxy?.$refs[name] as T)
      } else {
        this.components.value.add(name)
        let timeout = 0
        const interval = setInterval(() => {
          if (this.proxy?.$refs[name]) {
            clearInterval(interval)
            resolve(this.proxy?.$refs[name] as T)
          } else {
            timeout += 100
            if (timeout >= 5000) {
              clearInterval(interval)
              const msg = `异步组件 ${name} 加载超时`
              // eslint-disable-next-line no-console
              console.log(msg)
              reject(msg)
            }
          }
        }, 100)
      }
    })
  }
}

export function useAsyncComponent(): AsyncComponent {
  return new AsyncComponent()
}
