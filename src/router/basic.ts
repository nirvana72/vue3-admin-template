import type { AppRouteModule } from '@/router/types'
import { defaultLayout } from '@/router'

// login
const LOGIN: AppRouteModule = {
  name: 'Login',
  path: '/login',
  component: () => import('@/views/login/index.vue'),
  meta: { title: '登录', hiddenTab: true },
}

// root
const ROOT: AppRouteModule = {
  name: 'Home',
  path: '/',
  component: defaultLayout,
  redirect: '/home',
  meta: { title: 'Root', hiddenTab: true },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', affix: true },
    },
  ],
}

export default [ROOT, LOGIN]
