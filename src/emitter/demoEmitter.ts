import mitt from 'mitt'

// 定义事件枚举
export type DemoEvents = {
  foo: string
  bar: number
  zba: { name: string; age: number }
}

// https://www.npmjs.com/package/mitt
class DemoEmitter {
  emitter = mitt<DemoEvents>()

  onFoo(callback: (str: string) => void): void {
    this.emitter.on('foo', callback)
  }

  emitFoo(str: string): void {
    this.emitter.emit('foo', str)
  }

  onBar(callback: (num: number) => void): void {
    this.emitter.on('bar', callback)
  }

  emitBar(num: number): void {
    this.emitter.emit('bar', num)
  }

  onZba(callback: (obj: { name: string; age: number }) => void): void {
    this.emitter.on('zba', callback)
  }

  emitZba(obj: { name: string; age: number }): void {
    this.emitter.emit('zba', obj)
  }
}

export default new DemoEmitter()
