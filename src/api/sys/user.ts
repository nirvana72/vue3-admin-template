import { http } from '@/utils/http'
import { EApiBoolen, EAppUserState, IApiListRsp } from '@/api/types'

//-------------------------------------------------------------------------------------------
// 获取系统用户
export interface IGetUserListReq {
  page?: number
  limit?: number
  account?: string
  roleId?: string
  orderBy?: string
  withOnline?: EApiBoolen
}

export interface IGetUserListRspItem {
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
  online: EApiBoolen
}

export function getUserListApi(params: IGetUserListReq): Promise<IApiListRsp<IGetUserListRspItem>> {
  return new Promise((resolve) => {
    http.get<IApiListRsp<IGetUserListRspItem>>('/sys/user/list', { params }).then((data) => {
      resolve(data)
    })
  })
}

//-------------------------------------------------------------------------------------------
// 创建 / 修改
export interface IPostUserReq {
  userId?: number
  account: string
  realName: string
  roleId: string
  state: number
}

export function create(params: IPostUserReq): Promise<void> {
  return new Promise((resolve) => {
    http.post('/sys/user/', { params }).then(() => {
      resolve()
    })
  })
}

export function update(params: IPostUserReq): Promise<void> {
  return new Promise((resolve) => {
    http.put('/sys/user/', { params }).then(() => {
      resolve()
    })
  })
}

//-------------------------------------------------------------------------------------------
// 重置密码
export function resetPassword(userId: number): Promise<string> {
  return new Promise((resolve) => {
    http.post(`/sys/user/${userId}/reset_password`).then(() => {
      resolve('密码重置成功')
    })
  })
}

//-------------------------------------------------------------------------------------------
// 删除用户
export function remove(userId: number): Promise<void> {
  return new Promise((resolve) => {
    http.delete(`/sys/user/${userId}`).then(() => {
      resolve()
    })
  })
}
