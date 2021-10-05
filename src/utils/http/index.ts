import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOption, Result, AxiosCreateSettings, ApiResultEnum } from './types'
import { useSessionStore } from '@/store/modules/session'
import { MyAxios } from './axios'
import { useAppEnv } from '@/utils/useAppEnv'
import { refreshTokenApi } from '@/api/sys/admin'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useErrorLogStore } from '@/store/modules/errorLog'

const JWT_KEY = 'Authorization'

function createAxios() {
  const appEnv = useAppEnv()
  const settings: AxiosCreateSettings = {
    // 超时时间
    timeout: 10 * 1000,
    // 返回格式
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    // 请求拦截器处理
    requestInterceptor,
    // 解析返回内容
    responseInterceptor,
    // 响应错误处理 非200状态
    responseInterceptorCatch,
    // // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOption: {
      // 接口地址
      apiBasePath: appEnv.VITE_API_URL,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 消息提示类型
      errorMessageMode: 'message',
      // 是否携带token
      withToken: true,
    },
  }
  return new MyAxios(settings)
}

/**
 * @description: 请求拦截器处理
 */
function requestInterceptor(config: AxiosRequestConfig, option: RequestOption): AxiosRequestConfig {
  // 请求完整url
  if (config.url?.startsWith('http')) {
    return config
  }

  // 把接口主域名配置上
  const { apiBasePath } = option
  if (apiBasePath) {
    config.url = `${apiBasePath}${config.url}`
  }

  // 是否要加上jwt token
  if (option.withToken) {
    const session = useSessionStore()
    if (session.getSession.userId > 0) {
      config.headers = {}
      config.headers[JWT_KEY] = session.getSession.token
    }
  }

  return config
}

/**
 * @description: 解析返回内容
 */
async function responseInterceptor(res: AxiosResponse<Result>, option: RequestOption) {
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (option.isReturnNativeResponse) {
    return res
  }

  // return '[HTTP] Request has no return value';
  if (!res.data) {
    throw new Error('请求出错，请稍候重试')
  }

  // 在 types.ts内修改为项目自己的接口返回格式
  const { ret = ApiResultEnum.UNKNOW, data = undefined } = res.data
  let msg = res.data.msg || '[AxiosTransform]:服务端返回格式无法解析'

  if (ret === ApiResultEnum.SUCCESS) {
    return data
  }

  if (ret === ApiResultEnum.JWT_ERROR && msg === 'JwtException') {
    const sessionStore = useSessionStore()
    const { ret: refreshRet, token, refToken } = await refreshTokenApi(sessionStore.getSession.refToken)
    if (refreshRet < 0) {
      ElMessageBox.alert('登录信息过期,需要重新登录', {
        title: '错误提示',
        callback: () => {
          const router = useRouter()
          router.replace('/login')
        },
      })
      throw new Error('登录信息超时')
    }
    // 刷新token成功，更新token
    sessionStore.updateToken(token!, refToken!)
    // 重发之前请求
    res.config.headers![JWT_KEY] = token!
    const reCallRes = await axios.request(res.config)
    if (reCallRes.data.ret > 0) {
      return reCallRes.data.data
    } else {
      msg = reCallRes.data.msg || '[AxiosTransform.refToken]:服务端返回格式无法解析'
    }
  }

  // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
  // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
  if (option.errorMessageMode === 'modal') {
    ElMessageBox.alert(msg, { title: '错误提示', type: 'error' })
  } else if (option.errorMessageMode === 'message') {
    ElMessage.error(msg)
  }

  throw new Error(ret === ApiResultEnum.UNKNOW ? msg : '服务端:' + msg)
}

/**
 * @description: 响应错误处理 非200状态
 */
function responseInterceptorCatch(error: any) {
  const errorLogStore = useErrorLogStore()
  errorLogStore.addAjaxError(error)
  const { response, code, message, config } = error || {}
  const errorMessageMode = config?.requestOptions?.errorMessageMode || 'modal'
  let msg: string = response?.data?.error?.message || message
  const err: string = error?.toString?.() ?? ''

  if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    msg = '接口请求超时,请刷新页面重试!'
  }
  if (err?.includes('Network Error')) {
    msg = '网络异常，请检查您的网络连接是否正常!'
  }

  if (errorMessageMode === 'modal') {
    ElMessageBox.alert(msg, { title: '错误提示', type: 'error' })
  } else if (errorMessageMode === 'message') {
    ElMessage.error(msg)
  }

  return Promise.reject(error)
}

export const http = createAxios()
