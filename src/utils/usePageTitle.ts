import { useTitle } from '@vueuse/core'
import { useAppEnv } from '@/utils/useAppEnv'

export function usePageTitle(): void {
  const { VITE_APP_TITLE } = useAppEnv()

  const pageTitle = useTitle()

  pageTitle.value = VITE_APP_TITLE

  // 后期改成 watch user.session.isLogin
}
