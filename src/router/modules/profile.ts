import type { AppRouteModule } from '@/router/types'
import { defaultLayout } from '@/router'

const router: AppRouteModule = {
  path: '/profile',
  name: 'Profile',
  component: defaultLayout,
  redirect: '/profile/user-info',
  meta: { title: '个人中心', hiddenMenu: true },
  children: [
    {
      path: 'user-info',
      name: 'ProfileUserInfo',
      component: () => import('@/views/profile/UserInfo.vue'),
      meta: { title: '个人信息' },
    },
    {
      path: 'change-password',
      name: 'ProfileChangePassword',
      component: () => import('@/views/profile/ChangePassword.vue'),
      meta: { title: '修改密码' },
    },
  ],
}

export default router
