import { defineStore } from 'pinia'

interface IErrorState {
  list: IAppError[]
}

export const useErrorLogStore = defineStore({
  id: 'store-error',
  state: (): IErrorState => ({
    list: [],
  }),
  getters: {
    getErrorList(): IAppError[] {
      return this.list
    },
    getErrorCount(): number {
      return this.getErrorList.length
    },
  },
  actions: {
    addError(err: IAppError) {
      this.list.push(err)
      // console.error(err)
    },
    addAjaxError(error: any) {
      const errInfo: Partial<IAppError> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      }
      if (error.response) {
        const { config: { url = '', data: params = '', method = 'get', headers = {} } = {}, data = {} } = error.response
        errInfo.url = url
        errInfo.name = 'Ajax Error!'
        errInfo.file = '-'
        errInfo.stack = JSON.stringify(data)
        errInfo.detail = JSON.stringify({ params, method, headers })
        this.addError(errInfo as IAppError)
      }
    },
    clean() {
      this.list = []
    },
  },
})

// Error-log information
export interface IAppError {
  // Type of error
  type: ErrorTypeEnum
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  AJAX = 'ajax',
  RESOURCE = 'resource',
}
