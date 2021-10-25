import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IAxiosCreateSettings, IHttpRequestOption } from './types'

export class MyAxios {
  private instance: AxiosInstance
  private readonly settings: IAxiosCreateSettings

  constructor(settings: IAxiosCreateSettings) {
    this.settings = settings
    this.instance = axios.create(settings)

    const { responseInterceptorCatch } = settings
    if (responseInterceptorCatch) {
      this.instance.interceptors.response.use(undefined, responseInterceptorCatch)
    }
  }

  get<T = any>(url: string, config: AxiosRequestConfig = {}, option?: IHttpRequestOption): Promise<T> {
    config.url = url
    config.method = 'GET'
    return this.request(config, option)
  }

  post<T = any>(url: string, config: AxiosRequestConfig = {}, option?: IHttpRequestOption): Promise<T> {
    config.url = url
    config.method = 'POST'
    return this.request(config, option)
  }

  put<T = any>(url: string, config: AxiosRequestConfig = {}, option?: IHttpRequestOption): Promise<T> {
    config.url = url
    config.method = 'PUT'
    return this.request(config, option)
  }

  delete<T = any>(url: string, config: AxiosRequestConfig = {}, option?: IHttpRequestOption): Promise<T> {
    config.url = url
    config.method = 'DELETE'
    return this.request(config, option)
  }

  request<T = any>(config: AxiosRequestConfig, option?: IHttpRequestOption): Promise<T> {
    const { requestOption } = this.settings
    // 每个请求都可重写option配置
    const _option: IHttpRequestOption = Object.assign({}, requestOption, option)

    const { requestInterceptor, responseInterceptor } = this.settings

    if (requestInterceptor) {
      requestInterceptor(config, _option)
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          if (responseInterceptor) {
            try {
              const ret = responseInterceptor(res, _option)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
          } else {
            resolve(res as unknown as Promise<T>)
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}
