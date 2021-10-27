import { http } from '@/utils/http'
import { EApiBoolen } from '../types'

export interface ISysRole {
  id: string
  name: string
  isSysRole: EApiBoolen
}

// 获取系统角色
export function getRoleListApi(): Promise<ISysRole[]> {
  return new Promise((resolve) => {
    http.get<ISysRole[]>('/sys/role/list').then((data) => {
      resolve(data)
    })
  })
}
