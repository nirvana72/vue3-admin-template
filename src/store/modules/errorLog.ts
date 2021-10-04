import { defineStore } from 'pinia'

interface ErrorState {
  list: ErrorModule[]
}

export const useErrorLogStore = defineStore({
  id: 'store-error',
  state: (): ErrorState => ({
    list: [],
  }),
  getters: {
    getErrorList(): ErrorModule[] {
      return this.list
    },
    getErrorCount(): number {
      return this.getErrorList.length
    },
  },
  actions: {
    addError(err: ErrorModule) {
      this.list.push(err)
      // console.error(err)
    },
    addAjaxError(error: any) {
      const errInfo: Partial<ErrorModule> = {
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
        this.addError(errInfo as ErrorModule)
      }
    },
    clean() {
      this.list = []
    },
  },
})

// Error-log information
export interface ErrorModule {
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
