import { http } from '@/utils/http/index'

export interface IDemoPage1Req {
  page?: number
  limit?: number
  account?: string
  realName?: string
  roleId?: string
}

export interface IDempPage1RspItem {
  id: number
  account: string
  avatar: string
  realName: string
  roleId: string
  roleName: string
  writeTime: string
  orgFull: string
  online: boolean
}

export interface IDemoPage1Rsp {
  list: IDempPage1RspItem[]
  total: number
}

/**
 * @description: Page1 请求数据Api
 */
export function getDemoPageData(params: IDemoPage1Req): Promise<IDemoPage1Rsp> {
  return new Promise((resolve) => {
    http.get<IDemoPage1Rsp>('/demo/page1', { params }).then((data) => {
      resolve(data)
    })
  })
}
