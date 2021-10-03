export interface AppEnvConfig {
  // 网站标题
  VITE_APP_TITLE: string
  // 后台接口API
  VITE_API_URL: string
}

export interface AppSettingsModule {
  errorLogCatch: boolean
  showHeader: boolean
  headerFixed: boolean
  showSideMenu: boolean
  showSetting: boolean
  withPageTab: boolean
  pageTabCanDrag: boolean
  hideSingleChildMenu: boolean
  isDarkMode: boolean
  isMobile: boolean
}

const appSettings: AppSettingsModule = {
  // 开启错误捕获
  errorLogCatch: true,
  // 显示侧边菜单
  showSideMenu: true,
  // 固定头部
  headerFixed: true,
  // 显示header
  showHeader: true,
  // 显示设置功能 (修改需清空localStorage生效)
  showSetting: true,
  // 是否启用tab功能
  withPageTab: true,
  // tab 是否可以拖动 (修改需刷新生效)
  pageTabCanDrag: true,
  // 唯一子菜单上提为父菜单
  hideSingleChildMenu: false,
  // 当前是否暗黑模式
  isDarkMode: false,
  // 是否移动端模式
  isMobile: false,
}

export default appSettings
