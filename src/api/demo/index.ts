import { http } from '@/utils/http/index'

export interface DemoPage1ReqModule {
  page?: number
  limit?: number
  account?: string
  realName?: string
  roleId?: string
}

export interface DempPage1RspItemModule {
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

export interface DemoPage1RspModule {
  list: DempPage1RspItemModule[]
  total: number
}

/**
 * @description: Page1 请求数据Api
 */
export function getDemoPageData(params: DemoPage1ReqModule): Promise<DemoPage1RspModule> {
  return new Promise((resolve) => {
    http.get<DemoPage1RspModule>('/demo/page1', { params }).then((data) => {
      resolve(data)
    })
  })
}
