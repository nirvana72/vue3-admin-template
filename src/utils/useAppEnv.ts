export interface AppEnvModule {
  // 网站标题
  VITE_APP_TITLE: string
  // 后台接口API
  VITE_API_URL: string
}

// 获取 .env 配置信息
export function useAppEnv(): AppEnvModule {
  const ENV = import.meta.env as unknown as AppEnvModule

  const { VITE_APP_TITLE, VITE_API_URL } = ENV

  return {
    VITE_APP_TITLE,
    VITE_API_URL,
  }
}
