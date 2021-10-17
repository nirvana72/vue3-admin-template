import dayJs from 'dayjs'
import { useWindowSize } from '@vueuse/core'
import { getAppHeaderHeight } from '@/layout/helper'

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
  tableVisibleHeight -= 17.5 * 2 // padding
  tableVisibleHeight -= 20 * 2 // el-card padding
  tableVisibleHeight -= 40 // 表头占用
  tableVisibleHeight -= 50 // 分页占用
  return Math.ceil(tableVisibleHeight / (params.rowHeight || 40))
}
