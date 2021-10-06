import { MockMethod } from '../../index'
import { Result } from '@/utils/http/types'
import { getRoleAndAuthsRes } from '@/api/sys/admin'
import { UserSession } from '@/store/modules/session'

const modules: MockMethod[] = [
  {
    api: /\/login$/,
    method: 'post',
    handle: (): Result<UserSession> => {
      return {
        ret: 1,
        msg: 'success',
        data: {
          userId: 111,
          realName: 'nijia',
          avatar: '/avatar/3.png',
          token: 'aaaaaaaa',
          refToken: 'bbbbbbbbbbb',
        },
      }
    },
  },
  {
    api: /\/sys\/admin\/role_and_auths$/,
    method: 'get',
    handle: (): Result<getRoleAndAuthsRes> => {
      return {
        ret: 1,
        msg: 'success',
        data: {
          role: { id: 'admin', name: '管理员' },
          auths: [],
        },
      }
    },
  },
  {
    api: /\/sys\/admin\/refresh_token$/,
    method: 'post',
    handle: (): any => {
      return {
        ret: 1,
        msg: 'success',
        data: {
          token: 'aaaaaaa',
          refToken: 'bbbbbbbbbbb',
        },
      }
    },
  },
]

export default modules
