import { MockMethod, MockPayload } from '../../index'
import { Result } from '@/utils/http/types'
import { ApiGetListRspModule } from '@/api/types'
import { GetListReqModule, GetListRspItemModule } from '@/api/sys/user'
import { Random } from 'mockjs'
import { getUrlParams } from '@/utils/tools'

const modules: MockMethod[] = [
  {
    api: /\/sys\/user\/list/,
    method: 'get',
    handle: ({ url }: MockPayload): Result<ApiGetListRspModule<GetListRspItemModule>> => {
      const params = getUrlParams(url) as GetListReqModule
      if (!params.page) params.page = 1
      if (!params.limit) params.limit = 10

      const list: GetListRspItemModule[] = []
      const roles = [
        { id: 'admin', name: '管理员' },
        { id: 'customer', name: '业务员' },
        { id: 'agent', name: '代理商' },
        { id: 'company', name: '企业用户' },
      ]

      for (let i = 0; i < params.limit; i++) {
        const role = Random.pick(roles)
        const avatarId = Random.integer(1, 34)
        list.push({
          userId: i + 1,
          account: '13' + Random.string('number', 9),
          realName: Random.cname(),
          roleId: role.id,
          roleName: role.name,
          companyId: 1,
          companyName: '苏州蓝吧科技有限公司',
          state: Random.integer(0, 2),
          writeTime: Random.datetime('yyyy-mm-dd'),
          avatarUrl: `/avatar/${avatarId}.png`,
          thisTime: Random.datetime('yyyy-mm-dd'),
          thisArea: Random.city(),
          online: Random.integer(0, 1),
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
