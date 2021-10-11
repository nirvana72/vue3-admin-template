import type { AppRouteModule } from '@/router/types'
import { defaultLayout } from '@/router'

const router: AppRouteModule = {
  path: '/pages',
  name: 'Pages',
  component: defaultLayout,
  redirect: '/pages/404',
  meta: {
    icon: 'carbon:page-break',
    title: '功能页面',
    orderNo: 1,
  },
  children: [
    {
      path: '404',
      name: 'Pages404',
      component: () => import('@/views/demo/pages/404.vue'),
      meta: { title: '404' },
    },
    {
      path: 'error-log',
      name: 'PagesErrorLog',
      component: () => import('@/views/demo/pages/ErrorLog.vue'),
      meta: { title: '错误捕获' },
    },
  ],
}

export default router
