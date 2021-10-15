import { http } from '@/utils/http'
import { AppBoolen, AppUserState, ApiGetListRspModule } from '@/types/index'

export interface GetListReqModule {
  page?: number
  limit?: number
  account?: string
  roleId?: string
  orderBy?: string
  withOnline?: AppBoolen
}

export interface GetListRspItemModule {
  userId: number
  account: string
  realName: string
  roleId: string
  roleName: string
  companyId: number
  companyName: string
  state: AppUserState
  writeTime: string
  avatarUrl: string
  thisTime: string
  thisArea: string
  online: AppBoolen
}

// 获取系统用户
export function getUserListApi(params: GetListReqModule): Promise<ApiGetListRspModule<GetListRspItemModule>> {
  return new Promise((resolve) => {
    http.get<ApiGetListRspModule<GetListRspItemModule>>('/sys/user/list', { params }).then((data) => {
      resolve(data)
    })
  })
}
