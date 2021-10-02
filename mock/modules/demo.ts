import { MockMethod } from '../index'

const modules: MockMethod[] = [
  {
    api: '/api/get',
    method: 'post',
    handle: (): any => {
      return {
        ret: -1,
        msg: 'okOK',
      }
    },
  },
]

export default modules
