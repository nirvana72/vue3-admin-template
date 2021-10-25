import type { IAppRoute } from '@/router/types'
import { defaultLayout } from '@/router'

const router: IAppRoute = {
  path: '/demo',
  name: 'Demo',
  component: defaultLayout,
  redirect: '/demo/page1',
  meta: {
    icon: 'mdi:ev-plug-chademo',
    title: 'DEMO',
    orderNo: 1,
  },
  children: [
    {
      path: 'table',
      name: 'DemoTable',
      component: () => import('@/views/demo/demo/table/index.vue'),
      meta: { title: 'TABLE' },
    },
  ],
}

export default router
