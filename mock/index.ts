import Mock from 'mockjs'
import { useAppEnv } from '@/utils/useAppEnv'

import DemoMocks from './modules/demo'
import SysMocks from './modules/sys'

export function setupMockServer(): void {
  const appEnv = useAppEnv()

  const modules = [...DemoMocks, ...SysMocks]
  modules.forEach((m) => {
    const api = appEnv.VITE_API_URL + m.api
    Mock.mock(api, m.method, m.handle)
  })

  Mock.setup({})
}

export type MockType = 'get' | 'post' | 'put' | 'delete'

export interface MockPayload {
  url: string
  type: MockType
  body: string
}

export interface MockMethod {
  api: string
  method: MockType
  handle: (payload?: any) => any
}
