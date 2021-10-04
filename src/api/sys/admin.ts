import axios from 'axios'
import { useAppEnv } from '@/utils/useAppEnv'

interface refreshTokenResult {
  ret: number
  token?: string
  refToken?: string
}

/**
 * @description: 刷新jwt token
 */
export function refreshTokenApi(refToken: string): Promise<refreshTokenResult> {
  const appEnv = useAppEnv()
  return new Promise((resolve) => {
    axios.post(`${appEnv.VITE_API_URL}/sys/admin/refresh_token`, { refToken }).then((rsp) => {
      const { ret = -1, data = null } = rsp.data as any
      if (ret === 1 && data !== null) {
        const { token, refToken } = data
        resolve({ ret, token, refToken })
      } else {
        resolve({ ret: -1 })
      }
    })
  })
}
