import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 出错弹出框方式
export type TErrorMessageMode = 'none' | 'modal' | 'message' | undefined

// 接口返回格式
export interface IApiResult<T = any> {
  ret: number
  msg: string
  data: T
}

// 请求选择
export interface IHttpRequestOption {
  // 直接返回原始response
  isReturnNativeResponse?: boolean
  // apiBasePath
  apiBasePath?: string
  // 出错后提示弹框方式
  errorMessageMode?: TErrorMessageMode
  // 是否要把token加入请求header
  withToken?: boolean
}

// 创建Axios配置
export interface IAxiosCreateSettings extends AxiosRequestConfig {
  // 请求选项
  requestOption?: IHttpRequestOption
  // 请求拦截器处理
  requestInterceptor?: (config: AxiosRequestConfig, option: IHttpRequestOption) => AxiosRequestConfig
  // 解析返回内容
  responseInterceptor?: (res: AxiosResponse<IApiResult>, option: IHttpRequestOption) => any
  // 响应错误处理 非200状态
  responseInterceptorCatch?: (error: Error) => void
}

export const enum EApiResult {
  SUCCESS = 1,
  API_ERROR = -1,
  SERVER_ERROR = -99,
  JWT_ERROR = -401,
  UNKNOW = -9999,
}
