import { http } from '@/utils/http'
import { EAppBoolen, EAppUserState, IApiGetListRsp } from '@/api/types'

export interface IGetListReq {
  page?: number
  limit?: number
  account?: string
  roleId?: string
  orderBy?: string
  withOnline?: EAppBoolen
}

export interface IGetListRspItem {
  userId: number
  account: string
  realName: string
  roleId: string
  roleName: string
  companyId: number
  companyName: string
  state: EAppUserState
  writeTime: string
  avatarUrl: string
  thisTime: string
  thisArea: string
  online: EAppBoolen
}

// 获取系统用户
export function getUserListApi(params: IGetListReq): Promise<IApiGetListRsp<IGetListRspItem>> {
  return new Promise((resolve) => {
    http.get<IApiGetListRsp<IGetListRspItem>>('/sys/user/list', { params }).then((data) => {
      resolve(data)
    })
  })
}
