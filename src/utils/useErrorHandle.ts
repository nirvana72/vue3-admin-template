import { App } from 'vue'
import { useErrorLogStore, ErrorTypeEnum, ErrorModule } from '@/store/modules/errorLog'
import { useAppStore } from '@/store/modules/app'

export function setupErrorHandle(app: App): void {
  const appStore = useAppStore()

  if (appStore.getSetting.errorLogCatch) {
    // vue 错误
    app.config.errorHandler = vueErrorHandler

    // windows javascript 错误
    window.onerror = scriptErrorHandler
  }
}

function vueErrorHandler(err: any, vm: any, info: string) {
  const errorLogStore = useErrorLogStore()
  const { name, path } = formatComponentName(vm)
  errorLogStore.addError({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href,
  })
}

/**
 * Configure script error handling function
 */
function scriptErrorHandler(
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error,
): boolean {
  if (!error) return true
  if (event === 'Script error.' && !source) {
    return false
  }
  const errorInfo: Partial<ErrorModule> = {}
  colno = colno || (window.event && (window.event as any).errorCharacter) || 0
  errorInfo.message = event as string
  if (error?.stack) {
    errorInfo.stack = error.stack
  } else {
    errorInfo.stack = ''
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
  const errorLogStore = useErrorLogStore()
  errorLogStore.addError({
    type: ErrorTypeEnum.SCRIPT,
    name: name,
    file: source as string,
    detail: 'lineno' + lineno,
    url: window.location.href,
    ...(errorInfo as Pick<ErrorModule, 'message' | 'stack'>),
  })
  return true
}

/**
 * Handling error stack information
 * @param error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack.replace(/ at /gi, '<br>at ')
  // .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
  // .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
  // .split('@') // Split information with @
  // .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
  // .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
  // .join('~') // Manually add separators for later display
  // .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }
  return stack
}

/**
 * get comp name
 * @param vm
 */
function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    }
  }

  const options = vm.$options as any
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    }
  }
  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file,
  }
}
