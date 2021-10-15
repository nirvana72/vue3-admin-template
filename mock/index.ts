import Mock from 'mockjs'

import DemoMocks from './modules/demo'
import SysIndexMocks from './modules/sys/index'
import SysAdminMocks from './modules/sys/admin'
import SysUserMocks from './modules/sys/user'

export function setupMockServer(): void {
  const modules = [...DemoMocks, ...SysIndexMocks, ...SysAdminMocks, ...SysUserMocks]
  modules.forEach((m) => {
    Mock.mock(m.api, m.method, m.handle)
  })

  Mock.setup({ timeout: 500 })
}

export type MockType = 'get' | 'post' | 'put' | 'delete'

export interface MockPayload {
  url: string
  type: MockType
  body: string
}

export interface MockMethod {
  api: string | RegExp
  method: MockType
  handle: (payload?: any) => any
}
