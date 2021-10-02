import Mock from 'mockjs'

import DemoMocks from './modules/demo'

export function setupMockServer(): void {
  const modules = [...DemoMocks]
  modules.forEach((m) => {
    Mock.mock(m.api, m.method, m.handle)
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
