import { MockMethod } from '../index'

const modules: MockMethod[] = [
  {
    api: '/api/get',
    method: 'post',
    handle: (): any => {
      return {
        ret: 1,
        msg: 'okOK',
        data: { a: 'aaa' },
      }
    },
  },
  {
    api: '/demo1',
    method: 'post',
    handle: (): any => {
      return {
        ret: 1,
        msg: 'okOK',
      }
    },
  },
]

export default modules
