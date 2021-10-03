import type { AppRouteModule } from '@/router/types'
import { defaultLayout } from '@/router'

const router: AppRouteModule = {
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
      path: 'page1',
      name: 'DemoPage1',
      component: () => import('@/views/demo/page1.vue'),
      meta: { title: 'PAGE1' },
    },
    {
      path: 'page2',
      name: 'DemoPage2',
      component: () => import('@/views/demo/page2.vue'),
      meta: { title: 'PAGE2' },
    },
  ],
}

export default router
