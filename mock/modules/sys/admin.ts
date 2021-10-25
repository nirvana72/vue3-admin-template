import { IMockApi } from '../../index'
import { IApiResult } from '@/utils/http/types'
import { IGetRoleAndAuthsRes } from '@/api/sys/admin'
import { IUserSession } from '@/store/modules/session'

const modules: IMockApi[] = [
  {
    api: /\/login$/,
    method: 'post',
    handle: (): IApiResult<IUserSession> => {
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
    handle: (): IApiResult<IGetRoleAndAuthsRes> => {
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
  {
    api: /\/sys\/admin\/change_avatar$/,
    method: 'post',
    handle: (): any => {
      return {
        ret: 1,
        msg: 'success',
      }
    },
  },
  {
    api: /\/sys\/admin\/change_password$/,
    method: 'post',
    handle: (): any => {
      return {
        ret: -1,
        msg: '原始密码不正确',
      }
    },
  },
]

export default modules
