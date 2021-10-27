import { IMockApi } from '../../index'
import { IApiResult } from '@/utils/http/types'
import { ISysRole } from '@/api/sys/role'

const modules: IMockApi[] = [
  {
    api: /\/sys\/role\/list/,
    method: 'get',
    handle: (): IApiResult<ISysRole[]> => {
      return {
        ret: 1,
        msg: 'success',
        data: [
          { id: 'admin', name: '管理员', isSysRole: 1 },
          { id: 'customer', name: '业务员', isSysRole: 1 },
          { id: 'agent', name: '代理商', isSysRole: 0 },
          { id: 'company', name: '企业用户', isSysRole: 0 },
        ],
      }
    },
  },
]

export default modules
