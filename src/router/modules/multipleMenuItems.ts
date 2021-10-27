import type { IAppRoute } from '@/router/types'
import { defaultLayout } from '@/router'

const router: IAppRoute = {
  path: '/multiple-menu-items',
  name: 'MultipleMenuItems',
  component: defaultLayout,
  redirect: '/multiple-menu-items/lv2',
  meta: {
    icon: 'bx:bxs-food-menu',
    title: '一级菜单',
    orderNo: 2,
  },
  children: [
    {
      path: 'lv2',
      name: 'MultipleMenuItemsLv2',
      redirect: '/multiple-menu-items/lv2/lv3',
      meta: { title: '二级菜单' },
      children: [
        {
          path: 'lv3',
          name: 'MultipleMenuItemsLv3',
          component: () => import('@/views/demo/multiple-menu-items/index.vue'),
          meta: { title: '三级菜单' },
        },
      ],
    },
  ],
}

export default router
