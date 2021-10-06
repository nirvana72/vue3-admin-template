import { MockMethod } from '../index'
import { Result } from '@/utils/http/types'
import { DemoPage1RspModule, DempPage1RspItemModule, DemoPage1ReqModule } from '@/api/demo/index'
import { Random } from 'mockjs'
import { MockPayload } from '../index'
import { getUrlParams } from '@/utils/tools'

const modules: MockMethod[] = [
  {
    api: /\/demo\/page1/,
    method: 'get',
    handle: ({ url }: MockPayload): Result<DemoPage1RspModule> => {
      const params = getUrlParams(url) as DemoPage1ReqModule
      if (!params.page) params.page = 1
      if (!params.limit) params.limit = 10

      const list: DempPage1RspItemModule[] = []
      const roles = [
        { id: 'admin', name: '管理员' },
        { id: 'customer', name: '业务员' },
        { id: 'agent', name: '代理商' },
      ]

      for (let i = 0; i < params.limit; i++) {
        const role = Random.pick(roles)
        const avatarId = Random.integer(1, 34)
        const depaId = Random.integer(1, 10)
        const teamId = Random.integer(1, 10)
        list.push({
          id: i + 1,
          account: '13' + Random.string('number', 9),
          realName: Random.cname(),
          roleId: role.id,
          roleName: role.name,
          writeTime: Random.datetime('yyyy-mm-dd'),
          avatar: `/avatar/${avatarId}.png`,
          online: Random.boolean(),
          orgFull: `苏州蓝吧/市场${depaId}部/${teamId}组`,
        })
      }

      return {
        ret: 1,
        msg: 'success',
        data: {
          list,
          total: 120,
        },
      }
    },
  },
]

export default modules
