import { ComponentPublicInstance, getCurrentInstance, ref } from 'vue'

class ComponentHandler {
  private components = ref(new Set<string>())
  private proxy: ComponentPublicInstance | null | undefined
  private intervals: { [index: string]: { id: number; timeout: number } } = {}

  constructor() {
    this.proxy = getCurrentInstance()!.proxy
  }

  public async(name: string): boolean {
    return this.components.value.has(name)
  }

  public get<T>(name: string): T {
    return this.proxy?.$refs[name] as T
  }

  public getAsync<T>(name: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.proxy?.$refs[name]) {
        resolve(this.proxy?.$refs[name] as T)
      } else {
        if (this.intervals[name]) {
          reject('加载中...')
        } else {
          this.components.value.add(name)
          this.intervals[name] = {
            timeout: 0,
            id: setInterval(() => {
              // eslint-disable-next-line no-console
              console.log(`加载异步组件 ${name}`, this.intervals[name])
              if (this.proxy?.$refs[name]) {
                this.clean(name)
                resolve(this.proxy?.$refs[name] as T)
              } else {
                this.intervals[name].timeout += 100
                if (this.intervals[name].timeout >= 3000) {
                  this.clean(name)
                  reject(`加载异步组件超时 ${name}`)
                }
              }
            }, 100),
          }
        }
      }
    })
  }

  private clean(name: string) {
    clearInterval(this.intervals[name].id)
    delete this.intervals[name]
  }
}

export function useComponentHandler(): ComponentHandler {
  return new ComponentHandler()
}
