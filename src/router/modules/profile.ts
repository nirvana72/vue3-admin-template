import type { AppRouteModule } from '@/router/types'
import { defaultLayout } from '@/router'

const router: AppRouteModule = {
  path: '/profile',
  name: 'Profile',
  component: defaultLayout,
  redirect: '/profile/info',
  meta: { title: '个人中心', hiddenMenu: true },
  children: [
    {
      path: 'info',
      name: 'ProfileInfo',
      component: () => import('@/views/profile/info.vue'),
      meta: { title: '个人信息' },
    },
    {
      path: 'password',
      name: 'ProfilePassword',
      component: () => import('@/views/profile/pwd.vue'),
      meta: { title: '修改密码' },
    },
  ],
}

export default router
