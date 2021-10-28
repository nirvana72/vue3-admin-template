import { IMockApi, IMockPayload } from '../../index'
import { IApiResult } from '@/utils/http/types'
import { IApiListRsp } from '@/api/types'
import { IGetUserListReq, IGetUserListRspItem } from '@/api/sys/user'
import { Random } from 'mockjs'
import { getUrlParams } from '@/utils/tools'

const modules: IMockApi[] = [
  {
    api: /\/sys\/user\/list/,
    method: 'get',
    handle: ({ url }: IMockPayload): IApiResult<IApiListRsp<IGetUserListRspItem>> => {
      const params = getUrlParams(url) as IGetUserListReq
      if (!params.page) params.page = 1
      if (!params.limit) params.limit = 10

      const list: IGetUserListRspItem[] = []

      function getRole(roleId?: string) {
        const roles = [
          { id: 'admin', name: '管理员' },
          { id: 'customer', name: '业务员' },
          { id: 'agent', name: '代理商' },
          { id: 'company', name: '企业用户' },
        ]

        let role
        if (roleId) {
          role = roles.find((el) => el.id === roleId)
        } else {
          role = Random.pick(roles)
        }

        return role
      }

      for (let i = 0; i < params.limit; i++) {
        const role = getRole(params.roleId)
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
  {
    api: /\/sys\/user/,
    method: 'post',
    handle: (): IApiResult<unknown> => {
      return {
        ret: 1,
        msg: 'success',
        data: {},
      }
    },
  },
  {
    api: /\/sys\/user/,
    method: 'put',
    handle: (): IApiResult<unknown> => {
      return {
        ret: 1,
        msg: 'success',
        data: {},
      }
    },
  },
  {
    api: /\/sys\/user\/[0-9]{*}\/reset_password/,
    method: 'post',
    handle: (): IApiResult<unknown> => {
      return {
        ret: 1,
        msg: 'success',
        data: {},
      }
    },
  },
  {
    api: /\/sys\/user\/[0-9]{*}/,
    method: 'delete',
    handle: (): IApiResult<unknown> => {
      return {
        ret: 1,
        msg: 'success',
        data: {},
      }
    },
  },
]

export default modules
