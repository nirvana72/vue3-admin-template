import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 出错弹出框方式
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

// 接口返回格式
export interface Result<T = any> {
  ret: number
  msg: string
  data: T
}

// 请求选择
export interface RequestOption {
  // 直接返回原始response
  isReturnNativeResponse?: boolean
  // apiBasePath
  apiBasePath?: string
  // 出错后提示弹框方式
  errorMessageMode?: ErrorMessageMode
  // 是否要把token加入请求header
  withToken?: boolean
}

// 创建Axios配置
export interface AxiosCreateSettings extends AxiosRequestConfig {
  // 请求选项
  requestOption?: RequestOption
  // 请求拦截器处理
  requestInterceptor?: (config: AxiosRequestConfig, option: RequestOption) => AxiosRequestConfig
  // 解析返回内容
  responseInterceptor?: (res: AxiosResponse<Result>, option: RequestOption) => any
  // 响应错误处理 非200状态
  responseInterceptorCatch?: (error: Error) => void
}

export const enum ApiResultEnum {
  SUCCESS = 1,
  API_ERROR = -1,
  SERVER_ERROR = -99,
  JWT_ERROR = -401,
  UNKNOW = -9999,
}
