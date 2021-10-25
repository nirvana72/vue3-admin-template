import type { IAppRoute } from '@/router/types'
import { defaultLayout } from '@/router'

const router: IAppRoute = {
  path: '/sys',
  name: 'Sys',
  component: defaultLayout,
  redirect: '/sys/user',
  meta: {
    icon: 'carbon:settings-services',
    title: '系统管理',
    orderNo: 1,
  },
  children: [
    {
      path: 'user',
      name: 'SysUserIndex',
      component: () => import('@/views/sys/user/index.vue'),
      meta: { title: '系统用户' },
    },
  ],
}

export default router
