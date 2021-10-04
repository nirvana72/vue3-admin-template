import { MockMethod } from '../index'

const modules: MockMethod[] = [
  {
    api: '/login',
    method: 'post',
    handle: (): any => {
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
]

export default modules
