import axios from 'axios'
import { useAppEnv } from '@/utils/useAppEnv'
import { IUserRole } from '@/store/modules/session'
import { http } from '@/utils/http'

// -------------------------------------------------------------
// 获取登录角色和权限
export interface IGetRoleAndAuthsRes {
  role: IUserRole
  auths: string[]
}

export function getRoleAndAuths(): Promise<IGetRoleAndAuthsRes> {
  return new Promise((resolve) => {
    http.get<IGetRoleAndAuthsRes>('/sys/admin/role_and_auths').then((res) => {
      resolve(res)
    })
  })
}

// -------------------------------------------------------------
// 修改头像
export function changeAvatarApi(avatar: string): Promise<void> {
  return new Promise((resolve) => {
    http.post('/sys/admin/change_avatar', { data: { avatar } }).then(() => {
      resolve()
    })
  })
}

// -------------------------------------------------------------
// 修改密码
export function changePasswordApi(oldPwd: string, newPwd: string): Promise<void> {
  return new Promise((resolve) => {
    http.post('/sys/admin/change_password', { data: { oldPwd, newPwd } }).then(() => {
      resolve()
    })
  })
}

// -------------------------------------------------------------
// 刷新jwt token
export interface IRefreshTokenRes {
  ret: number
  token?: string
  refToken?: string
}

export function refreshTokenApi(refToken: string): Promise<IRefreshTokenRes> {
  const appEnv = useAppEnv()
  return new Promise((resolve) => {
    axios.post(`${appEnv.VITE_API_URL}/sys/admin/refresh_token`, { refToken }).then((rsp) => {
      const { ret = -1, data = null } = rsp.data as any
      if (ret === 1 && data !== null) {
        const { token, refToken } = data
        resolve({ ret, token, refToken })
      } else {
        resolve({ ret: -1 })
      }
    })
  })
}
