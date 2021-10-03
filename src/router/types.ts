import { _RouteRecordBase } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// 扩展 routeMeta 字段
export interface AppRouteMeta {
  // title
  title: string
  // 图标
  icon?: string
  // 提供给菜单排序
  orderNo?: number
  // 是否显示在菜单里
  hiddenMenu?: boolean
  // 启用Tab时是否显示在tab上
  hiddenTab?: boolean
  // 是否固化 tab, 前提 hiddenTab !== true
  affix?: boolean
  // 启用tab时启用缓存, 前提 hiddenTab !== true
  keepAlive?: boolean
}

// 扩展 Route 字段
export interface AppRouteModule extends Omit<_RouteRecordBase, 'meta' | 'children'> {
  // 权限
  auth?: string
  // 组件
  component?: Component

  meta: AppRouteMeta

  children?: AppRouteModule[]
}

// 菜单
export interface AppMenu {
  label: string

  icon?: string

  path: string

  children?: AppMenu[]

  orderNo?: number
}
