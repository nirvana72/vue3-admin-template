import { MockMethod } from '../../index'
import { Random } from 'mockjs'

interface IChartData {
  email: number[]
  unionAds: number[]
  videoAds: number[]
}

const modules: MockMethod[] = [
  {
    api: /\/dashboard$/,
    method: 'get',
    handle: (): any => {
      const data: IChartData = {
        email: [],
        unionAds: [],
        videoAds: [],
      }
      for (let i = 0; i < 12; i++) {
        data.email.push(Random.integer(10, 5000))
        data.unionAds.push(Random.integer(10, 5000))
        data.videoAds.push(Random.integer(10, 5000))
      }

      return {
        ret: 1,
        msg: 'success',
        data,
      }
    },
  },
]

export default modules
