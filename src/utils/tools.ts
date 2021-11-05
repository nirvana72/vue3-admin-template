import dayJs from 'dayjs'
import { useWindowSize } from '@vueuse/core'
import { getAppHeaderHeight } from '@/layout/helper'
import { get, set } from 'lodash'

// 解析URL参数
export function getUrlParams(url: string): any {
  const params: any = {}
  const ary = url.split('?')
  if (ary.length >= 2) {
    ary[1].split('&').forEach((pair) => {
      const ary = pair.split('=')
      params[ary[0]] = ary[1]
    })
  }

  return params
}

// 格式化日期
export function parseTime(data: string | number | Date, template: string | undefined): string {
  if (!data) return ''
  return dayJs(data).format(template)
}

/**
 * 计算页面高度， 得到最佳显示行数
 *
 * @param rowHeight 每行高度
 * @param minusHeight 减去其它占用的高度
 * @returns 最佳行数
 */
export function getBetterTableRowsNumber(params: { rowHeight?: number; minusHeight?: number }): number {
  const { height: windowHeight } = useWindowSize()
  const appHeaderHeight = getAppHeaderHeight()
  let tableVisibleHeight = windowHeight.value - appHeaderHeight.value
  tableVisibleHeight -= params.minusHeight || 0
  return Math.ceil(tableVisibleHeight / (params.rowHeight || 40))
}

/**
 * 把第二参数对象属性赋值给第一参数对象, 不增加第一对象属性
 */
export function leftAssign(obj1: Record<string, unknown>, obj2: unknown): void {
  Object.keys(obj1).forEach((key) => {
    const val = get(obj2, key)
    if (val) set(obj1, key, val)
  })
}
