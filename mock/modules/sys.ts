import { MockMethod } from '../index'
import { Random } from 'mockjs'
import { IChartData } from '@/views/home/chart-line.vue'

const modules: MockMethod[] = [
  {
    api: /\/login$/,
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
